using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using lmBoxClient;
using lmBoxClient.Entities;

namespace lmBoxClient
{
    class lmBoxClient_demo
    {
        static void Main(string[] args)
        {
            try
            {
                Context context = new Context();
                // context.baseUrl = "http://lmbox.labs64.com/core/rest";
                context.baseUrl = "http://10.0.2.2:28080";
                context.username = "demo";
                context.password = "demo";

                String product = "P014";
                String licenseTemplate = "E011";

                #region ****************** Licensee
                Licensee gotLicensee = LicenseeService.get(context, "I011");
                Console.WriteLine("Got default licensee: ");
                Console.WriteLine(gotLicensee.ToString());
                Console.WriteLine("");

                Licensee updateLicensee = new Licensee();
                updateLicensee.licenseeProperties.Add("Updated property name", "Updated value"); 
                Licensee upLicensee = LicenseeService.update(context, "I011", updateLicensee);
                Console.WriteLine("Updated default licensee: ");
                Console.WriteLine(upLicensee.ToString());
                Console.WriteLine("");

                LicenseeService.delete(context, "I011", true);
                Console.WriteLine("Deleted default licensee!");
                Console.WriteLine("");

                List<Licensee> licensees = LicenseeService.list(context);
                Console.WriteLine("Got the following licensees:");
                foreach (Licensee licensee in licensees)
                {
                    Console.WriteLine(licensee.ToString());
                }
                Console.WriteLine("");

                Licensee newLicensee = new Licensee();
                Licensee addedLicensee = LicenseeService.create(context, product, newLicensee);
                Console.WriteLine("Added licensee:");
                Console.WriteLine(addedLicensee.ToString());
                Console.WriteLine("");

                licensees = LicenseeService.list(context);
                Console.WriteLine("Got the following licensees after add:");
                foreach (Licensee licensee in licensees)
                {
                    Console.WriteLine(licensee.ToString());
                }
                Console.WriteLine("");

                Licensee defaultLicensee = new Licensee();
                defaultLicensee.number = "I011";
                Licensee addedDLicensee = LicenseeService.create(context, product, defaultLicensee);
                Console.WriteLine("Added default licensee:");
                Console.WriteLine(addedDLicensee.ToString());
                Console.WriteLine("");
                #endregion

                #region ****************** License
                License defaultLicense = new License();
                defaultLicense.number = "L011";
                License addedDLicense = LicenseService.create(context, "I011", licenseTemplate, null, defaultLicense);
                Console.WriteLine("Added default license:");
                Console.WriteLine(addedDLicense.ToString());
                Console.WriteLine("");

                License gotLicense = LicenseService.get(context, "L011");
                Console.WriteLine("Got default license: ");
                Console.WriteLine(gotLicense.ToString());
                Console.WriteLine("");

                License updateLicense = new License();
                updateLicense.licenseProperties.Add("Updated property name", "Updated value"); 
                License upLicense = LicenseService.update(context, "L011", null, updateLicense);
                Console.WriteLine("Updated default license: ");
                Console.WriteLine(upLicense.ToString());
                Console.WriteLine("");

                List<License> licenses = LicenseService.list(context);
                Console.WriteLine("Got the following licenses:");
                foreach (License license in licenses)
                {
                    Console.WriteLine(license.ToString());
                }
                Console.WriteLine("");

                License newLicense = new License();
                License addedLicense = LicenseService.create(context, addedLicensee.number, licenseTemplate, null, newLicense);
                Console.WriteLine("Added license:");
                Console.WriteLine(addedLicense.ToString());
                Console.WriteLine("");

                licenses = LicenseService.list(context);
                Console.WriteLine("Got the following licenses after add:");
                foreach (License license in licenses)
                {
                    Console.WriteLine(license.ToString());
                }
                Console.WriteLine("");

                LicenseService.delete(context, "L011");
                Console.WriteLine("Deleted default licensee!");
                Console.WriteLine("");

                #endregion

                #region ****************** Validate
                ValidationResult validationResult = LicenseeService.validate(context, addedLicensee.number);
                Console.WriteLine("Validation result for created licensee:");
                Console.WriteLine(validationResult.ToString());
                #endregion

            }
            catch (LmBoxException e)
            {
                Console.WriteLine("Got lmBox exception:");
                Console.WriteLine(e);
            }
            catch (Exception e)
            {
                Console.WriteLine("Got exception:");
                Console.WriteLine(e);
            }

            Console.WriteLine("Press <Enter> to exit..."); 
            Console.ReadLine();
        }
    }
}
