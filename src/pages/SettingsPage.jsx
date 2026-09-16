import Sidebar from "../components/Sidebar";
import "../styles/settings-page.css";
import useSettings from "../hooks/useSettings";
import ProfileCard from "../components/settings/ProfileCard";
import SchoolSettingsCard from "../components/settings/SchoolSettingsCard";
import ThemeCard from "../components/settings/ThemeCard";

function SettingsPage() {
  const {
    user,
    activeTahunAjaran,
    activeSemester,
    loading,
    error,
  } = useSettings();

  const theme =
    localStorage.getItem("theme") || "light";

  const setTheme = (value) => {
    localStorage.setItem("theme", value);

    document.documentElement.setAttribute(
      "data-theme",
      value
    );
  };

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
            activeTahunAjaran={
              activeTahunAjaran
            }
            activeSemester={
              activeSemester
            }
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