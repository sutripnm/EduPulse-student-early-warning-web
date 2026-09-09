function DashboardHeader() {
  return (
    <header className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h1 className="mb-2">Dashboard</h1>
      </div>

      <div className="d-flex align-items-center gap-2">
        <div className="text-end">
          <p className="mb-0 fw-semibold">Agus</p>
          <small className="text-secondary">Guru</small>
        </div>

        <span className="fs-2">●</span>
      </div>
    </header>
  );
}

export default DashboardHeader;
