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
                Context ctx = new Context();
                ctx.baseUrl = "http://127.0.0.1:28080/core/rest";
                ctx.username = "demo";
                ctx.password = "demo";

                List<Licensee> licensees = LicenseeService.list(ctx);
                Console.WriteLine("Got the following licensees:");
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
            }

            Console.WriteLine("Press <Enter> to exit..."); 
            Console.ReadLine();
        }
    }
}
