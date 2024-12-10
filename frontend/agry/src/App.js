import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppContext";  // Import the AppProvider
import "./App.css";

// Importing components
import Home from "./components/Home";
import Sell from "./components/Sell";
import Buy from "./components/Buy";
import Info from "./components/Info";
import Cart from "./components/Cart";
import Bill from "./components/Bill";
import ThankYou from "./components/Thankyou";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/Contact";

function App() {
  return (
    <AppProvider>  {/* Wrap the app with AppProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/info/:category/:name" element={<Info />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>} />

        </Routes>
      </Router>
    
    </AppProvider>
  );
}

export default App;
