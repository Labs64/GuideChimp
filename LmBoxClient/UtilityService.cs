using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LmBoxClient.RestController;
using LmBoxClient.Entities;

namespace LmBoxClient
{
    public class UtilityService
    {
        /// <summary>
        /// Returns all license types.
        /// </summary>
        public static List<String> listLicenseTypes(Context context)
        {

            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.Utility.ENDPOINT_PATH + "/" + Constants.Utility.LICENSE_TYPES , null);

            List<String> licenseTypes = new List<String>();
            foreach (item i in output.items)
            {
                if (Constants.Utility.LICENSE_TYPE.Equals(i.type))
                {
                    foreach (property p in i.property)
                    {
                        if (p.name == Constants.NAME)
                        {
                            licenseTypes.Add(p.Value);
                        }
                    }
                }
            }
            return licenseTypes;
        }

        /// <summary>
        /// Returns all licensing models.
        /// </summary>
        public static List<String> listLicensingModels(Context context)
        {

            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.Utility.ENDPOINT_PATH + "/" + Constants.Utility.LICENSING_MODELS, null);

            List<String> licensingModels = new List<String>();
            foreach (item i in output.items)
            {
                if (Constants.Utility.LICENSING_MODELS_PROPERTIES.Equals(i.type))
                {
                    foreach (property p in i.property)
                    {
                        if (p.name == Constants.NAME)
                        {
                            licensingModels.Add(p.Value);
                        }
                    }
                }
            }
            return licensingModels;
        }

    }
}
