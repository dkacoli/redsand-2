import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, TrendingUp, Home as HomeIcon, Users, Award, MapPin } from "lucide-react";
import axios from "axios";
import PropertyCard from "@/components/PropertyCard";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HERO_BG = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API}/properties/featured?limit=6`);
        setFeaturedProperties(response.data);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt="Dubai Skyline"
            className="w-full h-full object-cover animate-slowZoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 animate-fade-in-up opacity-0 stagger-1">
            Dubai's Premier Real Estate
          </p>
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-8 animate-fade-in-up opacity-0 stagger-2 leading-none">
            Exceptional Properties<br />
            <span className="gold-gradient-text">Extraordinary Living</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-12 animate-fade-in-up opacity-0 stagger-3">
            Discover Dubai's most exclusive investment opportunities and luxury residences 
            with REDSAND Real Estate — your trusted partner since 2021.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 stagger-4">
            <Link
              to="/investment"
              data-testid="hero-cta-investment"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Investment Properties
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/residential"
              data-testid="hero-cta-residential"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Residential Properties
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border border-gold/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-surface border-y border-gold/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "3.5+", label: "Years of Excellence", icon: Award },
              { value: "150+", label: "Properties Sold", icon: Building2 },
              { value: "AED 500M+", label: "In Transactions", icon: TrendingUp },
              { value: "98%", label: "Client Satisfaction", icon: Users },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" strokeWidth={1.5} />
                <p className="font-playfair text-3xl md:text-4xl text-white mb-2">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Curated Selection
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white">
                Featured Properties
              </h2>
            </div>
            <Link
              to="/investment"
              data-testid="view-all-properties"
              className="mt-6 md:mt-0 text-gold hover:text-gold-hover transition-colors text-sm uppercase tracking-wider flex items-center gap-2"
            >
              View All Properties
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-dark-surface animate-pulse aspect-[4/5]" />
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-white/50">No featured properties available at the moment.</p>
              <p className="text-white/30 text-sm mt-2">Check back soon or contact us for exclusive listings.</p>
            </div>
          )}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-dark-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              What We Offer
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Investment Advisory",
                description:
                  "Expert guidance on Dubai's most lucrative real estate investments with comprehensive market analysis and ROI projections.",
              },
              {
                icon: HomeIcon,
                title: "Residential Sales",
                description:
                  "Discover your dream home in Dubai's most prestigious neighborhoods with our personalized property matching service.",
              },
              {
                icon: Building2,
                title: "Property Management",
                description:
                  "Full-service property management ensuring your investment delivers maximum returns with minimal hassle.",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="glass p-8 hover:border-gold/30 transition-all duration-500 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <service.icon className="w-10 h-10 text-gold mb-6" strokeWidth={1.5} />
                <h3 className="font-playfair text-2xl text-white mb-4">{service.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              data-testid="view-all-services"
              className="btn-outline inline-flex items-center gap-2"
            >
              Explore All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80"
            alt="Dubai Marina"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/80" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                About REDSAND
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
                Three and a Half Years of
                <span className="gold-gradient-text"> Excellence</span>
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                Since our establishment in 2021, REDSAND Real Estate has become synonymous 
                with luxury property transactions in Dubai. Our deep understanding of the 
                market, combined with an unwavering commitment to client satisfaction, has 
                positioned us as the go-to agency for discerning investors and homebuyers.
              </p>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                We specialize exclusively in Dubai's premier properties — from high-yield 
                investment opportunities to breathtaking residences that redefine luxury living.
              </p>
              <Link
                to="/about"
                data-testid="learn-more-about"
                className="btn-outline inline-flex items-center gap-2"
              >
                Learn More About Us
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="glass p-6">
                  <MapPin className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
                  <h4 className="font-playfair text-xl text-white mb-2">Dubai Exclusive</h4>
                  <p className="text-white/50 text-sm">100% focused on Dubai's luxury market</p>
                </div>
                <div className="glass p-6">
                  <Users className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
                  <h4 className="font-playfair text-xl text-white mb-2">Expert Team</h4>
                  <p className="text-white/50 text-sm">Seasoned professionals at your service</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="glass p-6">
                  <Award className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
                  <h4 className="font-playfair text-xl text-white mb-2">Trusted Partner</h4>
                  <p className="text-white/50 text-sm">Building relationships that last</p>
                </div>
                <div className="glass p-6">
                  <TrendingUp className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
                  <h4 className="font-playfair text-xl text-white mb-2">Proven Results</h4>
                  <p className="text-white/50 text-sm">Consistent ROI for our clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-dark-surface border-t border-gold/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Ready to Begin?
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-8">
            Your Dream Property Awaits
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mb-12">
            Whether you're seeking a lucrative investment or your perfect home in Dubai, 
            our team is ready to guide you every step of the way.
          </p>
          <Link
            to="/contact"
            data-testid="cta-contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
