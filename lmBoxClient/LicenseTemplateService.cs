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
    /// C# representation of the LicenseTemplate Service. See lmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
    /// </summary>
    public class LicenseTemplateService
    {
        /// <summary>
        /// Creates new license template object with given properties. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static LicenseTemplate create(Context context, String productModuleNumber, LicenseTemplate newLicenseTemplate)
        {
            newLicenseTemplate.productModuleNumber = productModuleNumber;
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, "/licensetemplate", newLicenseTemplate.ToDictionary());
            return new LicenseTemplate(output.items[0]);
        }

        /// <summary>
        /// Gets license template by its number. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static LicenseTemplate get(Context context, String number)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, "/licensetemplate/" + number, null);
            return new LicenseTemplate(output.items[0]);
        }

        /// <summary>
        /// Returns all license templates of a vendor. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static List<LicenseTemplate> list(Context context, String filter)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, "/licensetemplate", null);

            List<LicenseTemplate> licenseTemplates = new List<LicenseTemplate>();
            foreach (item i in output.items)
            {
                licenseTemplates.Add(new LicenseTemplate(i));
            }
            return licenseTemplates;
        }
        /// <summary>
        /// Updates license template properties. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static LicenseTemplate update(Context context, String number, LicenseTemplate updateLicenseTemplate)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, "/licensetemplate/" + number, updateLicenseTemplate.ToDictionary());
            return new LicenseTemplate(output.items[0]);
        }

        /// <summary>
        /// Deletes license template. See lmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseTemplateService.html
        /// </summary>
        public static void delete(Context context, String number, Boolean forceCascade)
        {
            String strCascade = Convert.ToString(forceCascade).ToLower();
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.DELETE, "/licensetemplate/" + number + "?" + Constants.CASCADE + "=" + strCascade, null);
        }    }

    }