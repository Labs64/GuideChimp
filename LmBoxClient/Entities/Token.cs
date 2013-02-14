using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LmBoxClient.Entities
{
    class Token : BaseEntity
    {
        /// <summary>
        /// Custom properties of the licensee. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/common/domain/entity/Licensee.html
        /// </summary>
        public Dictionary<String, String> tokenProperties { get; private set; }

        // default constructor
        public Token()
        {
            tokenProperties = new Dictionary<String, String>();
        }

        // construct from REST response item
        internal Token(item source)
        {
            if (!Constants.Token.TYPE_NAME.Equals(source.type))
            {
                throw new LmBoxException(String.Format("Wrong object type '{0}', expected '{1}'", (source.type != null) ? source.type : "<null>", Constants.Token.TYPE_NAME));
            }
            tokenProperties = new Dictionary<String, String>();
            foreach (property p in source.property)
            {
                if (!base.setFromProperty(p)) // Not BaseEntity property?
                {
                    // custom property
                    tokenProperties.Add(p.name, p.Value);
                }
            }
        }

        public override String ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Constants.Token.TYPE_NAME);
            sb.Append("[");
            sb.Append(base.ToString());
            foreach (KeyValuePair<String, String> prop in tokenProperties)
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
            foreach (KeyValuePair<String, String> prop in tokenProperties)
            {
                dict[prop.Key] = prop.Value;
            }
            return dict;
        }

    }
}
