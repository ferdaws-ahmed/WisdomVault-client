import React from 'react';

const FaqSection = () => {
    const faqs = [
        {
            question: "What is WisdomVault?",
            answer: "WisdomVault is a digital life lessons platform where users can store, manage, and share personal growth insights and wisdom gained from real-life experiences."
        },
        {
            question: "What are the benefits of the Premium Plan?",
            answer: "Premium users get lifetime access to all public lessons (Free + Premium), the ability to create premium content, and a special badge on their profile. It’s a one-time payment with no recurring fees."
        },
        {
            question: "Is my data secure?",
            answer: "Yes. We use Firebase Authentication and secure JWT verification on the server side to ensure your personal lessons and account data are always protected."
        },
        {
            question: "Can I keep my lessons private?",
            answer: "Absolutely! When creating a lesson, you can choose between 'Public' or 'Private' visibility. Private lessons are only visible to you in your personal dashboard."
        },
        {
            question: "How does the payment system work?",
            answer: "We use Stripe for secure processing. You can choose between a Lifetime User access for ৳1500 or a Lifetime Admin access for ৳3000."
        },
        {
            question: "Can I edit or delete my lessons later?",
            answer: "Yes, your User Dashboard provides full CRUD functionality. You can update the content, category, or emotional tone of your lessons, or delete them anytime."
        }
    ];

    return (
        <section className="py-20 transition-colors duration-300 bg-base-100 dark:bg-slate-900">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-base-content/70 dark:text-slate-400">
                        Everything you need to know about WisdomVault and how it works.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="grid gap-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="collapse collapse-arrow bg-base-200 dark:bg-slate-800 border border-base-300 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:shadow-md"
                        >
                            <input type="radio" name="wisdom-faq" defaultChecked={index === 0} /> 
                            <div className="collapse-title text-xl font-semibold text-primary dark:text-secondary-focus">
                                {faq.question}
                            </div>
                            <div className="collapse-content"> 
                                <p className="text-base-content/80 dark:text-slate-300 text-md leading-relaxed border-t border-base-300 dark:border-slate-700 pt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;