using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LmBoxClient.Entities
{
    public class Constants
    {
        internal const String REST_API_PATH = "/core/rest";
        internal const String SHOP_PATH = "/app/content/shop.xhtml";
        internal const String ACTIVE = "active";
        internal const String NUMBER = "number";
        internal const String NAME = "name";
        internal const String CASCADE = "forceCascade";
        internal const String PRICE = "price";
        internal const String CURRENCY = "currency";

        public class Vendor
        {
            internal const String TYPE_NAME = "Vendor";
            internal const String VENDOR_NUMBER = "vendorNumber";
        }

        public class Product
        {
            internal const String ENDPOINT_PATH = "product";
            internal const String TYPE_NAME = "Product";
            internal const String PRODUCT_NUMBER = "productNumber";
        }

        public class ProductModule
        {
            internal const String ENDPOINT_PATH = "productmodule";
            internal const String TYPE_NAME = "ProductModule";
            internal const String PRODUCT_MODULE_LICENSING_MODEL = "licensingModel";
            internal const String PRODUCT_MODULE_NUMBER = "productModuleNumber";
        }

        public class LicenseTemplate
        {
            internal const String ENDPOINT_PATH = "licensetemplate";            
            internal const String TYPE_NAME = "LicenseTemplate";
            internal const String LICENSE_TEMPLATE_NUMBER = "licenseTemplateNumber";
            internal const String LICENSE_TYPE = "licenseType";
            internal const String AUTOMATIC = "automatic";
            internal const String HIDDEN = "hidden";
            internal const String HIDE_LICENSES = "hideLicenses";
        }

        public class Licensee
        {
            internal const String ENDPOINT_PATH = "licensee";
            internal const String TYPE_NAME = "Licensee";
            internal const String LICENSEE_NUMBER = "licenseeNumber";
        }

        public class License
        {
            internal const String ENDPOINT_PATH = "license";
            internal const String TYPE_NAME = "License";
            public const String PROP_PARENT_FEATURE = "parentFeature";
            public const String PROP_TIME_VOLUME = "timeVolume";
            public const String PROP_START_DATE = "startDate";
        }

        public class Transaction
        {
            internal const String TRANSACTION_NUMBER = "transactionNumber";
        }

        public class Token
        {
            internal const String ENDPOINT_PATH = "token";
            internal const String TYPE_NAME = "Token";
            internal const String LICENSEE_NUMBER = "tokenNumber";
        }

        public class ValidationResult
        {
            internal const String VALIDATION_RESULT_TYPE = "ProductModuleValidation";
        }
    }
}
