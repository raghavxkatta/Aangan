import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Surprise from "./pages/Surprise";
import { ThemeProvider } from "./context/ThemeContext";
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-beige text-maroon dark:bg-gray-900 dark:text-beige">
          <Navbar />
          <main className="p-4 sm:p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/surprise" element={<Surprise />} />
            </Routes>
          </main>
          <footer className="text-center p-4 text-sm text-mustard">
            Built by Binary Brains @ BrandIT 2.0
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
