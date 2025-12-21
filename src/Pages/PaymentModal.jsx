import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { X, CreditCard } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, plan, price, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  
  useEffect(() => {
    if (isOpen && price > 0) {
      
      const baseUrl = import.meta.env.VITE_API_URL;
      
      axios.post(`${baseUrl}/create-payment-intent`, { price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error("Stripe Intent Error:", err);
          toast.error("Failed to initialize payment system.");
        });
    }
  }, [isOpen, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    
    const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.name || user?.displayName || "Anonymous",
          email: user?.email || "unknown@mail.com",
        },
      },
    });

    if (stripeError) {
      console.log("[Stripe Error Details]:", stripeError);
      toast.error(stripeError.message);
      setProcessing(false);
      return; 
    }

    if (paymentIntent.status === "succeeded") {
      
      const updatePayload = {};
      if (plan === 'premium') {
        updatePayload.isPremium = true;
        updatePayload.role = 'premium'; 
      } else if (plan === 'admin') {
        updatePayload.role = 'admin';
      }

      try {
       
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.patch(
          `${baseUrl}/users/upgrade/${user?.email}`, 
          updatePayload
        );

       
        if (response.data.modifiedCount > 0 || response.data.matchedCount > 0) {
          toast.success(`Success! Transaction ID: ${paymentIntent.id}`);
          toast.success(plan === 'premium' ? "Welcome to Premium!" : "You are now an Admin!");
          
          setProcessing(false);
          onClose(); 

          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Database update failed. Please contact support.");
          setProcessing(false);
        }
      } catch (dbError) {
        console.error("Database Update Error:", dbError);
        toast.error("Internal Server Error during update.");
        setProcessing(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CreditCard className="text-blue-600" />
            <h3 className="text-xl font-bold dark:text-white">Secure Payment</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You are subscribing to the <span className="font-bold text-blue-600 capitalize">{plan}</span> plan.
          </p>
          <div className="text-3xl font-extrabold dark:text-white mb-6 text-center">৳{price}</div>

          <form onSubmit={handleSubmit}>
            <div className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-6">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': { color: '#aab7c4' },
                    },
                    invalid: { color: '#ef4444' },
                  },
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!stripe || processing || !clientSecret}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 transition-all flex justify-center items-center"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Processing...
                </span>
              ) : `Pay ৳${price}`}
            </button>
          </form>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Secured by Stripe. 100% Encrypted & Safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;