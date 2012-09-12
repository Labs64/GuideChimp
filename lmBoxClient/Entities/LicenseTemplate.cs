using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using lmBoxClient.RestController;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Represents LicenseTemplate. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
    /// </summary>
    public class LicenseTemplate : BaseEntity
    {
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
        /// Type of licenses created from this license template. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public String licenseType { get; set; }

        /// <summary>
        /// Price for the license. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public Decimal? price { get; set; }

        /// <summary>
        /// Specifies currency for the license price. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public String currency { get; set; }

        /// <summary>
        /// If set to true, every new licensee automatically gets one license out of this license template on creation. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public Boolean automatic { get; set; }

        /// <summary>
        /// If set to true, this license template is not shown in lmBoxShop as offered for purchase. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public Boolean hidden { get; set; }

        /// <summary>
        /// If set to true, licenses from this license template are not visible to the end customer, but participate in validation. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/LicenseTemplate.html
        /// </summary>
        public Boolean hideLicenses { get; set; }

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
            if (!Constants.LicenseTemplate.TYPE_NAME.Equals(source.type))
            {
                throw new LmBoxException(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.LicenseTemplate.TYPE_NAME));
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
                    case Constants.LicenseTemplate.LICENSE_TYPE:
                        licenseType = p.Value;
                        break;
                    case Constants.PRICE:
                        price = Utilities.CheckedParseDecimal(p.Value, Constants.PRICE);
                        break;
                    case Constants.CURRENCY:
                        currency = p.Value;
                        break;
                    case Constants.LicenseTemplate.AUTOMATIC:
                        automatic = Utilities.CheckedParseBoolean(p.Value, Constants.LicenseTemplate.AUTOMATIC);
                        break;
                    case Constants.LicenseTemplate.HIDDEN:
                        hidden = Utilities.CheckedParseBoolean(p.Value, Constants.LicenseTemplate.HIDDEN);
                        break;
                    case Constants.LicenseTemplate.HIDE_LICENSES:
                        hideLicenses = Utilities.CheckedParseBoolean(p.Value, Constants.LicenseTemplate.HIDE_LICENSES);
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

        public override String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.LicenseTemplate.TYPE_NAME);
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
            sb.Append(Constants.LicenseTemplate.LICENSE_TYPE);
            sb.Append("=");
            sb.Append(licenseType);
            if (price.HasValue)
            {
                sb.Append(", ");
                sb.Append(Constants.PRICE);
                sb.Append("=");
                sb.Append(price.Value.ToString("F2", Utilities.lmBoxNumberFormat));
            }
            sb.Append(", ");
            sb.Append(Constants.CURRENCY);
            sb.Append("=");
            sb.Append(currency);
            sb.Append(", ");
            sb.Append(Constants.LicenseTemplate.AUTOMATIC);
            sb.Append("=");
            sb.Append(automatic);
            sb.Append(", ");
            sb.Append(Constants.LicenseTemplate.HIDDEN);
            sb.Append("=");
            sb.Append(hidden);
            sb.Append(", ");
            sb.Append(Constants.LicenseTemplate.HIDE_LICENSES);
            sb.Append("=");
            sb.Append(hideLicenses);
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
            if (licenseType != null) dict[Constants.LicenseTemplate.LICENSE_TYPE] = licenseType;
            if (price.HasValue) dict[Constants.PRICE] = price.Value.ToString("F2", Utilities.lmBoxNumberFormat);
            if (currency != null) dict[Constants.CURRENCY] = currency;
            dict[Constants.LicenseTemplate.AUTOMATIC] = automatic.ToString();
            dict[Constants.LicenseTemplate.HIDDEN] = hidden.ToString();
            dict[Constants.LicenseTemplate.HIDE_LICENSES] = hideLicenses.ToString();
            foreach (KeyValuePair<String, String> prop in licenseTemplateProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }
    }
}
