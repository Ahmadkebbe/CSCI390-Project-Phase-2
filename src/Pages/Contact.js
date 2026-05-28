import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSent(true);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-sub">
        Have a question or suggestion? We'd love to hear from you.
      </p>

      <div className="contact-grid">
        {/* Left — info panel */}
        <div className="contact-info">
          <h3>Get in touch</h3>
          <p>
            Find My Sport is a student project helping people in Lebanon
            discover the right sport for their lifestyle and find local venues
            to get started.
          </p>
          <div className="contact-detail">
            <div className="contact-detail-icon">📧</div>
            findmysport@example.com
          </div>
          <div className="contact-detail">
            <div className="contact-detail-icon">📍</div>
            Beirut, Lebanon
          </div>
          <div className="contact-detail">
            <div className="contact-detail-icon">🕐</div>
            Mon – Fri, 9 AM – 6 PM
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-form">
          {!formSent ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Ali Hassan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="ali@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="form-submit">
                Send Message
              </button>
            </form>
          ) : (
            <div className="form-success">
              <div className="form-success-icon">✅</div>
              <h4>Message sent!</h4>
              <p>Thanks {formData.name}, we'll get back to you soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}