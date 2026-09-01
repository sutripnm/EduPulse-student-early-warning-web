import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentListPage from "./pages/StudentListPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/student-list" element={<StudentListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;