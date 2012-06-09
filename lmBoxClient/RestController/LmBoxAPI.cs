using System;
using System.Collections.Generic;
using System.Net;
using System.IO;
using System.Xml.Serialization;

namespace lmBoxClient.RestController
{
    class LmBoxAPI
    {
        public enum Method { GET, POST };

        public static lmbox request(Context context, Method method, String path, Dictionary<String, String> parameters)
        {
            HttpWebRequest request = WebRequest.Create(context.baseUrl + path) as HttpWebRequest;
            switch (method)
            {
                case Method.GET: request.Method = "GET"; break;
                case Method.POST: request.Method = "POST"; break;
                default:
                    // TODO: error
                    break;
            }
            request.Credentials = new NetworkCredential(context.username, context.password);
            if (parameters != null)
            {
                bool first = true;
                request.ContentType = "application/x-www-form-urlencoded";
                using (TextWriter writer = new StreamWriter(request.GetRequestStream()))
                {
                    foreach (KeyValuePair<String, String> param in parameters)
                    {
                        if (first)
                        {
                            first = false;
                        } else { 
                            writer.Write("&");
                        }
                        writer.Write(param.Key + "=" + param.Value); // TODO: UrlEncode
                    }
                }
            }

            lmbox responsePayload = null;
            try
            {
                using (HttpWebResponse response = (request as HttpWebRequest).GetResponse() as HttpWebResponse)
                {
                    switch (response.StatusCode)
                    {
                        case HttpStatusCode.OK:
                        case HttpStatusCode.NoContent:
                            break;
                        default:
                            throw new Exception(String.Format("Got bad rasponse result code {0}: '{1}'", response.StatusCode, response.StatusDescription));
                    }

                    // Deserialize
                    using (Stream input = response.GetResponseStream())
                    {
                        XmlSerializer lmBoxSerializer = new XmlSerializer(typeof(lmbox));
                        responsePayload = lmBoxSerializer.Deserialize(input) as lmbox;
                    }
                    response.Close();
                }
            }
            catch (WebException ex)
            {
                // TODO: process WebException and recover if possible
                throw new Exception(ex.Message);
            }
            return responsePayload;
        }
    }
}
