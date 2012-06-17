using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Represents License. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/License.html
    /// </summary>
    public class License : BaseEntity
    {
        /// <summary>
        /// Licesnee number of the license owner. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/License.html
        /// </summary>
        public String licenseeNumber { get; set; }

        /// <summary>
        /// Licesne template number of this license. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/License.html
        /// </summary>
        public String licenseTemplateNumber { get; set; }

        /// <summary>
        /// Custom properties of the license. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/License.html
        /// </summary>
        public Dictionary<String, String> licenseProperties { get; private set; }

        // default constructor
        public License()
        {
            licenseProperties = new Dictionary<String, String>();
        }

        // construct from REST response item
        internal License(item source)
        {
            if (!Constants.License.LICENSE_TYPE.Equals(source.type))
            {
                throw new Exception(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.License.LICENSE_TYPE));
            }
            licenseProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                switch (p.name)
                {
                    case Constants.Licensee.LICENSEE_NUMBER:
                        verifyTypeIsString(p.Item);
                        licenseeNumber = p.Item as String;
                        break;
                    case Constants.LicenseTemplate.LICENSE_TEMPLATE_NUMBER:
                        verifyTypeIsString(p.Item);
                        licenseTemplateNumber = p.Item as String;
                        break;
                    default:
                        if (!base.setFromProperty(p)) // Not BaseEntity property?
                        {
                            // custom property
                            licenseProperties.Add(p.name, p.Item as String);
                        }
                        break;
                }
            }
        }

        public new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.License.LICENSE_TYPE);
            sb.Append("[");
            sb.Append(base.ToString());
            sb.Append(", ");
            sb.Append(Constants.Licensee.LICENSEE_NUMBER);
            sb.Append("=");
            sb.Append(licenseeNumber);
            sb.Append(", ");
            sb.Append(Constants.LicenseTemplate.LICENSE_TEMPLATE_NUMBER);
            sb.Append("=");
            sb.Append(licenseTemplateNumber);
            foreach (KeyValuePair<String, String> prop in licenseProperties)
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
            if (licenseeNumber != null) dict[Constants.Licensee.LICENSEE_NUMBER] = licenseeNumber;
            if (licenseTemplateNumber != null) dict[Constants.LicenseTemplate.LICENSE_TEMPLATE_NUMBER] = licenseTemplateNumber;
            foreach (KeyValuePair<String, String> prop in licenseProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }
    }
}
