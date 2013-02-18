using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LmBoxClient.RestController;
using LmBoxClient.Entities;

namespace LmBoxClient
{
    public class PaymentMethodService
    {

        /// <summary>
        /// Creates new token for the given token type and token parameters.. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/PaymentMethodService.html
        /// </summary>
        public static PaymentMethod update(Context context, PaymentMethod newPaymentMethod)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.POST, Constants.PaymentMethod.ENDPOINT_PATH, newPaymentMethod.ToDictionary());
            return new PaymentMethod(output.items[0]);
        }

        /// <summary>
        /// Gets token by its number. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/PaymentMethodService.html
        /// </summary>
        public static PaymentMethod get(Context context, String number)
        {
            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.PaymentMethod.ENDPOINT_PATH + "/" + number, null);
            return new PaymentMethod(output.items[0]);
        }

        /// <summary>
        /// Returns all payment methods. See LmBoxAPI JavaDoc for details:
        /// http://lmbox.labs64.com/javadoc/index.html?com/labs64/lmbox/core/service/PaymentMethodService.html
        /// </summary>
        public static List<PaymentMethod> list(Context context)
        {

            lmbox output = LmBoxAPI.request(context, LmBoxAPI.Method.GET, Constants.PaymentMethod.ENDPOINT_PATH, null);

            List<PaymentMethod> paymentMethods = new List<PaymentMethod>();
            foreach (item i in output.items)
            {
                paymentMethods.Add(new PaymentMethod(i));
            }
            return paymentMethods;
        }
    }
}
