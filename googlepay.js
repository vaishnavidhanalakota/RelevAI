// Google Pay API integration
function initGooglePay() {
  if (!window.google || !window.google.payments) {
    console.error('Google Pay API not available');
    return;
  }

  const googlePayButton = new google.payments.api.PaymentsClient();
  
  const paymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA']
        }
      }
    ],
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: '100.00',
      currencyCode: 'INR'
    },
    merchantInfo: {
      merchantName: 'Your Store Name'
    }
  };

  googlePayButton.loadPaymentData(paymentDataRequest)
    .then(paymentData => {
      // Process payment data
      processPayment(paymentData);
    })
    .catch(error => {
      console.error('Google Pay error:', error);
    });
}