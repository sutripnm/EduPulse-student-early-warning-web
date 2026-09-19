import Sidebar from "../components/Sidebar";
import "../styles/settings-page.css";
import useSettings from "../hooks/useSettings";
import useTheme from "../hooks/useTheme";
import ProfileCard from "../components/settings/ProfileCard";
import SchoolSettingsCard from "../components/settings/SchoolSettingsCard";
import ThemeCard from "../components/settings/ThemeCard";

function SettingsPage() {
  // Data user + tahun ajaran/semester aktif (read-only di halaman ini),
  // plus status loading/error dari fetch-nya.
  const {
    user,
    activeTahunAjaran,
    activeSemester,
    loading,
    error,
  } = useSettings();

  // Preferensi tema (light/dark), disimpan terpisah dari useSettings
  // karena sifatnya murni preferensi tampilan, bukan data dari server.
  const { theme, setTheme } = useTheme();


  const isAdmin =
  String(user?.role || "").toUpperCase() === "ADMIN";

  // Selagi data pengaturan masih di-fetch, tampilkan loading dulu
  // sebelum konten utama dirender.
  if (loading) {
    return (
      <main className="settings-page d-flex">
        <Sidebar />

        <section className="settings-main flex-grow-1 p-4">
          <p>Loading...</p>
        </section>
      </main>
    );
  }

  // Kalau fetch gagal, tampilkan pesan error dan hentikan render di sini
  // (jangan lanjut ke JSX utama yang butuh data user/tahun ajaran).
  if (error) {
    return (
      <main className="settings-page d-flex">
        <Sidebar />

        <section className="settings-main flex-grow-1 p-4">
          <p className="text-danger">
            Gagal mengambil data pengaturan.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="settings-page d-flex">
      <Sidebar />

      <section className="settings-main flex-grow-1 p-4">
        <header className="mb-4">
          <p className="text-secondary mb-1">
            System Management
          </p>

          <h1 className="h3 fw-bold mb-1">
            Pengaturan
          </h1>

          <p className="text-secondary mb-0">
            Kelola akun, sekolah, dan tampilan EduPulse.
          </p>
        </header>

        <div className="settings-container">
          <ProfileCard user={user} />

          <SchoolSettingsCard
            activeTahunAjaran={activeTahunAjaran}
            activeSemester={activeSemester}
            isAdmin={isAdmin}
          />

          <ThemeCard
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </section>
    </main>
  );
}

export default SettingsPage;