using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    public abstract class BaseEntity
    {
        // Properties
        public String number { get; set; }
        public bool active { get; set; }

        // returns true if property was consumed.
        public bool setFromProperty(property p)
        {
            switch (p.name)
            {
                case "number":
                    verifyTypeIsString(p.Item);
                    number = p.Item as String;
                    return true;
                case "active":
                    verifyTypeIsString(p.Item);
                    bool tactive;
                    if (Boolean.TryParse(p.Item as String, out tactive))
                    {
                        active = tactive;
                    }
                    else
                    {
                        throw new Exception(String.Format("Expected value representing boolean for property 'active', got '{0}'", p.Item as String));
                    }
                    return true;
            }
            return false;
        }

        protected void verifyTypeIsString(object o)
        {
            if (!(o is String))
            {
                throw new Exception(String.Format("Expected string type, got '{0}'", o.GetType()));
            }
        }

        protected new String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("number=");
            sb.Append(number);
            sb.Append(", active=");
            sb.Append(active);
            return sb.ToString();
        }
    }
}
