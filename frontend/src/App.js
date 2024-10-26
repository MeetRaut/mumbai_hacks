
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUpIn from "./Pages/SignInUp";
import Aboutus from "./Pages/About";
import UserSignUp from "./Pages/UserSignUp";
import UserLogin from "./Pages/UserLogin";
import GovernmentSignUp from "./Pages/GovernmentSignUp";
import GovernmentLogin from "./Pages/GovernmentLogin";
import ContactUs from "./Pages/ContactUs";
import ReportIssue from "./Pages/ReportAbuse";
import ViewIssues from "./Pages/ViewIssues";
import ViewUnsafeAreas from "./Pages/ReportAbuse";
import CreatePolicy from "./Pages/CreatePolicy";
import Community from "./Pages/Community";
import VirtualSafeZone from "./Pages/VirtualSafeZone";
import AudioRecorder from "./Pages/AudioRecorder";
import SentimentAnalysis from "./Pages/SentimentAnalysis";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<Aboutus />} />
      <Route path="/Contact" element={<ContactUs />} />
      
      {/* User paths */}
      <Route path="/User/UserSignUp" element={<UserSignUp />} />
      <Route path="/User/UserLogin" element={<UserLogin />} />
      <Route path="/User/ReportAbuse" element={<ViewUnsafeAreas/>}/>
      <Route path="/User/Community" element={<Community/>}/>
      <Route path="/safe" element={<VirtualSafeZone />} />
      <Route path="/voice" element={<AudioRecorder />} />
      <Route path="/sentiment" element={<SentimentAnalysis />} />




      {/* User paths */}

      {/* Government paths */}
   
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
