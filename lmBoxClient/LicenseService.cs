using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using lmBoxClient.RestController;
using lmBoxClient.Entities;
using System.Data;

namespace lmBoxClient
{
    /// <summary>
    /// C# representation of the Licensee Service. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseService.html
    /// </summary>
    public class LicenseService
    {
        /// <summary>
        /// Creates new licensee object with given properties. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseService.html
        /// </summary>
        public static License create(Context context, String licenseeNumber, String licenseTemplateNumber, String transactionNumber, License newLicense)
        {
            newLicense.licenseeNumber = licenseeNumber;
            newLicense.licenseTemplateNumber = licenseTemplateNumber;
            newLicense.licenseProperties.Add(Constants.Transaction.TRANSACTION_NUMBER, transactionNumber);
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, Constants.License.endPoint, newLicense.ToDictionary());
            return new License(output.items[0]);
        }

        /// <summary>
        /// Gets license by its number. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseService.html
        /// </summary>
        public static License get(Context context, String number)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.License.endPoint + number, null);
            return new License(output.items[0]);
        }

        /// <summary>
        /// Returns all licenses of a vendor. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseService.html
        /// </summary>
        public static List<License> list(Context context)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.License.endPoint, null);

            List<License> licenses = new List<License>();
            foreach (item i in output.items)
            {
                licenses.Add(new License(i));
            }
            return licenses;
        }

        /// <summary>
        /// Updates license properties. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseService.html
        /// </summary>
        public static License update(Context context, String number, String transactionNumber, License updateLicense)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, Constants.License.endPoint + number, updateLicense.ToDictionary());
            return new License(output.items[0]);
        }

        /// <summary>
        /// Deletes license. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseService.html
        /// </summary>
        public static void delete(Context context, String number)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.DELETE, Constants.License.endPoint + number, null);
        }

    }
}
