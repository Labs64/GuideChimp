using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LmBoxClient
{
    public class LmBoxException : Exception
    {

        public LmBoxException(string message) : base(message) { }

        public LmBoxException(string message, Exception innerException) :
            base(message, innerException) { }

    }
}
