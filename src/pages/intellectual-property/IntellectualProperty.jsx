import React from "react";
import "./IntellectualProperty.scss";

const IntellectualProperty = () => {
  return (
    <div className="intellectual-property-page">
      <div className="container">
        <h1>Intellectual Property Claims</h1>
        
        <div className="ip-content">
          <p>
            Tupublish respects the intellectual property rights of others and expects all users of the platform to do the same. We take claims of copyright and intellectual property (IP) infringement seriously and will respond to notices of alleged infringement that comply with applicable law.
          </p>
          
          <section className="ip-section">
            <h2>Reporting an Infringement</h2>
            <p>
              If you believe that your copyrighted work or intellectual property has been used in a way that constitutes infringement on the Tupublish platform, please submit a detailed claim to us including:
            </p>
            <ol>
              <li>
                <strong>Your Contact Information:</strong>
                <p>Full name, address, phone number, and email address.</p>
              </li>
              <li>
                <strong>Identification of the Work:</strong>
                <p>A description of the copyrighted work or other intellectual property you claim has been infringed.</p>
              </li>
              <li>
                <strong>Location of the Infringing Material:</strong>
                <p>The exact URL(s) or location(s) on the Tupublish platform where the infringing content is located.</p>
              </li>
              <li>
                <strong>Statement of Ownership:</strong>
                <p>A statement that you have a good faith belief that the disputed use is not authorized by the IP owner, their agent, or the law.</p>
              </li>
              <li>
                <strong>Legal Attestation:</strong>
                <p>A statement, under penalty of perjury, that the information in your claim is accurate and that you are the owner or authorized to act on behalf of the owner.</p>
              </li>
              <li>
                <strong>Signature:</strong>
                <p>A physical or electronic signature of the person authorized to act on behalf of the IP owner.</p>
              </li>
            </ol>
            
            <div className="contact-info">
              <p>Send all IP claims to:</p>
              <p>
                <strong>Email:</strong> legal@tupublish.com<br />
                <strong>Subject Line:</strong> IP Infringement Notice – [Your Name / Company]
              </p>
            </div>
          </section>
          
          <div className="divider"></div>
          
          <section className="ip-section">
            <h2>What Happens Next</h2>
            <p>
              Upon receipt of a valid IP complaint, we will:
            </p>
            <ul>
              <li>Review and investigate the complaint.</li>
              <li>Remove or restrict access to the allegedly infringing material if warranted.</li>
              <li>Notify the user who posted the content and provide them with an opportunity to respond.</li>
              <li>Take additional actions as necessary, including account suspension for repeat offenders.</li>
            </ul>
          </section>
          
          <div className="divider"></div>
          
          <section className="ip-section">
            <h2>Counter Notification</h2>
            <p>
              If you believe that your content was wrongly removed due to an IP complaint, you may submit a counter-notification to legal@tupublish.com with evidence that you have rights to the content in question.
            </p>
          </section>
          
          <div className="divider"></div>
          
          <p className="final-note">
            Tupublish reserves the right to remove content and/or terminate accounts that repeatedly infringe the rights of intellectual property holders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntellectualProperty; 