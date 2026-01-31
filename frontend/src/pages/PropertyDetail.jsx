import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, TrendingUp, ArrowLeft, Check, Building2, Calendar, Share2 } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL + "/api";

const defaultImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
];

function formatPrice(price) {
  if (price >= 1000000) {
    return "AED " + (price / 1000000).toFixed(2) + "M";
  }
  return "AED " + price.toLocaleString();
}

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(function() {
    async function fetchProperty() {
      try {
        const response = await axios.get(API + "/properties/" + id);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
        <Building2 size={64} className="text-gold/20 mb-6" />
        <h2 className="font-playfair text-3xl text-white mb-4">Property Not Found</h2>
        <p className="text-white/50 mb-8">The property you are looking for does not exist or has been removed.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 ? property.images : defaultImages;
  const backLink = property.property_type === "investment" ? "/investment" : "/residential";
  const backText = property.property_type === "investment" ? "Investment" : "Residential";

  return (
    <div data-testid="property-detail-page" className="min-h-screen pt-24 md:pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
        <Link to={backLink} data-testid="back-to-listings" className="inline-flex items-center gap-2 text-gold hover:text-gold-hover transition-colors text-sm">
          <ArrowLeft size={16} />
          Back to {backText} Properties
        </Link>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative aspect-[16/10] overflow-hidden">
            <img src={images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold ${property.status === "available" ? "bg-gold text-black" : property.status === "pending" ? "bg-white/20 text-white backdrop-blur-sm" : "bg-red-500/80 text-white"}`}>
                {property.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
            {images.slice(0, 3).map(function(img, index) {
              return (
                <button key={index} onClick={function() { setActiveImage(index); }} className={`aspect-[16/10] overflow-hidden border-2 transition-all ${activeImage === index ? "border-gold" : "border-transparent hover:border-gold/50"}`}>
                  <img src={img} alt={"View " + (index + 1)} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-gold/10 text-gold border border-gold/20">
                  {property.property_type}
                </span>
                {property.property_type === "investment" && property.roi && (
                  <span className="flex items-center gap-1 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-gold text-black">
                    <TrendingUp size={12} />
                    {property.roi}% ROI
                  </span>
                )}
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={18} className="text-gold" />
                <span>{property.area}, {property.location}</span>
              </div>
            </div>

            <div className="mb-8 p-6 glass">
              <p className="text-xs uppercase tracking-wider text-gold mb-2">Price</p>
              <p className="font-playfair text-4xl md:text-5xl text-white">{formatPrice(property.price)}</p>
              {property.property_type === "investment" && property.rental_yield && (
                <p className="text-white/60 mt-2">Estimated Rental Yield: <span className="text-gold">{property.rental_yield}%</span></p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass p-4 text-center">
                <Bed size={24} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-white text-lg font-medium">{property.bedrooms}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Bedrooms</p>
              </div>
              <div className="glass p-4 text-center">
                <Bath size={24} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-white text-lg font-medium">{property.bathrooms}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Bathrooms</p>
              </div>
              <div className="glass p-4 text-center">
                <Maximize size={24} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-white text-lg font-medium">{property.sqft.toLocaleString()}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Sq Ft</p>
              </div>
              <div className="glass p-4 text-center">
                <Calendar size={24} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-white text-lg font-medium">2024</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Year</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-playfair text-2xl text-white mb-4">Description</h3>
              <p className="text-white/70 font-light leading-relaxed">{property.description}</p>
            </div>

            {property.features && property.features.length > 0 && (
              <div>
                <h3 className="font-playfair text-2xl text-white mb-4">Features and Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map(function(feature, index) {
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <Check size={16} className="text-gold flex-shrink-0" />
                        <span className="text-white/70">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="glass p-8 sticky top-32">
              <h3 className="font-playfair text-2xl text-white mb-6">Interested?</h3>
              <p className="text-white/60 font-light mb-8">Contact us to schedule a viewing or learn more about this property.</p>
              <Link to="/contact" data-testid="contact-for-property" className="btn-primary w-full text-center block mb-4">Contact Us</Link>
              <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold hover:text-black" onClick={function() { navigator.clipboard.writeText(window.location.href); }}>
                <Share2 size={16} className="mr-2" />
                Share Property
              </Button>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Contact Email</p>
                <a href="mailto:realestate@redsandgcc.com" className="text-gold hover:text-gold-hover transition-colors">realestate@redsandgcc.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
