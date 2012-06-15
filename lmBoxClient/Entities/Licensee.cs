using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Represents Licensee. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Licensee.html
    /// </summary>
    public class Licensee : BaseEntity
    {
        /// <summary>
        /// The number of the product licensed to this licensee. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Licensee.html
        /// </summary>
        public String productNumber { get; set; }

        /// <summary>
        /// Custom properties of the licensee. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Licensee.html
        /// </summary>
        public Dictionary<String, String> licenseeProperties { get; private set; }

        // default constructor
        public Licensee()
        {
            licenseeProperties = new Dictionary<String, String>();
        }

        // construct from REST response item
        internal Licensee(item source)
        {
            if (!"Licensee".Equals(source.type))
            {
                throw new Exception(String.Format("Wrong object type '{0}', expected 'Licensee'", (source.type != null) ? source.type : "<null>"));
            }
            licenseeProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                switch (p.name)
                {
                    case "productNumber":
                        verifyTypeIsString(p.Item);
                        productNumber = p.Item as String;
                        break;
                    default:
                        if (!base.setFromProperty(p)) // Not BaseEntity property?
                        {
                            // custom property
                            licenseeProperties.Add(p.name, p.Item as String);
                        }
                        break;
                }
            }
        }

        public new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("Licensee[");
            sb.Append(base.ToString());
            sb.Append(", productNumber=");
            sb.Append(productNumber);
            foreach (KeyValuePair<String, String> prop in licenseeProperties)
            {
                sb.Append(", ");
                sb.Append(prop.Key);
                sb.Append("=");
                sb.Append(prop.Value);
            }
            sb.Append("]");
            return sb.ToString();
        }

        internal new Dictionary<String, String> ToDictionary()
        {
            Dictionary<String, String> dict = base.ToDictionary();
            if (productNumber != null) dict["productNumber"] = productNumber;
            foreach (KeyValuePair<String, String> prop in licenseeProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }
    }
}
