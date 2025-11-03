import { BrowserRouter, Route, Routes } from "react-router-dom";
import Income from "./pages/Income";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const App = () => {

  return(
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
            <Route path = "/dashboard" element={<Home />} />
            <Route path = "/income" element={<Income />} />
            <Route path = "/expense" element={<Expense />} />
            <Route path = "/category" element={<Category />} />
            <Route path = "/filter" element={<Filter />} />
            <Route path = "/login" element={<Login />} />
            <Route path = "/signup" element={<Signup />} />
            <Route path = "/aboutus" element={<AboutUs />} />
            <Route path = "/contactus" element={<ContactUs />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;