using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient
{
    /// <summary>
    /// Holds the common context for all calls to the lmBoxAPI RESTful, in particular server URL and login credentials.
    /// </summary>
    public class Context
    {
        /// <summary>
        /// Server URL base of lmBoxAPI RESTful. Normally should be "https://lmbox.labs64.com/core/rest".
        /// </summary>
        public String baseUrl { get; set; }

        /// <summary>
        /// Login name of the user sending the requests.
        /// </summary>
        public String username { get; set; }

        /// <summary>
        /// Password of the user sending the requests.
        /// </summary>
        public String password { get; set; }
    }
}
