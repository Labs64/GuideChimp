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
            if (!Constants.Licensee.LICENSEE_TYPE.Equals(source.type))
            {
                throw new Exception(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.Licensee.LICENSEE_TYPE));
            }
            licenseeProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                switch (p.name)
                {
                    case Constants.Product.PRODUCT_NUMBER:
                        productNumber = p.Value;
                        break;
                    default:
                        if (!base.setFromProperty(p)) // Not BaseEntity property?
                        {
                            // custom property
                            licenseeProperties.Add(p.name, p.Value);
                        }
                        break;
                }
            }
        }

        public new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.Licensee.LICENSEE_TYPE);
            sb.Append("[");
            sb.Append(base.ToString());
            sb.Append(", ");
            sb.Append(Constants.Product.PRODUCT_NUMBER);
            sb.Append("=");
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
            if (productNumber != null) dict[Constants.Product.PRODUCT_NUMBER] = productNumber;
            foreach (KeyValuePair<String, String> prop in licenseeProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }
    }
}
