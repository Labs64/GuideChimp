using System;
using System.Collections.Generic;
using System.Net;
using System.IO;
using System.Xml.Serialization;
using System.Text;

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
                StringBuilder requestPayload = new StringBuilder();
                bool first = true;
                foreach (KeyValuePair<String, String> param in parameters)
                {
                    if (first)
                    {
                        first = false;
                    }
                    else
                    {
                        requestPayload.Append("&");
                    }
                    // TODO: UrlEncode
                    requestPayload.Append(param.Key);
                    requestPayload.Append("=");
                    requestPayload.Append(param.Value);
                }
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = requestPayload.Length;
                using (var writer = new StreamWriter(request.GetRequestStream()))
                {
                    writer.Write(requestPayload.ToString());
                }
            }

            lmbox responsePayload = null;
            try
            {
                using (HttpWebResponse response = (request as HttpWebRequest).GetResponse() as HttpWebResponse)
                {
                    HttpStatusCode statusCode = response.StatusCode;
                    responsePayload = deserialize(response.GetResponseStream());
                    response.Close();

                    switch (statusCode)
                    {
                        case HttpStatusCode.OK:
                        case HttpStatusCode.NoContent:
                            break;
                        default:
                            throw new Exception(String.Format("Got unsupported response result code {0}: '{1}'", response.StatusCode, response.StatusDescription));
                    }
                }
            }
            catch (WebException ex)
            {
                using (HttpWebResponse response = ex.Response as HttpWebResponse)
                {
                    responsePayload = deserialize(response.GetResponseStream());
                    HttpStatusCode statusCode = response.StatusCode;
                    response.Close();

                    switch (statusCode)
                    {
                        case HttpStatusCode.BadRequest:
                            StringBuilder messages = new StringBuilder();
                            messages.AppendLine("Bad request to the lmBoxAPI:");
                            foreach (info i in responsePayload.infos)
                            {
                                messages.AppendLine(i.Value);
                            }
                            throw new Exception(messages.ToString());
                        default:
                            throw new Exception("Request to lmBoxAPI failed.", ex);
                    }
                }
            }
            return responsePayload;
        }

        private static lmbox deserialize(Stream responseStream)
        {
            XmlSerializer lmBoxSerializer = new XmlSerializer(typeof(lmbox));
            return lmBoxSerializer.Deserialize(responseStream) as lmbox;
        }

    }
}
