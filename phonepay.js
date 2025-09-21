// Example of PhonePe API integration
async function initPhonePePayment(amount, merchantId) {
  try {
    const response = await fetch('/api/phonepe/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount,
        merchantId: merchantId,
        userId: currentUser.id
      })
    });
    
    const data = await response.json();
    // Redirect to PhonePe payment page
    window.location.href = data.redirectUrl;
  } catch (error) {
    console.error('PhonePe payment failed:', error);
  }
}