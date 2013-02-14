using System;
using System.Collections.Generic;
using System.Net;
using System.IO;
using System.Xml.Serialization;
using System.Text;
using System.Web;
using LmBoxClient.Entities;

namespace LmBoxClient.RestController
{
    class LmBoxAPI
    {
        public enum Method { GET, POST, DELETE };

        public static lmbox request(Context context, Method method, String path, Dictionary<String, String> parameters)
        {
            #region HTTP request preparation
            // Workaround of the mod_proxy_ajp problem.
            // mod_proxy_ajp has problem processing HTTP/1.1 POST request with delayed payload transmission (Expect: 100 Continue), causes 500 Server Error in AJP module.
            // Resources on the topic:
            // http://haacked.com/archive/2004/05/15/http-web-request-expect-100-continue.aspx
            // http://stackoverflow.com/questions/3889574/apache-and-mod-proxy-not-handling-http-100-continue-from-client-http-417
            // https://issues.apache.org/bugzilla/show_bug.cgi?id=46709
            // https://issues.apache.org/bugzilla/show_bug.cgi?id=47087
            ServicePointManager.Expect100Continue = false;

            StringBuilder requestPayload = new StringBuilder();
            if (parameters != null)
            {
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
                    requestPayload.Append(HttpUtility.UrlEncode(param.Key));
                    requestPayload.Append("=");
                    requestPayload.Append(HttpUtility.UrlEncode(param.Value));
                }
            }
            String urlParam = "";
            String requestBody = null;
            switch (method)
            {
                case Method.GET:
                case Method.DELETE:
                    urlParam = "?" + requestPayload.ToString();
                    break;
                case Method.POST:
                    requestBody = requestPayload.ToString();
                    break;
                default:
                    // TODO: error - unsupported method
                    break;
            }

            HttpWebRequest request = WebRequest.Create(context.baseUrl + Constants.REST_API_PATH + "/" + path + urlParam) as HttpWebRequest;
            request.UserAgent = "LmBox C# Client";
            switch (method)
            {
                case Method.GET: request.Method = "GET"; break;
                case Method.POST: request.Method = "POST"; break;
                case Method.DELETE: request.Method = "DELETE"; break;
                default:
                    // TODO: error - unsupported method
                    break;
            }
            request.Credentials = new NetworkCredential(context.username, context.password);
            request.Accept = "application/xml";
            request.SendChunked = false;
            if (requestBody != null)
            {
                request.ContentType = "application/x-www-form-urlencoded";
                byte[] byteArray = Encoding.UTF8.GetBytes(requestBody);
                request.ContentLength = byteArray.Length;

                Stream dataStream = request.GetRequestStream();
                dataStream.Write(byteArray, 0, byteArray.Length);
                dataStream.Close();
            }
            #endregion

            lmbox responsePayload = null;
            try
            {
                #region HTTP response parsing
                using (HttpWebResponse response = (request as HttpWebRequest).GetResponse() as HttpWebResponse)
                {
                    HttpStatusCode statusCode = response.StatusCode;
                    switch (statusCode)
                    {
                        case HttpStatusCode.OK:
                            responsePayload = deserialize(response.GetResponseStream());
                            break;
                        case HttpStatusCode.NoContent:
                            break;
                        default:
                            throw new LmBoxException(String.Format("Got unsupported response result code {0}: '{1}'", response.StatusCode, response.StatusDescription));
                    }
                      response.Close();
                }
                #endregion
            }
            catch (WebException ex)
            {
                #region HTTP and LmBox errors conversion to Exception
                String plainTextResponse = null;
                using (HttpWebResponse response = ex.Response as HttpWebResponse)
                {
                    if (response != null)
                    {
                        try
                        {
                            responsePayload = deserialize(response.GetResponseStream());
                        }
                        catch (InvalidOperationException)
                        {
                            // Ignore deserialization errors - response is not necessarily formated as lmbox
                            response.GetResponseStream().Seek(0, SeekOrigin.Begin);
                            using (var reader = new StreamReader(response.GetResponseStream()))
                            {
                                plainTextResponse = reader.ReadToEnd();
                            }
                        }
                        response.Close();
                    }
                }
                StringBuilder messages = new StringBuilder();
                messages.AppendLine("Bad request to the LmBoxAPI:");
                if (responsePayload != null)
                {
                    foreach (info i in responsePayload.infos)
                    {
                        messages.AppendLine(i.Value);
                    }
                }
                if (plainTextResponse != null)
                {
                    messages.AppendLine(plainTextResponse);
                }
                throw new LmBoxException(messages.ToString(), ex);
                #endregion
            }
            return responsePayload;
        }

        private static lmbox deserialize(Stream responseStream)
        {
            XmlSerializer LmBoxSerializer = new XmlSerializer(typeof(lmbox));
            return LmBoxSerializer.Deserialize(responseStream) as lmbox;
        }
    }
}
