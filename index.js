function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'white',
          layout: 'horizontal',
          label: 'buynow',
          
        },

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"amount":{"currency_code":"MXN","value":50}}]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            
            console.log(orderData);
            var paypal_order_id = orderData.id;
            var paypal_payer_id = orderData.payer.payer_id;
            var paypal_payer_email = orderData.payer.email_address;
            var paypal_country_code = orderData.payer.address.country_code;
            var paypal_amount = parseFloat(orderData.purchase_units[0].amount.value);
            var paypal_currency = orderData.purchase_units[0].amount.currency_code;
            
          });
        },

        onError: function(err) {
          console.log(err);
        }
      }).render('#paypal-button-container');
    }

    initPayPalButton();
