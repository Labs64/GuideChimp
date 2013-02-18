using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LmBoxClient.Entities
{
    class PaymentMethod : BaseEntity
    {
        /// <summary>
        /// Custom properties of the licensee. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Licensee.html
        /// </summary>
        public Dictionary<String, String> paymentMethodProperties { get; private set; }

        // default constructor
        public PaymentMethod()
        {
            paymentMethodProperties = new Dictionary<String, String>();
        }

        // construct from REST response item
        internal PaymentMethod(item source)
        {
            if (!Constants.PaymentMethod.TYPE_NAME.Equals(source.type))
            {
                throw new LmBoxException(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.PaymentMethod.TYPE_NAME));
            }
            paymentMethodProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                if (!base.setFromProperty(p)) // Not BaseEntity property?
                {
                    // custom property
                    paymentMethodProperties.Add(p.name, p.Value);
                }
            }
        }

        public override String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.PaymentMethod.TYPE_NAME);
            sb.Append("[");
            sb.Append(base.ToString());
            foreach (KeyValuePair<String, String> prop in paymentMethodProperties)
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
            foreach (KeyValuePair<String, String> prop in paymentMethodProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }


    }
}
