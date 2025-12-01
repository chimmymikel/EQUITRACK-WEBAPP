import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";

const App = () => {
  return(
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/category" element={<Category />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/landingpage" />
  );
}

export default App;