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
                context.baseUrl = "http://localhost:28080/core/rest";
                context.username = "demo";
                context.password = "demo";

                String product = "P014";
                String licenseTemplate = "E011";

                #region ****************** Licensee
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
                #endregion

                #region ****************** License
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
                #endregion

                #region ****************** Validate
                ValidationResult validationResult = LicenseeService.validate(context, addedLicensee.number);
                Console.WriteLine("Validation result for created licensee:");
                Console.WriteLine(validationResult.ToString());
                #endregion

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
