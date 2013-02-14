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
    /// C# representation of the Licensee Service. See LmBoxAPI JavaDoc for details:
    /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseeService.html
    /// </summary>
    public class LicenseeService
    {
        /// <summary>
        /// Creates new licensee object with given properties. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseeService.html
        /// </summary>
        public static Licensee create(Context context, String productNumber, Licensee newLicensee)
        {
            newLicensee.productNumber = productNumber;
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, Constants.Licensee.ENDPOINT_PATH, newLicensee.ToDictionary());
            return new Licensee(output.items[0]);
        }

        /// <summary>
        /// Gets licensee by its number. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseeService.html
        /// </summary>
        public static Licensee get(Context context, String number)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.Licensee.ENDPOINT_PATH + "/" + number, null);
            return new Licensee(output.items[0]);
        }

        /// <summary>
        /// Returns all licensees of a vendor. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseeService.html
        /// </summary>
        public static List<Licensee> list(Context context, String filter)
        {
            Dictionary<String, String> parameters = new Dictionary<String, String>();
            if (filter != null && filter.Length > 0) 
            {
                parameters.Add("filter", filter);
            } 

            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.Licensee.ENDPOINT_PATH, parameters);

            List<Licensee> licensees = new List<Licensee>();
            foreach (item i in output.items)
            {
                licensees.Add(new Licensee(i));
            }
            return licensees;
        }

        /// <summary>
        /// Updates licensee properties. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseeService.html
        /// </summary>
        public static Licensee update(Context context, String number, Licensee updateLicensee)
        {
            updateLicensee.number = number;
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, Constants.Licensee.ENDPOINT_PATH + "/" + number, updateLicensee.ToDictionary());
            return new Licensee(output.items[0]);
        }

        /// <summary>
        /// Deletes licensee. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseeService.html
        /// </summary>
        public static void delete(Context context, String number, Boolean forceCascade)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.DELETE, Constants.Licensee.ENDPOINT_PATH + "/" + number, Utilities.forceCascadeToDict(forceCascade));
        }

        /// <summary>
        /// Validates active licenses of the licensee. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/LicenseeService.html
        /// </summary>
        public static ValidationResult validate(Context context, String number, String productNumber)
        {
            Dictionary<String, String> parameters = new Dictionary<String, String>();
            if (productNumber != null || productNumber.Length > 0) 
            {
                parameters.Add("productNumber", productNumber);
            } 

            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.Licensee.ENDPOINT_PATH + "/" + number + "/validate", parameters);
            return new ValidationResult(output);
        }

    }
}
