import { Link } from "react-router-dom";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_e52b6fc9-8e43-4b5f-917f-6f93474b6661/artifacts/bif9mvec_logo1212.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="bg-dark-surface border-t border-gold/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={LOGO_URL}
              alt="REDSAND Real Estate"
              className="h-14 w-auto mb-6"
            />
            <p className="text-white/60 font-light leading-relaxed max-w-md mb-8">
              Your premier partner in Dubai's luxury real estate market. 
              Established in 2021, we specialize in exceptional investment opportunities 
              and exquisite residential properties.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://redsandgcc.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-website-link"
                className="text-gold hover:text-gold-hover transition-colors text-sm uppercase tracking-wider flex items-center gap-2"
              >
                redsandgcc.com
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Investment Properties", path: "/investment" },
                { name: "Residential Properties", path: "/residential" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  Dubai, United Arab Emirates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:realestate@redsandgcc.com"
                  data-testid="footer-email"
                  className="text-white/60 hover:text-gold transition-colors text-sm"
                >
                  realestate@redsandgcc.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            &copy; {currentYear} REDSAND Real Estate. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Established 2021 | Dubai, UAE
          </p>
        </div>
      </div>
    </footer>
  );
}
