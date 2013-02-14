using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LmBoxClient.RestController;

namespace LmBoxClient.Entities
{
    /// <summary>
    /// Defines common entity fields. See LmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/BaseDBEntity.html
    /// </summary>
    public abstract class BaseEntity : IEntity
    {
        // Properties
        public String number { get; set; }
        public Boolean? active { get; set; }

        // returns true if property was consumed.
        internal bool setFromProperty(property p)
        {
            switch (p.name)
            {
                case Constants.NUMBER:
                    number = p.Value;
                    return true;
                case Constants.ACTIVE:
                    active = Utilities.CheckedParseBoolean(p.Value, Constants.ACTIVE);
                    return true;
            }
            return false;
        }

        internal static void verifyTypeIsString(object o)
        {
            if (!(o is String))
            {
                throw new LmBoxException(String.Format("Expected string type, got '{0}'", o.GetType()));
            }
        }

        public virtual String ToString()
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
            if (active.HasValue) dict[Constants.ACTIVE] = active.ToString();
            return dict;
        }
    }
}
