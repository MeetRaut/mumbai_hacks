
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

import CrimeAnalysisComp from "./components/crime/CrimeAnalysis";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<Aboutus />} />
      <Route path="/Contact" element={<ContactUs />} />
      
    

      {/* Government paths */}
      <Route path="/Government/GovernmentSignIn" element={<GovernmentSignUp />} />
      <Route path="/Government/GovernmentLogin" element={<GovernmentLogin />} />
      <Route path="/Government/ViewIssues" element={<ViewIssues/>}/>
      <Route path="/Government/CreatePolicy" element={<CreatePolicy/>}/>
      <Route path="/Government/CrimeAnalysis" element={<CrimeAnalysisComp/>}/>
      

      <Route path="/SignInUp" element={<SignUpIn />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
