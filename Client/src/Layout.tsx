import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky z-50 top-0 left-0">
        <Navbar />
      </header>
      <div className="flex-1">
        <Outlet/>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
