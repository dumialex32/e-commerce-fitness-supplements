import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <>
      <Header />

      <main className="container mx-auto py-8 min-h-lvh">
        <ToastContainer />
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default App;
