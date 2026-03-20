import React from 'react';
import './PolicyPages.css';

const TermsPage = () => {
  return (
    <div className="policy-page">
      <section className="policy-hero">
        <div className="container">
          <h1 className="page-title">📜 Terms of Service</h1>
          <p className="page-subtitle">Last updated: November 19, 2025</p>
        </div>
      </section>

      <section className="policy-content">
        <div className="container">
          <div className="policy-document">
            <div className="policy-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using CodeMarket, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to these Terms of Service,
                please do not use our service.
              </p>
            </div>

            <div className="policy-section">
              <h2>2. User Accounts</h2>
              <h3>2.1 Account Creation</h3>
              <p>
                To use certain features of our service, you must register for an account. You agree to:
              </p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3>2.2 Account Types</h3>
              <p>We offer different account types:</p>
              <ul>
                <li><strong>Buyer Account:</strong> For purchasing digital products</li>
                <li><strong>Seller Account:</strong> For selling your products (subject to approval)</li>
                <li><strong>Admin Account:</strong> For platform management (internal only)</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. Purchases and Payments</h2>
              <h3>3.1 Pricing</h3>
              <p>
                All prices are displayed in VND (Vietnamese Dong) unless otherwise stated.
                Prices are subject to change without notice. We reserve the right to modify
                prices at any time.
              </p>

              <h3>3.2 Payment Processing</h3>
              <p>
                Payments are processed through secure third-party payment processors.
                We do not store your full credit card information on our servers.
              </p>

              <h3>3.3 Refund Policy</h3>
              <p>
                We offer a 30-day money-back guarantee for all purchases. See our Refund Policy
                for detailed terms and conditions.
              </p>
            </div>

            <div className="policy-section">
              <h2>4. Licenses and Usage Rights</h2>
              <h3>4.1 Regular License</h3>
              <p>The Regular License allows you to:</p>
              <ul>
                <li>Use the item to create one single end product</li>
                <li>Modify or manipulate the item</li>
                <li>Combine the item with other works</li>
              </ul>
              <p>You cannot:</p>
              <ul>
                <li>Redistribute or resell the item</li>
                <li>Use the item in multiple end products</li>
              </ul>

              <h3>4.2 Extended License</h3>
              <p>The Extended License includes all Regular License rights, plus:</p>
              <ul>
                <li>Use in multiple end products</li>
                <li>Use for commercial purposes with multiple clients</li>
                <li>Use in applications with paid subscriptions</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>5. Seller Responsibilities</h2>
              <h3>5.1 Product Quality</h3>
              <p>Sellers must:</p>
              <ul>
                <li>Provide accurate product descriptions</li>
                <li>Ensure products are free from malware and viruses</li>
                <li>Provide product updates when necessary</li>
                <li>Offer customer support as advertised</li>
              </ul>

              <h3>5.2 Commission Structure</h3>
              <p>
                CodeMarket charges a 30% commission on each sale. This commission covers:
              </p>
              <ul>
                <li>Platform hosting and maintenance</li>
                <li>Payment processing fees</li>
                <li>Customer support</li>
                <li>Marketing and promotion</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>6. Intellectual Property</h2>
              <p>
                All content on CodeMarket, including text, graphics, logos, and software,
                is the property of CodeMarket or its content suppliers and is protected
                by international copyright laws.
              </p>
              <p>
                Sellers retain copyright ownership of their products but grant CodeMarket
                a license to display and sell their products on our platform.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Prohibited Activities</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Upload malicious code or viruses</li>
                <li>Infringe on intellectual property rights</li>
                <li>Engage in fraudulent activities</li>
                <li>Manipulate reviews or ratings</li>
                <li>Spam or harass other users</li>
                <li>Attempt to bypass payment systems</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>8. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time for:
              </p>
              <ul>
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent or illegal activity</li>
                <li>Repeated complaints from other users</li>
                <li>Prolonged inactivity</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>9. Limitation of Liability</h2>
              <p>
                CodeMarket shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of the service.
                Our total liability shall not exceed the amount you paid for the product.
              </p>
            </div>

            <div className="policy-section">
              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users
                of significant changes via email or platform notifications. Continued use
                of the service after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="policy-section">
              <h2>11. Contact Information</h2>
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li>Email: legal@codemarket.com</li>
                <li>Phone: +84 (028) 1234 5678</li>
                <li>Address: 123 Tech Street, District 1, Ho Chi Minh City, Vietnam</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
