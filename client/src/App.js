import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BloodRequest from "./pages/BloodRequest";
import MakeDonation from "./pages/MakeDonation";
import RequestList from "./pages/RequestList";
import RecentDonation from "./pages/RecentDonation";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<BloodRequest />} />
        <Route path="/donate" element={<MakeDonation />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/donations" element={<RecentDonation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;