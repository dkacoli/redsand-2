import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, TrendingUp } from "lucide-react";

export default function PropertyCard({ property, index = 0 }) {
  const {
    id,
    title,
    price,
    location,
    area,
    bedrooms,
    bathrooms,
    sqft,
    property_type,
    status,
    images,
    roi,
  } = property;

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`;
    }
    return `AED ${price.toLocaleString()}`;
  };

  const defaultImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";

  return (
    <Link
      to={`/property/${id}`}
      data-testid={`property-card-${id}`}
      className={`property-card group relative overflow-hidden bg-dark-surface border border-white/5 hover:border-gold/30 transition-all duration-500 block animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={images?.[0] || defaultImage}
          alt={title}
          className="property-card-image w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            data-testid={`property-status-${id}`}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold ${
              status === "available"
                ? "bg-gold text-black"
                : status === "pending"
                ? "bg-white/20 text-white backdrop-blur-sm"
                : "bg-red-500/80 text-white"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-black/50 text-white backdrop-blur-sm">
            {property_type}
          </span>
        </div>

        {/* ROI for Investment Properties */}
        {property_type === "investment" && roi && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-gold/90 text-black text-xs font-semibold">
            <TrendingUp size={12} />
            <span>{roi}% ROI</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-3">
          <span className="text-gold font-playfair text-2xl md:text-3xl font-medium">
            {formatPrice(price)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-playfair text-lg md:text-xl text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
          <MapPin size={14} className="text-gold" />
          <span>{area}, {location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-6 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Bed size={16} strokeWidth={1.5} />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Bath size={16} strokeWidth={1.5} />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Maximize size={16} strokeWidth={1.5} />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
