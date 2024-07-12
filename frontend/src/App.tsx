import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Header />

      <main className="container mx-auto py-12 min-h-lvh">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default App;