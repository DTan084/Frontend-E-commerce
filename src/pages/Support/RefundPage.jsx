import React from 'react';
import './PolicyPages.css';

const RefundPage = () => {
  return (
    <div className="policy-page">
      <section className="policy-hero">
        <div className="container">
          <h1 className="page-title">💰 Refund Policy</h1>
          <p className="page-subtitle">Last updated: November 19, 2025</p>
        </div>
      </section>

      <section className="policy-content">
        <div className="container">
          <div className="policy-document">
            <div className="policy-intro">
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy
                with a product, we offer a 30-day money-back guarantee under certain conditions.
              </p>
            </div>

            <div className="policy-section">
              <h2>1. 30-Day Money-Back Guarantee</h2>
              <p>
                You can request a refund within 30 days of purchase if:
              </p>
              <ul>
                <li>The product doesn't work as described in the listing</li>
                <li>The product has major bugs that prevent its use</li>
                <li>The product is incompatible with the stated requirements</li>
                <li>The seller doesn't provide advertised support</li>
                <li>The product files are corrupt or incomplete</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>2. Non-Refundable Situations</h2>
              <p>
                Refunds will NOT be provided if:
              </p>
              <ul>
                <li>You simply changed your mind</li>
                <li>You bought a product by mistake (without reviewing details)</li>
                <li>You don't have sufficient expertise to use the product</li>
                <li>The product works as described, but doesn't meet your expectations</li>
                <li>You've already used the product in a completed project</li>
                <li>The refund is requested after 30 days from purchase</li>
                <li>You violated the Terms of Service</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>3. Refund Process</h2>
              <h3>Step 1: Contact the Seller</h3>
              <p>
                Before requesting a refund, you must first contact the seller through
                the product support page. Give them at least 48 hours to respond and
                attempt to resolve the issue.
              </p>

              <h3>Step 2: Request a Refund</h3>
              <p>
                If the seller cannot resolve the issue, go to "My Purchases" and click
                "Request Refund" on the product. Provide:
              </p>
              <ul>
                <li>Detailed reason for the refund request</li>
                <li>Screenshots or evidence of the issue</li>
                <li>Communication history with the seller (if any)</li>
              </ul>

              <h3>Step 3: Review Process</h3>
              <p>
                Our team will review your request within 3-5 business days. We may:
              </p>
              <ul>
                <li>Contact you for additional information</li>
                <li>Test the product ourselves</li>
                <li>Mediate between you and the seller</li>
              </ul>

              <h3>Step 4: Decision and Payout</h3>
              <p>
                Once approved, refunds are processed within 7-10 business days to your
                original payment method. You'll receive an email confirmation.
              </p>
            </div>

            <div className="policy-section">
              <h2>4. Partial Refunds</h2>
              <p>
                In some cases, we may offer partial refunds:
              </p>
              <ul>
                <li>The product works but with minor issues</li>
                <li>The seller provides compensation (credits, discounts)</li>
                <li>You've used some but not all parts of a bundle</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>5. Refund for Extended Licenses</h2>
              <p>
                Extended license purchases can be refunded to Regular license status if:
              </p>
              <ul>
                <li>You haven't used the extended license features</li>
                <li>You request within 14 days of purchase</li>
              </ul>
              <p>
                You'll receive a partial refund equal to the price difference between
                Regular and Extended licenses.
              </p>
            </div>

            <div className="policy-section">
              <h2>6. Seller Responsibilities</h2>
              <p>
                Sellers are responsible for:
              </p>
              <ul>
                <li>Providing accurate product descriptions</li>
                <li>Offering the advertised level of support</li>
                <li>Fixing legitimate bugs and issues</li>
                <li>Responding to customer inquiries within 48 hours</li>
              </ul>
              <p>
                Sellers with excessive refund rates ({'>'}10%) may face account suspension.
              </p>
            </div>

            <div className="policy-section">
              <h2>7. Refund Abuse</h2>
              <p>
                We take refund abuse seriously. The following actions may result in
                account termination:
              </p>
              <ul>
                <li>Requesting refunds for products you've already used</li>
                <li>Attempting to keep product files after refund</li>
                <li>Filing multiple frivolous refund requests</li>
                <li>Violating license terms and then requesting refunds</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>8. Dispute Resolution</h2>
              <p>
                If you disagree with a refund decision:
              </p>
              <ul>
                <li>You can appeal within 7 days of the decision</li>
                <li>Provide new evidence or information</li>
                <li>Our senior team will conduct a final review</li>
                <li>The final decision is binding</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>9. Payment Processing Fees</h2>
              <p>
                Please note:
              </p>
              <ul>
                <li>Payment processing fees (usually 3-5%) are non-refundable</li>
                <li>International transaction fees may apply</li>
                <li>Currency conversion rates at time of refund may differ from purchase</li>
              </ul>
            </div>

            <div className="policy-section">
              <h2>10. Questions?</h2>
              <p>
                If you have questions about our refund policy or need assistance with
                a refund request:
              </p>
              <ul>
                <li><strong>Email:</strong> refunds@codemarket.com</li>
                <li><strong>Live Chat:</strong> Available 24/7 on our website</li>
                <li><strong>Phone:</strong> +84 (028) 1234 5678 (Mon-Fri, 9AM-6PM GMT+7)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPage;
