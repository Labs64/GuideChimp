using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lmBoxClient.Entities
{
    internal class Constants
    {
        internal const String REST_API_PATH = "/core/rest";
        internal const String SHOP_PATH = "/app/content/shop.xhtml";
        internal const String ACTIVE = "active";
        internal const String NUMBER = "number";
        internal const String NAME = "name";

        internal class Product
        {
            internal const String PRODUCT_NUMBER = "productNumber";
        }

        internal class ProductModule
        {
            internal const String PRODUCT_MODULE_TYPE = "ProductModule";
            internal const String PRODUCT_MODULE_NUMBER = "productModuleNumber";
        }

        internal class LicenseTemplate
        {
            internal const String LICENSE_TEMPLATE_NUMBER = "licenseTemplateNumber";
        }

        internal class Licensee
        {
            internal const String LICENSEE_TYPE = "Licensee";
            internal const String LICENSEE_NUMBER = "licenseeNumber";
        }

        internal class License
        {
            internal const String endPoint = "/license";
            internal const String LICENSE_TYPE = "License";
        }

        internal class Transaction
        {
            internal const String TRANSACTION_NUMBER = "transactionNumber";
        }

        internal class ValidationResult
        {
            internal const String VALIDATION_RESULT_TYPE = "ProductModuleValidation";
        }
    }
}
