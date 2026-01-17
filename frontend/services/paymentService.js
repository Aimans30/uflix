import api from './api';

// Create Razorpay order
export const createRazorpayOrder = async (amount, currency = 'INR', receipt) => {
  const response = await api.post('/payments/create-order', {
    amount,
    currency,
    receipt
  });
  return response.data;
};

// Verify payment
export const verifyPayment = async (paymentData) => {
  const response = await api.post('/payments/verify', paymentData);
  return response.data;
};

// Get payment details
export const getPaymentDetails = async (paymentId) => {
  const response = await api.get(`/payments/${paymentId}`);
  return response.data;
};

// Initialize Razorpay checkout
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Process payment with Razorpay
export const processRazorpayPayment = async (orderData, onSuccess, onFailure) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert('Razorpay SDK failed to load');
    return;
  }

  // Create Razorpay order
  const { data: razorpayOrder } = await createRazorpayOrder(
    orderData.totalPrice,
    'INR',
    `order_${Date.now()}`
  );

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: razorpayOrder.data.amount,
    currency: razorpayOrder.data.currency,
    name: 'UFLIX',
    description: 'Furniture Purchase',
    order_id: razorpayOrder.data.id,
    handler: async function (response) {
      try {
        // Verify payment
        const verifyData = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: orderData.orderId
        });

        if (verifyData.success) {
          onSuccess(verifyData.data);
        } else {
          onFailure('Payment verification failed');
        }
      } catch (error) {
        onFailure(error.message);
      }
    },
    prefill: {
      name: orderData.shippingAddress.name,
      email: orderData.userEmail,
      contact: orderData.shippingAddress.phone
    },
    theme: {
      color: '#8B4513'
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
