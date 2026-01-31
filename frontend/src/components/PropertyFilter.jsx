import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function PropertyFilter({ onFilterChange, propertyType }) {
  const [areas, setAreas] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    area: "all",
    bedrooms: "any",
    minPrice: "none",
    maxPrice: "none",
  });

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${API}/areas`);
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Build query params
    const params = {};
    if (propertyType) params.property_type = propertyType;
    if (newFilters.area && newFilters.area !== "all") params.area = newFilters.area;
    if (newFilters.bedrooms && newFilters.bedrooms !== "any") params.bedrooms = parseInt(newFilters.bedrooms);
    if (newFilters.minPrice && newFilters.minPrice !== "none") params.min_price = parseFloat(newFilters.minPrice);
    if (newFilters.maxPrice && newFilters.maxPrice !== "none") params.max_price = parseFloat(newFilters.maxPrice);
    
    onFilterChange(params);
  };

  const clearFilters = () => {
    setFilters({
      area: "all",
      bedrooms: "any",
      minPrice: "none",
      maxPrice: "none",
    });
    onFilterChange(propertyType ? { property_type: propertyType } : {});
  };

  const hasActiveFilters = 
    filters.area !== "all" || 
    filters.bedrooms !== "any" || 
    filters.minPrice !== "none" || 
    filters.maxPrice !== "none";

  return (
    <div data-testid="property-filter" className="mb-12">
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="w-full border-gold/30 text-gold hover:bg-gold hover:text-black"
          data-testid="filter-toggle"
        >
          <SlidersHorizontal size={16} className="mr-2" />
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter Container */}
      <div
        className={`glass p-6 transition-all duration-300 ${
          isExpanded ? "block" : "hidden lg:block"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Area Filter */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
              Area
            </label>
            <Select
              value={filters.area}
              onValueChange={(value) => handleFilterChange("area", value)}
            >
              <SelectTrigger
                data-testid="filter-area"
                className="bg-transparent border-white/20 text-white focus:ring-gold"
              >
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-gold/20">
                <SelectItem value="all">All Areas</SelectItem>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms Filter */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
              Bedrooms
            </label>
            <Select
              value={filters.bedrooms}
              onValueChange={(value) => handleFilterChange("bedrooms", value)}
            >
              <SelectTrigger
                data-testid="filter-bedrooms"
                className="bg-transparent border-white/20 text-white focus:ring-gold"
              >
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-gold/20">
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4 Bedrooms</SelectItem>
                <SelectItem value="5">5+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
              Min Price (AED)
            </label>
            <Select
              value={filters.minPrice}
              onValueChange={(value) => handleFilterChange("minPrice", value)}
            >
              <SelectTrigger
                data-testid="filter-min-price"
                className="bg-transparent border-white/20 text-white focus:ring-gold"
              >
                <SelectValue placeholder="No Min" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-gold/20">
                <SelectItem value="none">No Min</SelectItem>
                <SelectItem value="500000">500K</SelectItem>
                <SelectItem value="1000000">1M</SelectItem>
                <SelectItem value="2000000">2M</SelectItem>
                <SelectItem value="5000000">5M</SelectItem>
                <SelectItem value="10000000">10M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
              Max Price (AED)
            </label>
            <Select
              value={filters.maxPrice}
              onValueChange={(value) => handleFilterChange("maxPrice", value)}
            >
              <SelectTrigger
                data-testid="filter-max-price"
                className="bg-transparent border-white/20 text-white focus:ring-gold"
              >
                <SelectValue placeholder="No Max" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-gold/20">
                <SelectItem value="none">No Max</SelectItem>
                <SelectItem value="1000000">1M</SelectItem>
                <SelectItem value="2000000">2M</SelectItem>
                <SelectItem value="5000000">5M</SelectItem>
                <SelectItem value="10000000">10M</SelectItem>
                <SelectItem value="20000000">20M</SelectItem>
                <SelectItem value="50000000">50M+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <div>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                className="w-full text-gold hover:text-white hover:bg-gold/10"
                data-testid="clear-filters"
              >
                <X size={16} className="mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
