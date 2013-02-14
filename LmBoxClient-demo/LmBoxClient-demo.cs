using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LmBoxClient;
using LmBoxClient.Entities;
using System.Net;

namespace LmBoxClient
{
    class LmBoxClient_demo
    {
        static void Main(string[] args)
        {
            ServicePointManager.ServerCertificateValidationCallback = delegate { return true; }; // Trust the self-signed certificate at lmbox.labs64.com.
            Context context = new Context();
            context.baseUrl = "https://lmbox.labs64.com";
            context.username = "demo";
            context.password = "demo";

            String demoProductNumber = "P001demo";
            String demoProductModuleNumber = "M001demo";
            String demoLicensingModel = "TimeEvaluation";

            String demoLicenseTemplate1_Number = "E001demo";
            String demoLicenseTemplate1_Name = "Demo Evaluation Period";
            String demoLicenseTemplate1_Type = "TIMEVOLUME";
            Decimal demoLicenseTemplate1_Price = 12.50M;
            String demoLicenseTemplate1_Currency = "EUR";
            String demoLicenseTemplate1_TimeVolume = "5"; // days
            Boolean demoLicenseTemplate1_Automatic = true;

            String demoLicenseeNumber = "I001demo";

            try
            {
                #region ****************** Product

                Product newProduct = new Product();
                newProduct.number = demoProductNumber;
                newProduct.name = "Demo product";
                Product product = ProductService.create(context, newProduct);
                ConsoleWriter.WriteEntity("Added product:", product);

                product = ProductService.get(context, demoProductNumber);
                ConsoleWriter.WriteEntity("Got product:", product);

                List<Product> products = ProductService.list(context, null);
                ConsoleWriter.WriteList("Got the following products:", products);

                Product updateProduct = new Product();
                updateProduct.productProperties.Add("Updated property name", "Updated value");
                product = ProductService.update(context, demoProductNumber, updateProduct);
                ConsoleWriter.WriteEntity("Updated product:", product);

                ProductService.delete(context, demoProductNumber, true);
                ConsoleWriter.WriteMsg("Deleted Product!");

                products = ProductService.list(context, null);
                ConsoleWriter.WriteList("Got the following Products:", products);

                product = ProductService.create(context, newProduct);
                ConsoleWriter.WriteEntity("Added product again:", product);

                products = ProductService.list(context, null);
                ConsoleWriter.WriteList("Got the following Products:", products);

                #endregion

                #region ****************** ProductModule

                ProductModule newProductModule = new ProductModule();
                newProductModule.number = demoProductModuleNumber;
                newProductModule.name = "Demo product module";
                newProductModule.licensingModel = demoLicensingModel;
                ProductModule productModule = ProductModuleService.create(context, demoProductNumber, newProductModule);
                ConsoleWriter.WriteEntity("Added product module:", productModule);

                productModule = ProductModuleService.get(context, demoProductModuleNumber);
                ConsoleWriter.WriteEntity("Got product module:", productModule);

                List<ProductModule> productModules = ProductModuleService.list(context, null);
                ConsoleWriter.WriteList("Got the following ProductModules:", productModules);

                ProductModule updateProductModule = new ProductModule();
                updateProductModule.productModuleProperties.Add("Updated property name", "Updated property value");
                productModule = ProductModuleService.update(context, demoProductModuleNumber, updateProductModule);
                ConsoleWriter.WriteEntity("Updated product module:", productModule);

                ProductModuleService.delete(context, demoProductModuleNumber, true);
                ConsoleWriter.WriteMsg("Deleted ProductModule!");

                productModules = ProductModuleService.list(context, null);
                ConsoleWriter.WriteList("Got the following ProductModules:", productModules);

                productModule = ProductModuleService.create(context, demoProductNumber, newProductModule);
                ConsoleWriter.WriteEntity("Added product module again:", productModule);

                productModules = ProductModuleService.list(context, null);
                ConsoleWriter.WriteList("Got the following ProductModules:", productModules);

                #endregion

                #region ****************** LicenseTemplate
                LicenseTemplate newLicenseTemplate = new LicenseTemplate();
                newLicenseTemplate.number = demoLicenseTemplate1_Number;
                newLicenseTemplate.name = demoLicenseTemplate1_Name;
                newLicenseTemplate.licenseType = demoLicenseTemplate1_Type;
                newLicenseTemplate.price = demoLicenseTemplate1_Price;
                newLicenseTemplate.currency = demoLicenseTemplate1_Currency;
                newLicenseTemplate.licenseTemplateProperties[Constants.License.PROP_TIME_VOLUME] = demoLicenseTemplate1_TimeVolume;
                newLicenseTemplate.automatic = demoLicenseTemplate1_Automatic;
                ConsoleWriter.WriteEntity("Adding license template:", newLicenseTemplate);
                LicenseTemplate licenseTemplate = LicenseTemplateService.create(context, demoProductModuleNumber, newLicenseTemplate);
                ConsoleWriter.WriteEntity("Added license template:", licenseTemplate);

                licenseTemplate = LicenseTemplateService.get(context, demoLicenseTemplate1_Number);
                ConsoleWriter.WriteEntity("Got licenseTemplate:", licenseTemplate);

                List<LicenseTemplate> licenseTemplates = LicenseTemplateService.list(context, null);
                ConsoleWriter.WriteList("Got the following license templates:", licenseTemplates);

                LicenseTemplate updateLicenseTemplate = new LicenseTemplate();
                updateLicenseTemplate.active = true;
                updateLicenseTemplate.automatic = true; // workaround: at the moment not specified booleans treated as "false"
                licenseTemplate = LicenseTemplateService.update(context, demoLicenseTemplate1_Number, updateLicenseTemplate);
                ConsoleWriter.WriteEntity("Updated license template:", licenseTemplate);

                // TODO: delete

                #endregion

                /*
                #region ****************** Licensee

                Licensee newLicensee = new Licensee();
                newLicensee.number = demoLicenseeNumber;
                Licensee licensee = LicenseeService.create(context, demoProductNumber, newLicensee);
                ConsoleWriter.WriteEntity("Added licensee:", licensee);

                List<Licensee> licensees = LicenseeService.list(context);
                ConsoleWriter.WriteList("Got the following licensees:", licensees);

                LicenseeService.delete(context, demoLicenseeNumber, true);
                ConsoleWriter.WriteMsg("Deleted licensee!");

                licensees = LicenseeService.list(context);
                ConsoleWriter.WriteList("Got the following licensees:", licensees);

                licensee = LicenseeService.create(context, demoProductNumber, newLicensee);
                ConsoleWriter.WriteEntity("Added licensee again:", licensee);

                licensee = LicenseeService.get(context, demoLicenseeNumber);
                ConsoleWriter.WriteEntity("Got licensee:", licensee);

                Licensee updateLicensee = new Licensee();
                updateLicensee.licenseeProperties.Add("Updated property name", "Updated value");
                licensee = LicenseeService.update(context, demoLicenseeNumber, updateLicensee);
                ConsoleWriter.WriteEntity("Updated licensee:", licensee);

                licensees = LicenseeService.list(context);
                ConsoleWriter.WriteList("Got the following licensees:", licensees);

                #endregion

                #region ****************** License
                License defaultLicense = new License();
                defaultLicense.number = "L011";
                License addedDLicense = LicenseService.create(context, demoLicenseeNumber, demoLicenseTemplate1_Number, null, defaultLicense);
                ConsoleWriter.WriteEntity("Added default license:", addedDLicense);

                License gotLicense = LicenseService.get(context, "L011");
                ConsoleWriter.WriteEntity("Got default license:", gotLicense);

                License updateLicense = new License();
                updateLicense.licenseProperties.Add("Updated property name", "Updated value");
                License upLicense = LicenseService.update(context, "L011", null, updateLicense);
                ConsoleWriter.WriteEntity("Updated default license:", upLicense);

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

                #region ****************** Validate
                ValidationResult validationResult = LicenseeService.validate(context, demoLicenseeNumber);
                ConsoleWriter.WriteEntity("Validation result for created licensee:", validationResult);
                #endregion
                */

            }
            catch (LmBoxException e)
            {
                Console.WriteLine("Got LmBox exception:");
                Console.WriteLine(e);
            }
            catch (Exception e)
            {
                Console.WriteLine("Got exception:");
                Console.WriteLine(e);
            }
            finally
            {
                try
                {
                    // Cleanup - delete test product with all its related items
                    ProductService.delete(context, demoProductNumber, true);
                }
                catch (LmBoxException e)
                {
                    Console.WriteLine("Got LmBox exception during cleanup:");
                    Console.WriteLine(e);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Got exception during cleanup:");
                    Console.WriteLine(e);
                }
            }

            Console.WriteLine("Press <Enter> to exit..."); 
            Console.ReadLine();
        }
    }
}
