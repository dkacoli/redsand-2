import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_e52b6fc9-8e43-4b5f-917f-6f93474b6661/artifacts/bif9mvec_logo1212.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Investment", path: "/investment" },
  { name: "Residential", path: "/residential" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#050505] border-b border-gold/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link to="/" data-testid="navbar-logo" className="flex-shrink-0 relative z-50">
              <img
                src={LOGO_URL}
                alt="REDSAND Real Estate"
                className="h-12 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                  className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-gold"
                      : "text-white/70 hover:text-gold"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-gold transition-colors relative z-50"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Solid Background */}
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Menu Content */}
        <div className="relative z-10 h-full flex flex-col pt-24 px-6">
          <div className="space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                className={`block text-2xl font-playfair transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-white/80 hover:text-gold"
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Footer info in mobile menu */}
          <div className="mt-auto pb-12">
            <div className="border-t border-gold/20 pt-8">
              <p className="text-white/40 text-sm mb-2">Contact Us</p>
              <a 
                href="mailto:realestate@redsandgcc.com" 
                className="text-gold text-sm"
              >
                realestate@redsandgcc.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
