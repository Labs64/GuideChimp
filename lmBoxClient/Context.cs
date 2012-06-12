using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient
{
    /// <summary>
    /// Holds the common context for all calls to the RESTful lmBoxAPI, in particular server URL and login credentials.
    /// </summary>
    public class Context
    {
        public String baseUrl;
        public String username;
        public String password;
    }
}
