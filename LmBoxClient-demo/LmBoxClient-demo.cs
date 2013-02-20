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
            String demoLicenseTemplate1_Type = "FEATURE";
            Decimal demoLicenseTemplate1_Price = 12.50M;
            String demoLicenseTemplate1_Currency = "EUR";
            //String demoLicenseTemplate1_TimeVolume = "5"; // days
            Boolean demoLicenseTemplate1_Automatic = false;
            Boolean demoLicenseTemplate1_Hidden = false;


            String demoLicenseeNumber = "I001demo";

            String demoLicenseNumber = "L001demoTV";

            String demoTokenType = "SHOP";


            try
            {

                List<String> licenseTypes = UtilityService.listLicenseTypes(context);
                ConsoleWriter.WriteList("Licensing Models:", licenseTypes);

                List<String> licensingModels = UtilityService.listLicensingModels(context);
                ConsoleWriter.WriteList("Licensing Types:", licensingModels);


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
                //newLicenseTemplate.licenseTemplateProperties[Constants.License.PROP_TIME_VOLUME] = demoLicenseTemplate1_TimeVolume;
                newLicenseTemplate.automatic = demoLicenseTemplate1_Automatic;
                newLicenseTemplate.hidden = demoLicenseTemplate1_Hidden;
                ConsoleWriter.WriteEntity("Adding license template:", newLicenseTemplate);
                LicenseTemplate licenseTemplate = LicenseTemplateService.create(context, demoProductModuleNumber, newLicenseTemplate);
                ConsoleWriter.WriteEntity("Added license template:", licenseTemplate);

                licenseTemplate = LicenseTemplateService.get(context, demoLicenseTemplate1_Number);
                ConsoleWriter.WriteEntity("Got licenseTemplate:", licenseTemplate);

                List<LicenseTemplate> licenseTemplates = LicenseTemplateService.list(context, null);
                ConsoleWriter.WriteList("Got the following license templates:", licenseTemplates);

                LicenseTemplate updateLicenseTemplate = new LicenseTemplate();
                updateLicenseTemplate.active = true;
                updateLicenseTemplate.automatic = demoLicenseTemplate1_Automatic; // workaround: at the moment not specified booleans treated as "false"
                updateLicenseTemplate.hidden = demoLicenseTemplate1_Hidden; // workaround: at the moment not specified booleans treated as "false"
                licenseTemplate = LicenseTemplateService.update(context, demoLicenseTemplate1_Number, updateLicenseTemplate);
                ConsoleWriter.WriteEntity("Updated license template:", licenseTemplate);

                LicenseTemplateService.delete(context, demoLicenseTemplate1_Number, true);
                ConsoleWriter.WriteMsg("Deleted LicenseTemplate!");

                licenseTemplates = LicenseTemplateService.list(context, null);
                ConsoleWriter.WriteList("Got the following license templates:", licenseTemplates);

                licenseTemplate = LicenseTemplateService.create(context, demoProductModuleNumber, newLicenseTemplate);
                ConsoleWriter.WriteEntity("Added license template again:", licenseTemplate);

                licenseTemplates = LicenseTemplateService.list(context, null);
                ConsoleWriter.WriteList("Got the following license templates:", licenseTemplates);


                #endregion


                #region ****************** Licensee

                Licensee newLicensee = new Licensee();
                newLicensee.number = demoLicenseeNumber;
                Licensee licensee = LicenseeService.create(context, demoProductNumber, newLicensee);
                ConsoleWriter.WriteEntity("Added licensee:", licensee);

                List<Licensee> licensees = LicenseeService.list(context, null);
                ConsoleWriter.WriteList("Got the following licensees:", licensees);

                LicenseeService.delete(context, demoLicenseeNumber, true);
                ConsoleWriter.WriteMsg("Deleted licensee!");

                licensees = LicenseeService.list(context, null);
                ConsoleWriter.WriteList("Got the following licensees:", licensees);

                licensee = LicenseeService.create(context, demoProductNumber, newLicensee);
                ConsoleWriter.WriteEntity("Added licensee again:", licensee);

                licensee = LicenseeService.get(context, demoLicenseeNumber);
                ConsoleWriter.WriteEntity("Got licensee:", licensee);

                Licensee updateLicensee = new Licensee();
                updateLicensee.licenseeProperties.Add("Updated property name", "Updated value");
                licensee = LicenseeService.update(context, demoLicenseeNumber, updateLicensee);
                ConsoleWriter.WriteEntity("Updated licensee:", licensee);

                licensees = LicenseeService.list(context, null);
                ConsoleWriter.WriteList("Got the following licensees:", licensees);

                #endregion

                
                #region ****************** License
                License newLicense = new License();
                newLicense.number = demoLicenseNumber;
                License license = LicenseService.create(context, demoLicenseeNumber, demoLicenseTemplate1_Number, null, newLicense);
                ConsoleWriter.WriteEntity("Added license:", license);

                List<License> licenses = LicenseService.list(context, null);
                ConsoleWriter.WriteList("Got the following license templates:", licenses);

                LicenseService.delete(context, demoLicenseNumber);
                Console.WriteLine("Deleted license");

                licenses = LicenseService.list(context, null);
                ConsoleWriter.WriteList("Got the following license templates:", licenses);

                license = LicenseService.create(context, demoLicenseeNumber, demoLicenseTemplate1_Number, null, newLicense);
                ConsoleWriter.WriteEntity("Added license again:", license);

                license = LicenseService.get(context, demoLicenseNumber);
                ConsoleWriter.WriteEntity("Got license:", license);

                License updateLicense = new License();
                updateLicense.licenseProperties.Add("Updated property name", "Updated value");
                license = LicenseService.update(context, demoLicenseNumber, null, updateLicense);
                ConsoleWriter.WriteEntity("Updated license:", license);

                #endregion 

                #region ****************** PaymentMethod

                List<PaymentMethod> paymentMethods = PaymentMethodService.list(context);
                ConsoleWriter.WriteList("Got the following payment methods:", paymentMethods);

                #endregion

                #region ****************** Validate

                ValidationResult validationResult = LicenseeService.validate(context, demoLicenseeNumber, demoProductNumber);
                ConsoleWriter.WriteEntity("Validation result for created licensee:", validationResult);
                #endregion

                #region ****************** Token

                Token token = TokenService.generate(context, demoTokenType, demoLicenseeNumber);
                ConsoleWriter.WriteEntity("Got the following token:", token);

                #endregion

                
                

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
