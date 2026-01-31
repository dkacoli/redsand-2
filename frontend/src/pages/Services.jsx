import { Link } from "react-router-dom";
import { 
  TrendingUp, Home, Building2, Search, FileText, 
  Handshake, ArrowRight, Check 
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Expert guidance on Dubai's most lucrative real estate investments.",
      features: [
        "Comprehensive market analysis",
        "ROI projections and modeling",
        "Portfolio diversification strategies",
        "Risk assessment and mitigation",
        "Off-plan investment opportunities",
      ],
    },
    {
      icon: Home,
      title: "Residential Sales",
      description: "Find your dream home in Dubai's most prestigious neighborhoods.",
      features: [
        "Personalized property matching",
        "Exclusive off-market listings",
        "Neighborhood insights and tours",
        "Price negotiation support",
        "End-to-end transaction support",
      ],
    },
    {
      icon: Building2,
      title: "Property Management",
      description: "Full-service management ensuring maximum returns with minimal hassle.",
      features: [
        "Tenant sourcing and screening",
        "Rent collection and accounting",
        "Property maintenance coordination",
        "Regular property inspections",
        "Legal compliance management",
      ],
    },
    {
      icon: Search,
      title: "Property Sourcing",
      description: "We find the perfect property that matches your exact requirements.",
      features: [
        "Bespoke property search",
        "Access to exclusive listings",
        "Due diligence and verification",
        "Market value assessment",
        "Comparative property analysis",
      ],
    },
    {
      icon: FileText,
      title: "Documentation Support",
      description: "Navigate the paperwork with our expert documentation assistance.",
      features: [
        "Contract preparation and review",
        "Legal documentation handling",
        "Government liaison services",
        "Visa and residency guidance",
        "Title deed processing",
      ],
    },
    {
      icon: Handshake,
      title: "After-Sales Support",
      description: "Our relationship doesn't end at closing — we're here for the long term.",
      features: [
        "Property handover coordination",
        "Utility setup assistance",
        "Interior design referrals",
        "Ongoing market updates",
        "Resale and refinancing support",
      ],
    },
  ];

  return (
    <div data-testid="services-page" className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
            alt="Luxury Interior"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">
            What We Offer
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to your unique needs. 
            From investment to management, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="glass p-8 hover:border-gold/30 transition-all duration-500 group"
              >
                <service.icon 
                  className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform" 
                  strokeWidth={1.5} 
                />
                <h3 className="font-playfair text-2xl text-white mb-4">{service.title}</h3>
                <p className="text-white/60 font-light mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={16} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-dark-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              How We Work
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", description: "We begin by understanding your goals, preferences, and requirements." },
              { step: "02", title: "Curation", description: "Our team curates a selection of properties that match your criteria." },
              { step: "03", title: "Evaluation", description: "We provide detailed analysis and arrange viewings for shortlisted options." },
              { step: "04", title: "Completion", description: "From negotiation to closing, we handle every detail seamlessly." },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="glass p-8 text-center relative z-10">
                  <p className="font-playfair text-5xl text-gold/20 mb-4">{item.step}</p>
                  <h3 className="font-playfair text-xl text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm font-light">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="text-gold/30" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Ready to Get Started?
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
            Let's Discuss Your Needs
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mb-12">
            Whether you're looking to invest, buy, or need property management services, 
            our team is ready to help you achieve your real estate goals.
          </p>
          <Link
            to="/contact"
            data-testid="services-cta"
            className="btn-primary inline-flex items-center gap-2"
          >
            Contact Us Today
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
