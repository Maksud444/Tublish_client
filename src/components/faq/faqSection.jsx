import React, { useState } from "react";
import "./faqSection.scss";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How do I contact Tupublish?",
    answer: "You can contact Tupublish via our support email or through the contact form on our website.",
  },
  {
    question:
      "What security measures does Tupublish have in place to protect its clients' data and transactions?",
    answer: "We implement strong encryption, two-factor authentication, and regular audits to ensure data safety.",
  },
  {
    question: "How can I convert fiat money into cryptocurrencies on Tupublish?",
    answer: "You can use our integrated fiat-to-crypto gateway available in your dashboard.",
  },
  {
    question: "What is the mission of Tupublish?",
    answer: "Our mission is to make blockchain technology accessible and secure for everyone.",
  },
  {
    question: "Conduct that may get your account suspended",
    answer: "Any fraudulent activity, spam, or abuse of our platform policies may lead to suspension.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <p className="label">FAQs</p>
      <h2 className="title">Questions & Answers</h2>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h4>{faq.question}</h4>
              <span>{openIndex === index ? <FiMinus /> : <FiPlus />}</span>
            </div>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;