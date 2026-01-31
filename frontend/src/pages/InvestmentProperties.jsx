import { useState, useEffect } from "react";
import { Building2, TrendingUp } from "lucide-react";
import axios from "axios";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function InvestmentProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ property_type: "investment", ...filters });
      const response = await axios.get(`${API}/properties?${params}`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (filters) => {
    fetchProperties(filters);
  };

  return (
    <div data-testid="investment-properties-page" className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 mb-6">
            <TrendingUp size={16} className="text-gold" />
            <span className="text-xs uppercase tracking-wider text-gold">High-Yield Opportunities</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Investment Properties
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto">
            Discover Dubai's most lucrative real estate investment opportunities. 
            Maximize your returns with our carefully curated portfolio.
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <PropertyFilter onFilterChange={handleFilterChange} propertyType="investment" />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-dark-surface animate-pulse aspect-[4/5]" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 size={64} className="text-gold/20 mx-auto mb-6" />
              <h3 className="font-playfair text-2xl text-white mb-4">No Properties Found</h3>
              <p className="text-white/50 max-w-md mx-auto">
                No investment properties match your current filters. 
                Try adjusting your search criteria or contact us for exclusive off-market opportunities.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
