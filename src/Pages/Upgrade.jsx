import React, { useState } from 'react';
import { Check, X, ShieldCheck, Crown } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentModal from './PaymentModal'; 


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PricingPage = () => {
  // const { user } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ plan: '', price: 0 });

  const handleUpgrade = (planType) => {
    const price = planType === 'premium' ? 1500 : 3000;
    setSelectedPlan({ plan: planType, price: price });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Upgrade Your Experience
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Choose the best plan to unlock advanced features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          
          {/* Premium Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900/50 overflow-hidden transition-all hover:scale-105">
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Premium Member</h3>
                <Crown className="text-yellow-500" size={32} />
              </div>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                ৳১৫০০ <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ Lifetime</span>
              </p>
              <ul className="space-y-4 mb-8 text-gray-700 dark:text-gray-300">
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20}/> Unlimited Lessons</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20}/> Ad-free Experience</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20}/> Priority Support</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20}/> Premium Lesson Creation</li>
              </ul>
              <button 
                onClick={() => handleUpgrade('premium')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/30"
              >
                Buy Premium Plan
              </button>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900/50 overflow-hidden transition-all hover:scale-105">
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Become Admin</h3>
                <ShieldCheck className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                ৳৩০০০ <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ Lifetime</span>
              </p>
              <ul className="space-y-4 mb-8 text-gray-700 dark:text-gray-300">
                <li className="flex items-center"><Check className="text-purple-500 mr-2" size={20}/> Access Admin Dashboard</li>
                <li className="flex items-center"><Check className="text-purple-500 mr-2" size={20}/> Manage All Users</li>
                <li className="flex items-center"><Check className="text-purple-500 mr-2" size={20}/> Edit/Delete Any Content</li>
                <li className="flex items-center"><Check className="text-purple-500 mr-2" size={20}/> View Financial Analytics</li>
              </ul>
              <button 
                onClick={() => handleUpgrade('admin')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-purple-500/30"
              >
                Become an Admin
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table (DESIGN ONLY) */}
        <div className="max-w-4xl mx-auto overflow-hidden">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Feature Comparison</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <table className="w-full text-left border-collapse bg-white dark:bg-gray-900">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-4 text-gray-900 dark:text-white font-bold">Features</th>
                  <th className="p-4 text-center text-gray-600 dark:text-gray-400 font-semibold">Free</th>
                  <th className="p-4 text-center text-blue-600 dark:text-blue-400 font-bold">Premium</th>
                  <th className="p-4 text-center text-purple-600 dark:text-purple-400 font-bold">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 text-gray-700 dark:text-gray-300">Number of Lessons</td>
                  <td className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">5 Lessons</td>
                  <td className="p-4 text-center font-semibold text-sm text-gray-800 dark:text-gray-200">Unlimited</td>
                  <td className="p-4 text-center font-semibold text-sm text-gray-800 dark:text-gray-200">Unlimited</td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* STRIPE MODAL INTEGRATION */}
      {isModalOpen && (
        <Elements stripe={stripePromise}>
          <PaymentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            plan={selectedPlan.plan} 
            price={selectedPlan.price}
            
          />
        </Elements>
      )}
    </div>
  );
};

export default PricingPage;