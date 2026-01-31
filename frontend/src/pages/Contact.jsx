import { useState } from "react";
import { MapPin, Mail, Globe, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open email client with pre-filled data
    const mailtoLink = `mailto:realestate@redsandgcc.com?subject=${encodeURIComponent(
      formData.subject || "Inquiry from Website"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    toast.success("Opening your email client...");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("realestate@redsandgcc.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div data-testid="contact-page" className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
            alt="Dubai"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">
            Get in Touch
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto">
            Ready to explore Dubai's finest properties? We're here to help you 
            every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Reach Out
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
                We'd Love to<br />
                <span className="gold-gradient-text">Hear From You</span>
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-12">
                Whether you're interested in a specific property, seeking investment 
                advice, or simply want to learn more about Dubai's real estate market, 
                our team is ready to assist you.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <div className="glass p-6 flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold/10 flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl text-white mb-2">Email Us</h3>
                    <div className="flex items-center gap-3">
                      <a
                        href="mailto:realestate@redsandgcc.com"
                        data-testid="contact-email"
                        className="text-gold hover:text-gold-hover transition-colors"
                      >
                        realestate@redsandgcc.com
                      </a>
                      <button
                        onClick={copyEmail}
                        data-testid="copy-email-btn"
                        className="p-1 text-white/50 hover:text-gold transition-colors"
                        title="Copy email"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="glass p-6 flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold/10 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl text-white mb-2">Location</h3>
                    <p className="text-white/60">Dubai, United Arab Emirates</p>
                  </div>
                </div>

                {/* Website Card */}
                <div className="glass p-6 flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold/10 flex-shrink-0">
                    <Globe className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl text-white mb-2">Website</h3>
                    <a
                      href="https://redsandgcc.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-website"
                      className="text-gold hover:text-gold-hover transition-colors"
                    >
                      redsandgcc.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass p-8 md:p-12">
              <h3 className="font-playfair text-2xl text-white mb-8">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    data-testid="contact-form-name"
                    className="input-underline"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    data-testid="contact-form-email"
                    className="input-underline"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    data-testid="contact-form-subject"
                    className="input-underline"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows={5}
                    data-testid="contact-form-message"
                    className="input-underline resize-none"
                  />
                </div>
                <button
                  type="submit"
                  data-testid="contact-form-submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
              <p className="text-white/40 text-xs mt-6 text-center">
                This will open your default email client
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-dark-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="aspect-[21/9] w-full overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.94754933577099!3d25.07628045498029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1696845632874!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dubai Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
