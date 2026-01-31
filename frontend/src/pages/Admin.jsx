import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, MessageSquare, Plus, Edit, Trash2,
  Menu, X, LogOut, TrendingUp, Home, Users, Eye
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_e52b6fc9-8e43-4b5f-917f-6f93474b6661/artifacts/bif9mvec_logo1212.png";

// Admin Sidebar Component
function AdminSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Building2, label: "Properties", path: "/admin/properties" },
    { icon: MessageSquare, label: "Inquiries", path: "/admin/inquiries" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-dark-surface border-r border-gold/10 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-gold/10">
          <Link to="/" className="block">
            <img src={LOGO_URL} alt="REDSAND" className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 mb-1 transition-colors ${
                location.pathname === item.path
                  ? "text-gold bg-gold/5"
                  : "text-white/60 hover:text-gold hover:bg-gold/5"
              }`}
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-gold transition-colors"
          >
            <Eye size={18} strokeWidth={1.5} />
            <span className="text-sm">View Site</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

// Dashboard Component
function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div data-testid="admin-dashboard">
      <h1 className="font-playfair text-3xl text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Building2, label: "Total Properties", value: stats?.total_properties || 0 },
          { icon: TrendingUp, label: "Investment", value: stats?.investment_count || 0 },
          { icon: Home, label: "Residential", value: stats?.residential_count || 0 },
          { icon: MessageSquare, label: "Inquiries", value: stats?.total_inquiries || 0 },
        ].map((stat) => (
          <div key={stat.label} className="glass p-6">
            <stat.icon className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
            <p className="font-playfair text-3xl text-white mb-1">{stat.value}</p>
            <p className="text-xs uppercase tracking-wider text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass p-6">
        <h2 className="font-playfair text-xl text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link to="/admin/properties" className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} />
            Add Property
          </Link>
          <Link to="/admin/inquiries" className="btn-outline inline-flex items-center gap-2">
            View Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}

// Properties Management Component
function PropertiesManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "Dubai",
    area: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    property_type: "investment",
    status: "available",
    features: "",
    images: "",
    roi: "",
    rental_yield: "",
  });

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API}/properties`);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "Dubai",
      area: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      property_type: "investment",
      status: "available",
      features: "",
      images: "",
      roi: "",
      rental_yield: "",
    });
    setEditingProperty(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        sqft: parseFloat(formData.sqft),
        features: formData.features ? formData.features.split(",").map((f) => f.trim()) : [],
        images: formData.images ? formData.images.split(",").map((i) => i.trim()) : [],
        roi: formData.roi ? parseFloat(formData.roi) : null,
        rental_yield: formData.rental_yield ? parseFloat(formData.rental_yield) : null,
      };

      if (editingProperty) {
        await axios.put(`${API}/properties/${editingProperty.id}`, payload);
        toast.success("Property updated successfully");
      } else {
        await axios.post(`${API}/properties`, payload);
        toast.success("Property created successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProperties();
    } catch (error) {
      toast.error("Error saving property");
      console.error(error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price.toString(),
      location: property.location,
      area: property.area,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      sqft: property.sqft.toString(),
      property_type: property.property_type,
      status: property.status,
      features: property.features?.join(", ") || "",
      images: property.images?.join(", ") || "",
      roi: property.roi?.toString() || "",
      rental_yield: property.rental_yield?.toString() || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`${API}/properties/${id}`);
      toast.success("Property deleted successfully");
      fetchProperties();
    } catch (error) {
      toast.error("Error deleting property");
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`;
    return `AED ${price.toLocaleString()}`;
  };

  return (
    <div data-testid="admin-properties">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl text-white">Properties</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-hover" data-testid="add-property-btn">
              <Plus size={16} className="mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-surface border-gold/20 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-playfair text-2xl text-white">
                {editingProperty ? "Edit Property" : "Add New Property"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Property Title"
                required
                className="input-underline"
                data-testid="property-form-title"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                rows={3}
                className="input-underline resize-none"
                data-testid="property-form-description"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price (AED)"
                  required
                  className="input-underline"
                  data-testid="property-form-price"
                />
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Area (e.g., Dubai Marina)"
                  required
                  className="input-underline"
                  data-testid="property-form-area"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="Bedrooms"
                  required
                  className="input-underline"
                  data-testid="property-form-bedrooms"
                />
                <input
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="Bathrooms"
                  required
                  className="input-underline"
                  data-testid="property-form-bathrooms"
                />
                <input
                  name="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={handleChange}
                  placeholder="Sq Ft"
                  required
                  className="input-underline"
                  data-testid="property-form-sqft"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select value={formData.property_type} onValueChange={(v) => handleSelectChange("property_type", v)}>
                  <SelectTrigger className="bg-transparent border-white/20 text-white" data-testid="property-form-type">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-surface border-gold/20">
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.status} onValueChange={(v) => handleSelectChange("status", v)}>
                  <SelectTrigger className="bg-transparent border-white/20 text-white" data-testid="property-form-status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-surface border-gold/20">
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.property_type === "investment" && (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="roi"
                    type="number"
                    step="0.1"
                    value={formData.roi}
                    onChange={handleChange}
                    placeholder="ROI (%)"
                    className="input-underline"
                    data-testid="property-form-roi"
                  />
                  <input
                    name="rental_yield"
                    type="number"
                    step="0.1"
                    value={formData.rental_yield}
                    onChange={handleChange}
                    placeholder="Rental Yield (%)"
                    className="input-underline"
                    data-testid="property-form-yield"
                  />
                </div>
              )}
              <input
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Features (comma separated)"
                className="input-underline"
                data-testid="property-form-features"
              />
              <input
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="Image URLs (comma separated)"
                className="input-underline"
                data-testid="property-form-images"
              />
              <Button type="submit" className="w-full bg-gold text-black hover:bg-gold-hover" data-testid="property-form-submit">
                {editingProperty ? "Update Property" : "Create Property"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="animate-pulse">Loading...</div>
      ) : properties.length > 0 ? (
        <div className="glass overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80"}
                        alt={property.title}
                        className="w-12 h-12 object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{property.title}</p>
                        <p className="text-white/50 text-sm">{property.area}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`px-2 py-1 text-xs uppercase ${
                      property.property_type === "investment" ? "text-gold" : "text-white/70"
                    }`}>
                      {property.property_type}
                    </span>
                  </td>
                  <td className="text-white">{formatPrice(property.price)}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs uppercase ${
                      property.status === "available" ? "text-green-400" :
                      property.status === "pending" ? "text-yellow-400" : "text-red-400"
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="p-2 text-white/50 hover:text-gold transition-colors"
                        data-testid={`edit-property-${property.id}`}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-2 text-white/50 hover:text-red-400 transition-colors"
                        data-testid={`delete-property-${property.id}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass p-12 text-center">
          <Building2 size={48} className="text-gold/30 mx-auto mb-4" />
          <p className="text-white/50">No properties yet. Add your first property!</p>
        </div>
      )}
    </div>
  );
}

// Inquiries Management Component
function InquiriesManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(`${API}/inquiries`);
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await axios.delete(`${API}/inquiries/${id}`);
      toast.success("Inquiry deleted");
      fetchInquiries();
    } catch (error) {
      toast.error("Error deleting inquiry");
    }
  };

  return (
    <div data-testid="admin-inquiries">
      <h1 className="font-playfair text-3xl text-white mb-8">Inquiries</h1>

      {loading ? (
        <div className="animate-pulse">Loading...</div>
      ) : inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="glass p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-medium">{inquiry.name}</h3>
                  <p className="text-gold text-sm">{inquiry.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="p-2 text-white/50 hover:text-red-400 transition-colors"
                  data-testid={`delete-inquiry-${inquiry.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-white/70">{inquiry.message}</p>
              <p className="text-white/30 text-xs mt-4">
                {new Date(inquiry.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass p-12 text-center">
          <MessageSquare size={48} className="text-gold/30 mx-auto mb-4" />
          <p className="text-white/50">No inquiries yet.</p>
        </div>
      )}
    </div>
  );
}

// Main Admin Component
export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dark-surface border-b border-gold/10 z-30 flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-white hover:text-gold transition-colors"
          data-testid="admin-menu-toggle"
        >
          <Menu size={24} />
        </button>
        <span className="ml-4 text-white font-playfair">Admin Panel</span>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 md:p-12">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<PropertiesManagement />} />
            <Route path="inquiries" element={<InquiriesManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
