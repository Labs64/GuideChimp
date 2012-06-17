using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    /// <summary>
    /// Defines common entity fields. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/BaseDBEntity.html
    /// </summary>
    public abstract class BaseEntity
    {
        // Properties
        public String number { get; set; }
        public Boolean active { get; set; }

        // returns true if property was consumed.
        internal bool setFromProperty(property p)
        {
            switch (p.name)
            {
                case Constants.NUMBER:
                    verifyTypeIsString(p.Item);
                    number = p.Item as String;
                    return true;
                case Constants.ACTIVE:
                    verifyTypeIsString(p.Item);
                    bool tactive;
                    if (Boolean.TryParse(p.Item as String, out tactive))
                    {
                        active = tactive;
                    }
                    else
                    {
                        throw new Exception(String.Format("Expected value representing boolean for property '{0}', got '{1}'", Constants.ACTIVE, p.Item as String));
                    }
                    return true;
            }
            return false;
        }

        internal static void verifyTypeIsString(object o)
        {
            if (!(o is String))
            {
                throw new Exception(String.Format("Expected string type, got '{0}'", o.GetType()));
            }
        }

        internal new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.NUMBER);
            sb.Append("=");
            sb.Append(number);
            sb.Append(", ");
            sb.Append(Constants.ACTIVE);
            sb.Append("=");
            sb.Append(active);
            return sb.ToString();
        }

        internal Dictionary<String, String> ToDictionary()
        {
            Dictionary<String, String> dict = new Dictionary<String, String>();
            if (number != null) dict[Constants.NUMBER] = number;
            dict[Constants.ACTIVE] = active.ToString();
            return dict;
        }
    }
}
