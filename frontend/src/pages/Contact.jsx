import { useState } from "react";
import { MapPin, Mail, Globe, Send, Copy, Check, Phone, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "general",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, interest: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${API}/inquiries`, formData);
      setSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "general",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
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

      {/* Main Contact Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Info */}
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
                our team is ready to assist you. Fill out the form and we'll get back 
                to you within 24 hours.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <div className="glass p-6 flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold/10 flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl text-white mb-2">Email Us Directly</h3>
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

            {/* Right Side - Inquiry Form */}
            <div className="glass p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-playfair text-2xl text-white mb-4">Thank You!</h3>
                  <p className="text-white/60 mb-8">
                    Your inquiry has been submitted successfully. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-playfair text-2xl text-white mb-2">Send an Inquiry</h3>
                  <p className="text-white/50 text-sm mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gold" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                          data-testid="inquiry-form-name"
                          className="input-underline pl-8"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gold" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          data-testid="inquiry-form-email"
                          className="input-underline pl-8"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gold" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+971 XX XXX XXXX"
                          required
                          data-testid="inquiry-form-phone"
                          className="input-underline pl-8"
                        />
                      </div>
                    </div>

                    {/* Interest */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                        I'm Interested In
                      </label>
                      <Select value={formData.interest} onValueChange={handleSelectChange}>
                        <SelectTrigger 
                          data-testid="inquiry-form-interest"
                          className="bg-transparent border-0 border-b border-white/20 rounded-none text-white focus:ring-0 focus:border-gold px-0"
                        >
                          <SelectValue placeholder="Select your interest" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-gold/20">
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="investment">Investment Properties</SelectItem>
                          <SelectItem value="residential">Residential Properties</SelectItem>
                          <SelectItem value="selling">Selling My Property</SelectItem>
                          <SelectItem value="consultation">Free Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                        Your Message *
                      </label>
                      <div className="relative">
                        <MessageSquare size={18} className="absolute left-0 top-4 text-gold" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your requirements..."
                          required
                          rows={4}
                          data-testid="inquiry-form-message"
                          className="input-underline pl-8 resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      data-testid="inquiry-form-submit"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Inquiry
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-white/30 text-xs mt-6 text-center">
                    By submitting, you agree to be contacted by our team regarding your inquiry.
                  </p>
                </>
              )}
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
