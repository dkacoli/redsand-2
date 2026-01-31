import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Home from "@/pages/Home";
import InvestmentProperties from "@/pages/InvestmentProperties";
import ResidentialProperties from "@/pages/ResidentialProperties";
import PropertyDetail from "@/pages/PropertyDetail";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

// Layout Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="App min-h-screen bg-dark">
      <div className="noise-overlay"></div>
      <BrowserRouter>
        <Routes>
          {/* Admin routes without navbar/footer */}
          <Route path="/admin/*" element={<Admin />} />
          
          {/* Public routes with navbar/footer */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/investment" element={<InvestmentProperties />} />
                    <Route path="/residential" element={<ResidentialProperties />} />
                    <Route path="/property/:id" element={<PropertyDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
