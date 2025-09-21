import React, { useState } from "react";

const App = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentAppModal, setShowPaymentAppModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [activePaymentApp, setActivePaymentApp] = useState("");

  const handleProPlanClick = () => {
    setShowPaymentModal(true);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setShowPaymentAppModal(false);
    setShowSuccessModal(false);
    setSelectedPaymentMethod(null);
    setActivePaymentApp("");
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayNow = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setShowPaymentModal(false);

    if (selectedPaymentMethod === "credit-card") {
      showSuccessModal();
    } else {
      setActivePaymentApp(selectedPaymentMethod);
      setShowPaymentAppModal(true);
    }
  };

  const completePayment = () => {
    setShowPaymentAppModal(false);
    showSuccessModal();
  };

  const showSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    alert("Redirecting to dashboard...");
  };

  return (
    <div className="bg-gray-50 font-sans antialiased min-h-screen">
      {/* Payment Options Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
            <p className="mb-6">You're purchasing the Pro plan for $9/month</p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {[
                {
                  method: "credit-card",
                  name: "Credit Card",
                  icon: "https://cdn-icons-png.flaticon.com/512/196/196578.png",
                },
                {
                  method: "google-pay",
                  name: "Google Pay",
                  icon: "https://cdn-icons-png.flaticon.com/512/3046/3046778.png",
                },
                {
                  method: "phonepe",
                  name: "PhonePe",
                  icon: "https://cdn-icons-png.flaticon.com/512/3046/3046780.png",
                },
                {
                  method: "paytm",
                  name: "Paytm",
                  icon: "https://cdn-icons-png.flaticon.com/512/3046/3046779.png",
                },
              ].map((option) => (
                <div
                  key={option.method}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 text-center w-28 ${
                    selectedPaymentMethod === option.method
                      ? "ring-2 ring-indigo-500 bg-indigo-50"
                      : "hover:bg-gray-50 hover:transform hover:translate-y-[-2px] hover:shadow-md"
                  }`}
                  onClick={() => handlePaymentMethodSelect(option.method)}
                >
                  <img
                    src={option.icon}
                    alt={option.name}
                    className="w-12 h-8 mx-auto mb-2"
                  />
                  <p className="text-sm">{option.name}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handlePayNow}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Payment App Modal */}
      {showPaymentAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-8 w-full max-w-sm mx-4 text-center animate-slideIn">
            <h3 className="text-2xl font-bold mb-4">
              {activePaymentApp === "google-pay"
                ? "Google Pay"
                : activePaymentApp === "phonepe"
                ? "PhonePe"
                : "Paytm"}
            </h3>
            <p className="mb-4">Scan the QR code to pay</p>
            <div className="text-3xl font-bold mb-6">$9.00</div>
            <div className="bg-white p-4 rounded-lg mb-6 mx-auto w-48 h-48">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupi@upi&pn=RelevAI&am=9.00&cu=USD&tn=Pro%20Plan%20Payment`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mb-6">
              Open {activePaymentApp === "google-pay"
                ? "Google Pay"
                : activePaymentApp === "phonepe"
                ? "PhonePe"
                : "Paytm"} app to complete payment
            </p>
            <button
              onClick={completePayment}
              className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Complete Payment
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-8 w-full max-w-sm mx-4 text-center animate-slideIn">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="text-3xl font-bold mb-4">Payment Successful!</h3>
            <p className="mb-2">Thank you for purchasing the Pro plan.</p>
            <p className="mb-6">You now have access to all premium features.</p>
            <button
              onClick={closeSuccessModal}
              className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs — whether you're a student,
              recruiter, or enterprise team.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500 text-lg ml-1">/month</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Perfect for students and job seekers
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>5 resume analyses per month</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Basic job matching</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>AI-powered feedback</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                Choose Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-md p-8 border-2 border-indigo-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900">$9</span>
                  <span className="text-gray-500 text-lg ml-1">/month</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Ideal for active job seekers
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Unlimited resume analyses</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Advanced job matching</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Priority AI feedback</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Dedicated account manager</span>
                </li>
              </ul>

              <button
                onClick={handleProPlanClick}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Choose Plan
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-gray-500 text-sm">
                  For universities and recruiting teams
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Unlimited analyses for teams</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Custom job matching engine</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>White-label dashboard</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Dedicated account manager</span>
                </li>
              </ul>

              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                Contact Sales
              </button>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Payment Options
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Credit Cards */}
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">Visa</span>
              </div>
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-red-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">Mastercard</span>
              </div>
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">American Express</span>
              </div>
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-orange-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">Discover</span>
              </div>
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">PayPal</span>
              </div>

              {/* UPI Payment Options */}
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.192 15.57C3.53 15.57 0 12.04 0 7.685 0 3.33 3.53 0 8.192 0c4.662 0 8.192 3.33 8.192 7.685 0 4.355-3.53 7.885-8.192 7.885zM8.192 1.31c-3.94 0-6.88 2.73-6.88 6.375 0 3.645 2.94 6.575 6.88 6.575 3.94 0 6.88-2.93 6.88-6.575 0-3.645-2.94-6.375-6.88-6.375z" />
                    <path d="M11.27 7.07c.39.39.39 1.02 0 1.41l-3.53 3.54c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l2.82-2.83-2.82-2.83c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l3.53 3.54z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">Google Pay</span>
              </div>
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-orange-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    <path d="M8 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">Paytm</span>
              </div>
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-green-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    <path d="M8 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">PhonePe</span>
              </div>

              {/* Other Options */}
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-gray-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">Bank Transfer</span>
              </div>
              <div className="flex flex-col items-center group">
                <i className="text-3xl text-green-500 mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    <path d="M8 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                  </svg>
                </i>
                <span className="text-gray-700 text-sm">Cash</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;