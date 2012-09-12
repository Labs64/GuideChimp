using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Represents LicenseTemplate. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
    /// </summary>
    public class LicenseTemplate : BaseEntity
    {
        enum Type { FEATURE, TIMEVOLUME };

        /// <summary>
        /// License type name. Not null. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public String licenseType { get; set; }
        
        /// <summary>
        /// License template name. Not null. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public String name { get; set; }

        /// <summary>
        /// Product module number of this license template. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public String productModuleNumber { get; set; }

        /// <summary>
        /// Custom properties of the license template. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public Dictionary<String, String> licenseTemplateProperties { get; private set; }

        // default constructor
        public LicenseTemplate()
        {
            licenseTemplateProperties = new Dictionary<String, String>();
        }

        // construct from REST response item
        internal LicenseTemplate(item source)
        {
            if (!Constants.LicenseTemplate.LICENSE_TEMPLATE_TYPE.Equals(source.type))
            {
                throw new LmBoxException(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.LicenseTemplate.LICENSE_TEMPLATE_TYPE));
            }
            licenseTemplateProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                switch (p.name)
                {
                    case Constants.NAME:
                        name = p.Value;
                        break;
                    case Constants.ProductModule.PRODUCT_MODULE_NUMBER:
                        productModuleNumber = p.Value;
                        break;
                    case Constants.LICENSE_TYPE:
                        licenseType = p.Value;
                        break;
                    default:
                        if (!base.setFromProperty(p)) // Not BaseEntity property?
                        {
                            // custom property
                            licenseTemplateProperties.Add(p.name, p.Value);
                        }
                        break;
                }
            }
        }

        public new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.LicenseTemplate.LICENSE_TEMPLATE_TYPE);
            sb.Append("[");
            sb.Append(base.ToString());
            sb.Append(", ");
            sb.Append(Constants.NAME);
            sb.Append("=");
            sb.Append(name);
            sb.Append(", ");
            sb.Append(Constants.ProductModule.PRODUCT_MODULE_NUMBER);
            sb.Append("=");
            sb.Append(productModuleNumber);
            sb.Append(", ");
            sb.Append(Constants.LICENSE_TYPE);
            sb.Append("=");
            sb.Append(licenseType);
            foreach (KeyValuePair<String, String> prop in licenseTemplateProperties)
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
            if (productModuleNumber != null) dict[Constants.ProductModule.PRODUCT_MODULE_NUMBER] = productModuleNumber;
            if ((licenseType != null) & (Array.IndexOf(Enum.GetNames(typeof(Type)), licenseType) != -1))
            {
                dict[Constants.LICENSE_TYPE] = licenseType;
            }
            else
            {
                throw new LmBoxException(String.Format("Wrong license type '{0}'", licenseType));
            }
   
            foreach (KeyValuePair<String, String> prop in licenseTemplateProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }
    }
}
