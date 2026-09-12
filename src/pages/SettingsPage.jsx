import Sidebar from "../components/Sidebar";
import "../styles/settings-page.css";
import useSettings from "../hooks/useSettings";
import ProfileCard from "../components/settings/ProfileCard";
import SchoolSettingsCard from "../components/settings/SchoolSettingsCard";
import ThemeCard from "../components/settings/ThemeCard";

function SettingsPage() {
  const {
    profile,
    school,
    handleSchoolChange,
    handleSchoolSubmit,
    risk,
    handleRiskChange,
    handleRiskSubmit,
    theme,
    setTheme,
  } = useSettings();

  return (
    <main className="settings-page d-flex">
      <Sidebar />

      <section className="settings-main flex-grow-1 p-4">
        <header className="mb-4">
          <p className="text-secondary mb-1">System Management</p>
          <h1 className="h3 fw-bold mb-1">Pengaturan</h1>
          <p className="text-secondary mb-0">
            Kelola akun, sekolah, risiko, dan tampilan EduPulse.
          </p>
        </header>

        <div className="settings-container">
          <ProfileCard profile={profile} />

          <SchoolSettingsCard
            school={school}
            onChange={handleSchoolChange}
            onSubmit={handleSchoolSubmit}
          />

          <ThemeCard theme={theme} setTheme={setTheme} />
        </div>
      </section>
    </main>
  );
}

export default SettingsPage;
