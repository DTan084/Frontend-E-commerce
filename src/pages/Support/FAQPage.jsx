import React, { useState } from 'react';
import './FAQPage.css';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: 'general', name: '📋 General', icon: '📋' },
    { id: 'purchase', name: '💳 Purchase & Payment', icon: '💳' },
    { id: 'download', name: '📥 Download & Installation', icon: '📥' },
    { id: 'license', name: '📜 License & Usage', icon: '📜' },
    { id: 'seller', name: '🏪 Selling', icon: '🏪' },
    { id: 'support', name: '🛟 Support', icon: '🛟' }
  ];

  const faqs = {
    general: [
      {
        question: 'What is CodeMarket?',
        answer: 'CodeMarket is a premium marketplace for source code, templates, plugins, and digital products. We connect developers and designers with buyers looking for high-quality, ready-to-use code solutions.'
      },
      {
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button in the top right corner, fill in your details, and verify your email. You can also sign up using your Google or GitHub account for faster registration.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we use industry-standard encryption (SSL/TLS) to protect your data. We never share your personal information with third parties without your consent.'
      }
    ],
    purchase: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Visa, Mastercard, PayPal, and various local payment methods. All transactions are processed securely through our payment partners.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'Yes, we offer a 30-day money-back guarantee if the product doesn\'t work as described or has major bugs. Check our Refund Policy for full details.'
      },
      {
        question: 'Do I need to pay for updates?',
        answer: 'No! All future updates for products you\'ve purchased are completely free. You\'ll receive notifications when new versions are available.'
      },
      {
        question: 'Can I purchase for multiple sites/projects?',
        answer: 'This depends on the license type. Regular licenses are for single use, while Extended licenses allow multiple uses. Check the product description for details.'
      }
    ],
    download: [
      {
        question: 'How do I download my purchase?',
        answer: 'After purchase, go to "My Purchases" in your dashboard. Click the download button next to the product. Files are available in various formats (ZIP, RAR, etc.).'
      },
      {
        question: 'Can I re-download after purchase?',
        answer: 'Yes! You can download your purchases unlimited times. All your purchases are saved in your account forever.'
      },
      {
        question: 'The download link isn\'t working. What should I do?',
        answer: 'Try using a different browser or clearing your cache. If the problem persists, contact support with your order number and we\'ll provide an alternative download link.'
      }
    ],
    license: [
      {
        question: 'What\'s the difference between Regular and Extended licenses?',
        answer: 'Regular License: For single end product (free or commercial). Extended License: For end products sold to multiple clients or with a subscription model.'
      },
      {
        question: 'Can I modify the source code?',
        answer: 'Yes! You have full rights to modify, customize, and adapt the code to fit your needs. You can even remove copyright notices if allowed by the license.'
      },
      {
        question: 'Can I use the code in client projects?',
        answer: 'Yes, with the appropriate license. Regular license covers one client project, Extended license covers multiple client projects.'
      }
    ],
    seller: [
      {
        question: 'How do I become a seller?',
        answer: 'Click "Become a Seller" in the footer, fill out the application form, and submit your first product for review. Approval typically takes 1-3 business days.'
      },
      {
        question: 'What are the fees?',
        answer: 'We charge a 30% commission on each sale. There are no upfront fees or monthly charges. You only pay when you make a sale.'
      },
      {
        question: 'How do I get paid?',
        answer: 'Payments are processed monthly via PayPal, bank transfer, or Payoneer. Minimum withdrawal amount is $50. You\'ll receive payment within 7 days of request.'
      },
      {
        question: 'What products can I sell?',
        answer: 'Source code, templates, themes, plugins, UI kits, design files, and digital services. All products must be original work and pass our quality review.'
      }
    ],
    support: [
      {
        question: 'How can I contact support?',
        answer: 'You can reach us via: Live chat (24/7), Email at support@codemarket.com, or submit a ticket through your dashboard. Average response time is under 2 hours.'
      },
      {
        question: 'Do products come with support?',
        answer: 'Yes! Most products include 6 months of free support from the author. You can contact them directly through the product page or your dashboard.'
      },
      {
        question: 'What if the product has bugs?',
        answer: 'Contact the author first for a fix. If unresponsive, contact our support team and we\'ll assist with a resolution or refund.'
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <h1 className="page-title">❓ Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find answers to common questions about CodeMarket
          </p>
          <div className="search-box">
            <input type="text" placeholder="Search for answers..." />
            <button>🔍 Search</button>
          </div>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="faq-layout">
            {/* Categories Sidebar */}
            <div className="faq-categories">
              <h3>Categories</h3>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="faq-list">
              <h2>
                {categories.find(c => c.id === activeCategory)?.icon}{' '}
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <div className="faq-items">
                {faqs[activeCategory]?.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${openFAQ === index ? 'open' : ''}`}
                  >
                    <button 
                      className="faq-question"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-icon">
                        {openFAQ === index ? '−' : '+'}
                      </span>
                    </button>
                    {openFAQ === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Still Need Help */}
          <div className="help-cta">
            <h3>Still need help?</h3>
            <p>Can't find what you're looking for? Our support team is here to help.</p>
            <div className="help-buttons">
              <button className="help-btn primary">💬 Live Chat</button>
              <button className="help-btn">📧 Contact Support</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
