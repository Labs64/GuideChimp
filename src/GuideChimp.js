// Constants
import Constants from './Constants';

// VO
import Context from './vo/Context';
import Page from './vo/Page';
import ValidationParameters from './vo/ValidationParameters';
import ValidationResults from './vo/ValidationResults';

// Services
import Service from './services/Service';
import LicenseeService from './services/LicenseeService';
import LicenseService from './services/LicenseService';
import LicenseTemplateService from './services/LicenseTemplateService';
import PaymentMethodService from './services/PaymentMethodService';
import ProductModuleService from './services/ProductModuleService';
import ProductService from './services/ProductService';
import TokenService from './services/TokenService';
import TransactionService from './services/TransactionService';
import UtilityService from './services/UtilityService';

// Entities
import BaseEntity from './entities/BaseEntity';
import Country from './entities/Country';
import License from './entities/License';
import Licensee from './entities/Licensee';
import LicenseTemplate from './entities/LicenseTemplate';
import PaymentMethod from './entities/PaymentMethod';
import Product from './entities/Product';
import ProductDiscount from './entities/ProductDiscount';
import ProductModule from './entities/ProductModule';
import Token from './entities/Token';
import Transaction from './entities/Transaction';
import LicenseTransactionJoin from './entities/LicenseTransactionJoin';

// Converters
import itemToCountry from './converters/itemToCountry';
import itemToLicense from './converters/itemToLicense';
import itemToLicensee from './converters/itemToLicensee';
import itemToLicenseTemplate from './converters/itemToLicenseTemplate';
import itemToObject from './converters/itemToObject';
import itemToPaymentMethod from './converters/itemToPaymentMethod';
import itemToProduct from './converters/itemToProduct';
import itemToProductModule from './converters/itemToProductModule';
import itemToToken from './converters/itemToToken';
import itemToTransaction from './converters/itemToTransaction';

// Utils
import CastsUtils from './util/CastsUtils';
import CheckUtils from './util/CheckUtils';
import FilterUtils from './util/FilterUtils';

// Errors
import NlicError from './errors/NlicError';

// Create the default instance to be exported
const NetLicensing = {
    // Constants
    Constants,

    // Expose VO
    Context,
    Page,
    ValidationParameters,
    ValidationResults,

    // Expose Services
    Service,
    LicenseeService,
    LicenseService,
    LicenseTemplateService,
    PaymentMethodService,
    ProductModuleService,
    ProductService,
    TokenService,
    TransactionService,
    UtilityService,

    // Expose Entities
    BaseEntity,
    Country,
    License,
    Licensee,
    LicenseTemplate,
    PaymentMethod,
    Product,
    ProductDiscount,
    ProductModule,
    Token,
    Transaction,
    LicenseTransactionJoin,

    // Expose Converters
    itemToCountry,
    itemToLicense,
    itemToLicensee,
    itemToLicenseTemplate,
    itemToObject,
    itemToPaymentMethod,
    itemToProduct,
    itemToProductModule,
    itemToToken,
    itemToTransaction,

    // Expose Utils
    CastsUtils,
    CheckUtils,
    FilterUtils,

    // Errors
    NlicError,
};

module.exports = NetLicensing;

// Allow use of default import syntax in TypeScript
module.exports.default = NetLicensing;
