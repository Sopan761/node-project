import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EventConsulting from "./components/servicepages/EventConsulting";
import EventProduction from "./components/servicepages/EventProduction";
import AudiovisualHire from "./components/servicepages/AudiovisualHire";
import ProductionServices from "./components/servicepages/ProductionServices";
import PostProductionFilming from "./components/servicepages/PostProductionFilming";
import TechnicalSupport from "./components/servicepages/TechnicalSupport";
import SimultaneousInterpretation from "./components/servicepages/SimultaneousInterpretation";
import OurProducts from "./components/OurProducts";
import ContactUs from "./components/ContactUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import "./App.css";
import Admin from "./components/Admin/Admin";

const App = () => {
  const location = useLocation();

  // Add any route here where the Footer should be hidden
  const hideFooterRoutes = ["/Contactus","/passwordAdmin"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  const hideNavbarRoutes=["/passwordAdmin"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/event-consulting" element={<EventConsulting />} />
        <Route path="/services/audiovisual-Hire" element={<AudiovisualHire />} />
        <Route path="/services/eventProduction" element={<EventProduction />} />
        <Route path="/services/productionServices" element={<ProductionServices />} />
        <Route path="/services/postProductionFilming" element={<PostProductionFilming />} />
        <Route path="/services/technicalSupport" element={<TechnicalSupport />} />
        <Route path="/services/simultaneousInterpretation" element={<SimultaneousInterpretation />} />
        <Route path="/OurProducts" element={<OurProducts />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/passwordAdmin" element={<Admin />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;
