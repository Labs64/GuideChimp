using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Represents ProductModule. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/ProductModule.html
    /// </summary>
    public class ProductModule : BaseEntity
    {
        /// <summary>
        /// ProductModule name. Not null. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/ProductModule.html
        /// </summary>
        public String name { get; set; }

        /// <summary>
        /// Product number related to this ProductModule. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/ProductModule.html
        /// </summary>
        public String productNumber { get; set; }

        /// <summary>
        /// Custom properties of the product module. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/ProductModule.html
        /// </summary>
        public Dictionary<String, String> productModuleProperties { get; private set; }

        // default constructor
        public ProductModule()
        {
            productModuleProperties = new Dictionary<String, String>();
        }

        // construct from REST response item
        internal ProductModule(item source)
        {
            if (!Constants.ProductModule.PRODUCT_MODULE_TYPE.Equals(source.type))
            {
                throw new LmBoxException(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.ProductModule.PRODUCT_MODULE_TYPE));
            }
            productModuleProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                switch(p.name)
                {
                    case Constants.NAME:
                        name = p.Value;
                        break;
                    case Constants.Product.PRODUCT_NUMBER:
                        productNumber = p.Value;
                    break;
                }
                if (!base.setFromProperty(p)) // Not BaseEntity property?
                {
                    // custom property
                    productModuleProperties.Add(p.name, p.Value);
                }
            }
        }

        public new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.ProductModule.PRODUCT_MODULE_TYPE);
            sb.Append("[");
            sb.Append(base.ToString());
            sb.Append(", ");
            sb.Append(Constants.Product.PRODUCT_NUMBER);
            sb.Append("=");
            sb.Append(productNumber);
            foreach (KeyValuePair<String, String> prop in productModuleProperties)
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
            if (productNumber != null) dict[Constants.Product.PRODUCT_NUMBER] = productNumber;
            foreach (KeyValuePair<String, String> prop in productModuleProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }

    }
}
