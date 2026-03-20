import React from 'react';
import './PolicyPages.css';

const PrivacyPage = () => {
  return (
    <div className="policy-page">
      <section className="policy-hero">
        <div className="container">
          <h1 className="page-title">🔒 Privacy Policy</h1>
          <p className="page-subtitle">Last updated: November 19, 2025</p>
        </div>
      </section>

      <section className="policy-content">
        <div className="container">
          <div className="policy-document">
            <div className="policy-intro">
              <p>
                At CodeMarket, we take your privacy seriously. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use
                our platform.
              </p>
            </div>

            <div className="policy-section">
              <h2>1. Information We Collect</h2>
              <h3>1.1 Personal Information</h3>
              <p>We collect information that you provide directly to us:</p>
              <ul>
                <li>Name and contact information (email, phone)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (processed securely through third parties)</li>
                <li>Profile information (avatar, bio, website)</li>
                <li>Communication history with support</li>
              </ul>

              <h3>1.2 Automatically Collected Information</h3>
              <ul>
                <li>Device information (IP address, browser type, OS)</li>
                <li>Usage data (pages visited, time spent, clicks)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Location data (approximate, based on IP)</li>
              </ul>

              <h3>1.3 Information from Third Parties</h3>
              <ul>
                <li>Social media profile data (if you sign in via OAuth)</li>
                <li>Payment processor information</li>
                <li>Analytics providers</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Process your transactions and send confirmations</li>
                <li>Send you important updates and notifications</li>
                <li>Respond to your comments and questions</li>
                <li>Prevent fraud and enhance security</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. How We Share Your Information</h2>
              <p>We may share your information with:</p>
              
              <h3>3.1 Service Providers</h3>
              <ul>
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Email service providers</li>
                <li>Cloud hosting providers</li>
                <li>Analytics services</li>
              </ul>

              <h3>3.2 Business Transfers</h3>
              <p>
                If CodeMarket is involved in a merger, acquisition, or sale of assets,
                your information may be transferred as part of that transaction.
              </p>

              <h3>3.3 Legal Requirements</h3>
              <p>We may disclose your information if required by law or in response to:</p>
              <ul>
                <li>Court orders or legal processes</li>
                <li>Government requests</li>
                <li>Protection of our rights and safety</li>
              </ul>

              <h3>3.4 With Your Consent</h3>
              <p>We may share your information for other purposes with your explicit consent.</p>
            </div>

            <div className="policy-section">
              <h2>4. Data Security</h2>
              <p>We implement industry-standard security measures:</p>
              <ul>
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted storage for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Firewall protection</li>
              </ul>
              <p>
                However, no method of transmission over the Internet is 100% secure.
                While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </div>

            <div className="policy-section">
              <h2>5. Your Privacy Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to certain data processing activities</li>
              </ul>
              <p>
                To exercise these rights, contact us at privacy@codemarket.com
              </p>
            </div>

            <div className="policy-section">
              <h2>6. Cookies and Tracking</h2>
              <h3>Types of Cookies We Use:</h3>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the platform to function</li>
                <li><strong>Analytics Cookies:</strong> Help us understand user behavior</li>
                <li><strong>Marketing Cookies:</strong> Used for advertising and retargeting</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Note that disabling
                certain cookies may affect platform functionality.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Children's Privacy</h2>
              <p>
                CodeMarket is not intended for users under the age of 16. We do not
                knowingly collect personal information from children. If you believe
                we have collected information from a child, please contact us immediately.
              </p>
            </div>

            <div className="policy-section">
              <h2>8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other
                than your own. We ensure appropriate safeguards are in place for such
                transfers, including:
              </p>
              <ul>
                <li>Standard contractual clauses approved by authorities</li>
                <li>Privacy Shield certification (where applicable)</li>
                <li>Adequacy decisions by relevant authorities</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>9. Data Retention</h2>
              <p>We retain your information for as long as:</p>
              <ul>
                <li>Your account is active</li>
                <li>Needed to provide services</li>
                <li>Required by law or regulations</li>
                <li>Necessary for legitimate business purposes</li>
              </ul>
              <p>
                After account deletion, we may retain certain data for up to 90 days
                for backup and recovery purposes.
              </p>
            </div>

            <div className="policy-section">
              <h2>10. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you
                of significant changes via email or prominent notice on our platform.
                Your continued use after changes indicates acceptance of the updated policy.
              </p>
            </div>

            <div className="policy-section">
              <h2>11. Contact Us</h2>
              <p>
                For questions or concerns about this Privacy Policy or our data practices:
              </p>
              <ul>
                <li><strong>Email:</strong> privacy@codemarket.com</li>
                <li><strong>Data Protection Officer:</strong> dpo@codemarket.com</li>
                <li><strong>Phone:</strong> +84 (028) 1234 5678</li>
                <li><strong>Mail:</strong> 123 Tech Street, District 1, Ho Chi Minh City, Vietnam</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
