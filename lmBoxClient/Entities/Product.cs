using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Represents Product. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Product.html
    /// </summary>
    public class Product : BaseEntity
    {
        /// <summary>
        /// Product name. Not null. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Product.html
        /// </summary>
        public String name { get; set; }
       
        /// <summary>
        /// Custom properties of the product. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Product.html
        /// </summary>
        public Dictionary<String, String> productProperties { get; private set; }

        // default constructor
        public Product()
        {
            productProperties = new Dictionary<String, String>();
        }

        // construct from REST response item
        internal Product(item source)
        {
            if (!Constants.Product.PRODUCT_TYPE.Equals(source.type))
            {
                throw new LmBoxException(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.Product.PRODUCT_TYPE));
            }
            productProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                if (p.name == Constants.NAME)
                {
                    name = p.Value;
                }
                if (!base.setFromProperty(p)) // Not BaseEntity property?
                {
                    // custom property
                    productProperties.Add(p.name, p.Value);
                }
            }
        }

        public new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.Product.PRODUCT_TYPE);
            sb.Append("[");
            sb.Append(base.ToString());
            foreach (KeyValuePair<String, String> prop in productProperties)
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
            if (name != null) dict[Constants.NAME] = name;
            foreach (KeyValuePair<String, String> prop in productProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }

    }
}
