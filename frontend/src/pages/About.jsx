import { Award, Users, Target, Gem, Building2, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div data-testid="about-page" className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">
            Est. 2021
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            About REDSAND
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto">
            Three and a half years of excellence in Dubai's luxury real estate market.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Our Story
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
                Building Dreams in<br />
                <span className="gold-gradient-text">Dubai's Skyline</span>
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                REDSAND Real Estate was founded in mid-2021 with a singular vision: to redefine 
                luxury real estate services in Dubai. What began as a boutique agency has grown 
                into one of the emirate's most trusted names in premium property transactions.
              </p>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                Over the past three and a half years, we've had the privilege of helping hundreds 
                of discerning clients — from international investors seeking high-yield opportunities 
                to families searching for their forever homes in Dubai's most prestigious communities.
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                Our success is built on a foundation of deep market expertise, unwavering integrity, 
                and a commitment to exceeding expectations at every turn. We don't just sell properties; 
                we build lasting relationships and help our clients achieve their real estate dreams.
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80"
                alt="Dubai Marina"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-8 -left-8 glass p-8">
                <p className="font-playfair text-5xl text-gold mb-2">3.5+</p>
                <p className="text-xs uppercase tracking-wider text-white/60">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-dark-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              What Drives Us
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Gem,
                title: "Excellence",
                description: "We pursue excellence in every interaction, ensuring unparalleled service quality.",
              },
              {
                icon: Target,
                title: "Integrity",
                description: "Transparency and honesty form the cornerstone of all our client relationships.",
              },
              {
                icon: Users,
                title: "Client-Centric",
                description: "Your goals are our goals. We're committed to your complete satisfaction.",
              },
              {
                icon: Award,
                title: "Expertise",
                description: "Deep market knowledge and experience guide every recommendation we make.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="glass p-8 text-center hover:border-gold/30 transition-all duration-500"
              >
                <value.icon className="w-12 h-12 text-gold mx-auto mb-6" strokeWidth={1.5} />
                <h3 className="font-playfair text-xl text-white mb-4">{value.title}</h3>
                <p className="text-white/60 font-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Our Track Record
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">
              Numbers That Speak
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "150+", label: "Properties Sold" },
              { value: "AED 500M+", label: "Transaction Value" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "50+", label: "Active Listings" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-playfair text-4xl md:text-5xl text-gold mb-2">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dubai Section */}
      <section className="py-24 md:py-32 bg-dark-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80"
                alt="Burj Khalifa"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Our Focus
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">
                Why Dubai?
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                Dubai stands as a beacon of opportunity in the global real estate landscape. 
                With its tax-free environment, world-class infrastructure, and strategic 
                location bridging East and West, the emirate offers unmatched potential 
                for property investment.
              </p>
              <div className="space-y-4">
                {[
                  { icon: TrendingUp, text: "Strong capital appreciation potential" },
                  { icon: Building2, text: "World-renowned architectural marvels" },
                  { icon: Users, text: "Diverse, cosmopolitan community" },
                  { icon: Award, text: "Safe, stable investment environment" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-gold flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-white/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
