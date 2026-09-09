function ThemeCard({ theme, setTheme }) {
  return (
    <section className="settings-card mb-4">
      <div className="mb-4">
        <h5 className="fw-bold mb-1">🎨 Tampilan</h5>
        <p className="text-secondary mb-0">
          Atur tampilan aplikasi sesuai preferensi.
        </p>
      </div>

      <div>
        <label className="form-label fw-semibold">Tema</label>
        <div className="d-flex gap-3">
          <button
            type="button"
            className={`btn ${theme === "light" ? "btn-primary" : "btn-outline-dark"}`}
            onClick={() => setTheme("light")}
          >
            ☀ Light
          </button>

          <button
            type="button"
            className={`btn ${theme === "dark" ? "btn-primary" : "btn-outline-dark"}`}
            onClick={() => setTheme("dark")}
          >
            🌙 Dark
          </button>
        </div>
      </div>
    </section>
  );
}

export default ThemeCard;
