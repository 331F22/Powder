import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import App from "./components/App/App";
import PageNavbar from "./NavBar/PageNavBar";



export default function LoadPage() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="Admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoadPage />);