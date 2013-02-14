using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LmBoxClient.RestController;
using LmBoxClient.Entities;
using System.Data;

namespace LmBoxClient
{
    /// <summary>
    /// C# representation of the LicenseTemplate Service. See LmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
    /// </summary>
    public class LicenseTemplateService
    {
        /// <summary>
        /// Creates new license template object with given properties. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static LicenseTemplate create(Context context, String productModuleNumber, LicenseTemplate newLicenseTemplate)
        {
            newLicenseTemplate.productModuleNumber = productModuleNumber;
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, Constants.LicenseTemplate.ENDPOINT_PATH, newLicenseTemplate.ToDictionary());
            return new LicenseTemplate(output.items[0]);
        }

        /// <summary>
        /// Gets license template by its number. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static LicenseTemplate get(Context context, String number)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.LicenseTemplate.ENDPOINT_PATH + "/" + number, null);
            return new LicenseTemplate(output.items[0]);
        }

        /// <summary>
        /// Returns all license templates of a vendor. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static List<LicenseTemplate> list(Context context, String filter)
        {
            Dictionary<String, String> parameters = new Dictionary<String, String>();
            if (filter != null && filter.Length > 0)
            {
                parameters.Add("filter", filter);
            }

            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.LicenseTemplate.ENDPOINT_PATH, parameters);

            List<LicenseTemplate> licenseTemplates = new List<LicenseTemplate>();
            foreach (item i in output.items)
            {
                licenseTemplates.Add(new LicenseTemplate(i));
            }
            return licenseTemplates;
        }
        /// <summary>
        /// Updates license template properties. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static LicenseTemplate update(Context context, String number, LicenseTemplate updateLicenseTemplate)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, Constants.LicenseTemplate.ENDPOINT_PATH + "/" + number, updateLicenseTemplate.ToDictionary());
            return new LicenseTemplate(output.items[0]);
        }

        /// <summary>
        /// Deletes license template. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static void delete(Context context, String number, Boolean forceCascade)
        {
            String strCascade = Convert.ToString(forceCascade).ToLower();
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.DELETE, Constants.LicenseTemplate.ENDPOINT_PATH + "/" + number, Utilities.forceCascadeToDict(forceCascade));
        }

    }
}