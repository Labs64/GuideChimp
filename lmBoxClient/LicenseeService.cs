using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using lmBoxClient.RestController;
using lmBoxClient.Entities;
using System.Data;

namespace lmBoxClient
{
    public class LicenseeService
    {
        public static Licensee create(Context ctx, String productNumber, Licensee newLicensee)
        {
            lmbox output = LmBoxAPI.request(ctx, LmBoxAPI.Method.POST, "/licensee", null);

            List<Licensee> licensees = new List<Licensee>();
            foreach (item i in output.items)
            {
                licensees.Add(new Licensee(i));
            }
            return null;
        }

        public static Licensee get(Context ctx, String number)
        {
            // TODO: Stub
            return null;
        }

        public static List<Licensee> list(Context ctx)
        {
            lmbox output = LmBoxAPI.request(ctx, LmBoxAPI.Method.GET, "/licensee", null);

            // TODO: process output.infos
            List<Licensee> licensees = new List<Licensee>();
            foreach (item i in output.items)
            {
                licensees.Add(new Licensee(i));
            }
            return licensees;
        }

        public static Licensee update(Context ctx, String number, Licensee updateLicensee)
        {
            // TODO: Stub
            return null;
        }

        public static void delete(Context ctx, String number, bool forceCascade)
        {
            // TODO: Stub
            return;
        }

        public static ValidationResult validate(Context ctx, String number)
        {
            // TODO: Stub
            return null;
        }

    }
}
