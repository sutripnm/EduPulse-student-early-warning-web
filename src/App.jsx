import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardSiswaPage from "./pages/DashboardSiswaPage";
import DashboardOrtuPage from "./pages/DashboardOrtuPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard-siswa/:nisn" element={<DashboardSiswaPage />} />
        <Route path="/dashboard-ortu/:nisn" element={<DashboardOrtuPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
