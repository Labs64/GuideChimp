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
                //context.baseUrl = "http://10.0.2.2:28080";
                context.username = "demo";
                context.password = "demo";

 //               String vendor = "VDEMO";
                String product = "P014";
                String licensee = "I011";
                String productModule = "M001";
                String licenseTemplate = "E001";

                #region ****************** Product

               ProductService.delete(context, product, true);

                Product defaultProduct = new Product();
                defaultProduct.number = product;
                defaultProduct.name = "Default product";
                Product addedDProduct = ProductService.create(context, defaultProduct);
                Console.WriteLine("Added default product:");
                Console.WriteLine(addedDProduct.ToString());
                Console.WriteLine("");

                Product gotProduct = ProductService.get(context, product);
                Console.WriteLine("Got default product: ");
                Console.WriteLine(gotProduct.ToString());
                Console.WriteLine("");

                Product updateProduct = new Product();
                updateProduct.productProperties.Add("Updated property name", "Updated value");
                Product upProduct = ProductService.update(context, product, updateProduct);
                Console.WriteLine("Updated default product: ");
                Console.WriteLine(upProduct.ToString());
                Console.WriteLine("");

                ProductService.delete(context, product, true);
                Console.WriteLine("Deleted default Product!");
                Console.WriteLine("");
               
                List<Product> products = ProductService.list(context);
                Console.WriteLine("Got the following Products:");
                foreach (Product prod in products)
                {
                    Console.WriteLine(prod.ToString());
                }
                Console.WriteLine("");
                #endregion

                #region ****************** Licensee
                LicenseeService.delete(context, licensee, true);

                Licensee defaultLicensee = new Licensee();
                defaultLicensee.number = licensee;
                Licensee addedDLicensee = LicenseeService.create(context, "P015", defaultLicensee);
                Console.WriteLine("Added default licensee:");
                Console.WriteLine(addedDLicensee.ToString());
                Console.WriteLine("");

                Licensee gotLicensee = LicenseeService.get(context, licensee);
                Console.WriteLine("Got default licensee: ");
                Console.WriteLine(gotLicensee.ToString());
                Console.WriteLine("");

                Licensee updateLicensee = new Licensee();
                updateLicensee.licenseeProperties.Add("Updated property name", "Updated value"); 
                Licensee upLicensee = LicenseeService.update(context, licensee, updateLicensee);
                Console.WriteLine("Updated default licensee: ");
                Console.WriteLine(upLicensee.ToString());
                Console.WriteLine("");

                LicenseeService.delete(context, licensee, true);
                Console.WriteLine("Deleted default licensee!");
                Console.WriteLine("");

                List<Licensee> licensees = LicenseeService.list(context);
                Console.WriteLine("Got the following licensees:");
                foreach (Licensee licenz in licensees)
                {
                    Console.WriteLine(licenz.ToString());
                }
                Console.WriteLine("");

                Licensee addedLicensee = new Licensee();
                addedLicensee.number = licensee;
                Licensee addedNewLicensee = LicenseeService.create(context, "P015", addedLicensee);
                Console.WriteLine("Added new licensee:");
                Console.WriteLine(addedNewLicensee.ToString());
                Console.WriteLine("");
                
                licensees = LicenseeService.list(context);
                Console.WriteLine("Got the following licensees after add:");
                foreach (Licensee licenz in licensees)
                {
                    Console.WriteLine(licenz.ToString());
                }
                Console.WriteLine("");

                #endregion

                #region ****************** License
                License defaultLicense = new License();
                defaultLicense.number = "L011";
                License addedDLicense = LicenseService.create(context, licensee, licenseTemplate, null, defaultLicense);
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

                licenses = LicenseService.list(context);
                Console.WriteLine("Got the following licenses after add:");
                foreach (License license in licenses)
                {
                    Console.WriteLine(license.ToString());
                }
                Console.WriteLine("");

                LicenseService.delete(context, "L011");
                Console.WriteLine("Deleted default license!");
                Console.WriteLine("");
                #endregion

                #region ****************** ProductModule
                List<ProductModule> productModules = ProductModuleService.list(context, null);
                Console.WriteLine("Got the following ProductModules:");
                foreach (ProductModule prodMod in productModules)
                {
                    Console.WriteLine(prodMod.ToString());
                }
                Console.WriteLine("");

                ProductModule gotProductModule = ProductModuleService.get(context, productModule);
                Console.WriteLine("Got default product module: ");
                Console.WriteLine(gotProductModule.ToString());
                Console.WriteLine("");

     /**           ProductModuleService.delete(context, productModule, true);
                Console.WriteLine("Deleted default ProductModule!");
                Console.WriteLine("");
                */
                ProductService.create(context, defaultProduct);
 /**               
                ProductModule defaultProductModule = new ProductModule();
                defaultProductModule.number = productModule;
                defaultProductModule.name = "Default product module";
                ProductModule addedDProductModule = ProductModuleService.create(context, product, defaultProductModule);
                Console.WriteLine("Added default product module:");
                Console.WriteLine(addedDProductModule.ToString());
                Console.WriteLine("");
                
                ProductModule updateProductModule = new ProductModule();
                updateProductModule.productModuleProperties.Add("Updated property name", "Updated property value");
                ProductModule upProductModule = ProductModuleService.update(context, productModule, updateProductModule);
                Console.WriteLine("Updated default product module: ");
                Console.WriteLine(upProductModule.ToString())
  * ;
                Console.WriteLine("");*/
                #endregion

                #region LicenseTemplate
                LicenseTemplate defaultLicenseTemplate = new LicenseTemplate();
                defaultLicenseTemplate.number = "E011";
                LicenseTemplate addedDLicenseTemplate = LicenseTemplateService.create(context, productModule, defaultLicenseTemplate);
                Console.WriteLine("Added default license template:");
                Console.WriteLine(addedDLicenseTemplate.ToString());
                Console.WriteLine("");

                LicenseTemplate gotLicenseTemplate = LicenseTemplateService.get(context, licenseTemplate);
                Console.WriteLine("Got default license: ");
                Console.WriteLine(gotLicense.ToString());
                Console.WriteLine("");

                List<LicenseTemplate> licenseTemplates = LicenseTemplateService.list(context, null);
                Console.WriteLine("Got the following license templates:");
                foreach (LicenseTemplate lTemplate in licenseTemplates)
                {
                    Console.WriteLine(lTemplate.ToString());
                }
                Console.WriteLine("");               

                #endregion

                #region ****************** Validate
                ValidationResult validationResult = LicenseeService.validate(context, licensee);
                Console.WriteLine("Validation result for created licensee:");
                Console.WriteLine(validationResult.ToString());
                #endregion

                LicenseeService.delete(context, licensee, true);

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
