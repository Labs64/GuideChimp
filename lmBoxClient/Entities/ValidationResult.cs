using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Contains result of the Licensee.validate() operation. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/vo/ValidationResult.html
    /// </summary>
    public class ValidationResult
    {

        private Dictionary<String, Dictionary<String, String>> validations;

        public ValidationResult(lmbox source)
        {
            validations = new Dictionary<String, Dictionary<String, String>>();
            foreach (item i in source.items)
            {
                if (!Constants.ValidationResult.VALIDATION_RESULT_TYPE.Equals(i.type))
                {
                    throw new Exception(String.Format("Wrong object type '{0}', expected '{1}'", (i.type != null) ? i.type : "<null>", Constants.ValidationResult.VALIDATION_RESULT_TYPE));
                }
                Dictionary<String, String> pmValidateProperties = new Dictionary<String, String>();
                String productModuleNumber = null;
                foreach (property p in i.property)
                {
                    switch (p.name)
                    {
                        case Constants.ProductModule.PRODUCT_MODULE_NUMBER:
                            BaseEntity.verifyTypeIsString(p.Item);
                            productModuleNumber = p.Item as String;
                            break;
                        default:
                            pmValidateProperties.Add(p.name, p.Item as String);
                            break;
                    }
                }
                if (productModuleNumber == null)
                {
                    throw new Exception(String.Format("Validation item does not contain property '{0}'", Constants.ProductModule.PRODUCT_MODULE_NUMBER));
                }
                setProductModuleValidation(productModuleNumber, pmValidateProperties);
            }
        }

        public Dictionary<String, Dictionary<String, String>> getValidations()
        {
            return validations;
        }

        public Dictionary<String, String> getProductModuleValidation(String productModuleNumber)
        {
            return validations[productModuleNumber];
        }

        internal void setProductModuleValidation(String productModuleNumber, Dictionary<String, String> productModuleValidaton)
        {
            validations.Add(productModuleNumber, productModuleValidaton);
        }

        /// <summary>
        /// Converts ValidationResult object to a String representation.  See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/vo/ValidationResult.html
        /// </summary>
        /// <returns></returns>
        public new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.ValidationResult.VALIDATION_RESULT_TYPE);
            sb.Append("[");
            bool first = true;
            foreach (KeyValuePair<String, Dictionary<String, String>> validationEntry in getValidations())
            {
                if (first) {
                    first = false;
                } else {
                    sb.Append(", ");
                }
                sb.Append(Constants.ProductModule.PRODUCT_MODULE_TYPE);
                sb.Append("<");
                sb.Append(validationEntry.Key);
                sb.Append(">");
                sb.Append("{");
                bool firstInner = true;
                foreach (KeyValuePair<String, String> prop in validationEntry.Value)
                {
                    if (firstInner) {
                        firstInner = false;
                    } else {
                        sb.Append(", ");
                    }
                    sb.Append(prop.Key);
                    sb.Append("=");
                    sb.Append(prop.Value);
                }
                sb.Append("}");
            }
            sb.Append("]");
            return sb.ToString();
        }

    }
}
