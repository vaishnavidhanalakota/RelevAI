// Example of Paytm API integration
function initPaytmPayment(orderId, amount, callbackUrl) {
  // Create form dynamically
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://secure.paytm.in/thejas/merchant/transaction/checkout.jsp';
  
  // Add required fields
  form.appendChild(createHiddenField('ORDER_ID', orderId));
  form.appendChild(createHiddenField('CUST_ID', currentUser.id));
  form.appendChild(createHiddenField('TXN_AMOUNT', amount));
  form.appendChild(createHiddenField('CALLBACK_URL', callbackUrl));
  
  // Add checksum (generated server-side)
  form.appendChild(createHiddenField('CHECKSUMHASH', generateChecksum()));
  
  document.body.appendChild(form);
  form.submit();
}

function createHiddenField(name, value) {
  const field = document.createElement('input');
  field.type = 'hidden';
  field.name = name;
  field.value = value;
  return field;
}