import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentListPage from "./pages/StudentListPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import AddStudentPage from "./pages/AddStudentPage";
import InputNilaiAbsensiPage from "./pages/InputNilaiAbsensiPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/student-list"
          element={<StudentListPage />}
        />

        <Route
          path="/detail-siswa/:id"
          element={<StudentDetailPage />}
        />

        <Route
          path="/tambah-siswa"
          element={<AddStudentPage />}
        />

        <Route
          path="/input-nilai-dan-absensi"
          element={<InputNilaiAbsensiPage />}
        />

        <Route
          path="/pengaturan"
          element={<SettingsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;