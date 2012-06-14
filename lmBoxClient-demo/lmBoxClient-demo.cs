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
                context.baseUrl = "http://lmbox.labs64.com/core/rest";
                context.username = "demo";
                context.password = "demo";

                String product = "P004";

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

                licensees = LicenseeService.list(context);
                Console.WriteLine("Got the following licensees after add:");
                foreach (Licensee licensee in licensees)
                {
                    Console.WriteLine(licensee.ToString());
                }
                Console.WriteLine("");
            }
            catch (Exception e)
            {
                Console.WriteLine("Got exception:");
                Console.WriteLine(e.Message);
                Console.WriteLine(e.InnerException);
            }

            Console.WriteLine("Press <Enter> to exit..."); 
            Console.ReadLine();
        }
    }
}
