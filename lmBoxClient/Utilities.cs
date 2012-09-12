using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using lmBoxClient.Entities;
using System.Globalization;

namespace lmBoxClient.RestController
{
    static class Utilities
    {
        public static NumberFormatInfo lmBoxNumberFormat { get; private set; }

        static Utilities()
        {
            lmBoxNumberFormat = new NumberFormatInfo();
            lmBoxNumberFormat.NumberDecimalSeparator = ".";
        }

        public static Dictionary<String, String> forceCascadeToDict(Boolean forceCascade)
        {
            Dictionary<String, String> dict = new Dictionary<String, String>();
            dict[Constants.CASCADE] = Convert.ToString(forceCascade).ToLower();
            return dict;
        }

        public static Boolean CheckedParseBoolean(String source, String propertyName)
        {
            Boolean val;
            if (Boolean.TryParse(source, out val))
            {
                return val;
            }
            else
            {
                throw new LmBoxException(String.Format("Expected value representing boolean for property '{0}', got '{1}'", propertyName, source));
            }
        }

        public static Decimal CheckedParseDecimal(String source, String propertyName)
        {
            Decimal val;
            if (Decimal.TryParse(source, NumberStyles.AllowDecimalPoint, lmBoxNumberFormat, out val))
            {
                return val;
            }
            else
            {
                throw new LmBoxException(String.Format("Expected value representing decimal for property '{0}', got '{1}'", propertyName, source));
            }
        }

    }
}
