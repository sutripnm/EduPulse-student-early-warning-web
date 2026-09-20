import {
  BsCalendarWeek,
  BsClipboardCheck,
} from "react-icons/bs";

import Sidebar from "../components/Sidebar";

import "../styles/dashboard-siswa-page.css";

import useStudentDashboard from "../hooks/useStudentDashboard";

import { getRiskLabel } from "../utils/risk";

import { lastValue } from "../utils/dashboardNormalize";

const HARI_LIST = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
];

/** Menampilkan halaman DashboardSiswa EduPulse. */
function DashboardSiswaPage() {
  const {
    studentNisn,
    selectedMapel,
    setSelectedMapel,
    dashboard,
    riskMapelOptions,
    loading,
    isDummy,
  } = useStudentDashboard();

  const statusRisk =
    dashboard?.status_risk;

  const rekomendasi =
    dashboard?.rekomendasi || [];

  const absensiHarian =
    dashboard?.absensi_harian || [];

  return (
    <main className="dashboard-siswa-page d-flex">

      <Sidebar />

      <section className="dashboard-siswa-main flex-grow-1 p-4">

        {/* =========================
            HEADER
            ========================= */}

        <header className="mb-4">

          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">

            <div>
              <h1 className="h4 fw-bold mb-1">
                Dashboard Siswa
              </h1>

              <p className="text-secondary mb-0">
                Ringkasan performa belajar minggu lalu
              </p>
            </div>

            {isDummy && (
              <span className="badge bg-secondary">
                Data contoh — API belum tersambung
              </span>
            )}
          </div>

          {/* =========================
              MAPEL
              ========================= */}

          <div className="mt-3">

            <label className="small fw-semibold d-block mb-2">
              Mata Pelajaran
            </label>

            <div className="d-flex flex-wrap gap-2">

              {riskMapelOptions.length > 0 ? (
                riskMapelOptions.map(
                  (mapel) => {

                    const status =
                      String(
                        mapel.status_risiko ||
                          ""
                      ).toUpperCase();

                    const isSelected =
                      selectedMapel ===
                      String(mapel.id);

                    let riskClass =
                      "mapel-risk-low";

                    if (
                      status === "HIGH" ||
                      status === "TINGGI"
                    ) {
                      riskClass =
                        "mapel-risk-high";
                    } else if (
                      status === "MEDIUM" ||
                      status === "SEDANG"
                    ) {
                      riskClass =
                        "mapel-risk-medium";
                    }

                    return (
                      <button
                        key={mapel.id}
                        type="button"
                        className={`btn mapel-risk-button ${riskClass} ${
                          isSelected
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedMapel(
                            String(
                              mapel.id
                            )
                          )
                        }
                      >
                        {mapel.nama_mapel}
                      </button>
                    );
                  }
                )
              ) : (
                <span className="small text-secondary">
                  Data mata pelajaran belum tersedia.
                </span>
              )}

            </div>
          </div>

        </header>

        {/* =========================
            PROFILE SISWA
            ========================= */}

        <section className="dashboard-siswa-box d-flex align-items-center flex-wrap gap-3 mb-4">

          <div className="d-flex gap-2 flex-wrap">

            {/* NISN */}
            <div className="siswa-profile-chip">
              <small>NISN</small>

              <strong>
                {dashboard?.profil?.nisn ||
                  studentNisn ||
                  "-"}
              </strong>
            </div>

            {/* NAMA */}
            <div className="siswa-profile-chip">
              <small>Nama</small>

              <strong>
                {dashboard?.profil?.nama ||
                  "-"}
              </strong>
            </div>

            {/* KELAS */}
            <div className="siswa-profile-chip">
              <small>Kelas</small>

              <strong>
                {dashboard?.profil?.kelas ||
                  "-"}
              </strong>
            </div>

            {/* RISIKO */}
            {!loading && (
              <div
                className={`siswa-profile-chip ${
                  String(
                    statusRisk || ""
                  ).toLowerCase() ===
                    "high" ||
                  String(
                    statusRisk || ""
                  ).toLowerCase() ===
                    "tinggi"
                    ? "risk-high"
                    : String(
                        statusRisk || ""
                      ).toLowerCase() ===
                        "medium" ||
                      String(
                        statusRisk || ""
                      ).toLowerCase() ===
                        "sedang"
                    ? "risk-medium"
                    : String(
                        statusRisk || ""
                      ).toLowerCase() ===
                        "low" ||
                      String(
                        statusRisk || ""
                      ).toLowerCase() ===
                        "rendah"
                    ? "risk-low"
                    : ""
                }`}
              >
                <small>
                  Label Risiko
                </small>

                <strong>
                  {getRiskLabel(
                    statusRisk
                  )}
                </strong>
              </div>
            )}

          </div>

        </section>

        {/* =========================
            LOADING
            ========================= */}

        {loading && (
          <p>
            Memuat ringkasan...
          </p>
        )}

        {!loading && (
          <>

            {/* =========================
                RINGKASAN
                ========================= */}

            <h6 className="fw-semibold mb-3">
              <BsCalendarWeek className="me-2" />
              Ringkasan Minggu Lalu
            </h6>

            <section className="row g-3 mb-4">

              {/* ABSENSI */}

              <div className="col-md-4">

                <div className="dashboard-siswa-box h-100">

                  <p className="small text-secondary mb-2">
                    Absen (Senin - Jumat)
                  </p>

                  <div className="d-flex gap-2 flex-wrap">

                    {HARI_LIST.map(
                      (hari) => {

                        const data =
                          absensiHarian.find(
                            (item) =>
                              item.hari ===
                              hari
                          );

                        const status =
                          data?.status ||
                          "-";

                        return (
                          <div
                            key={hari}
                            className={`absensi-chip absensi-${status.toLowerCase()}`}
                          >
                            <small>
                              {hari.slice(
                                0,
                                3
                              )}
                            </small>

                            <strong>
                              {status}
                            </strong>
                          </div>
                        );
                      }
                    )}

                  </div>
                </div>

              </div>

              {/* STUDY TIME */}

              <div className="col-md-4 col-6">

                <div className="dashboard-siswa-box h-100 text-center">

                  <p className="small text-secondary mb-1">
                    Study Time
                  </p>

                  <h3 className="fw-bold mb-0">
                    {lastValue(
                      dashboard?.study_time,
                      "jam"
                    )}

                    <span className="fs-6 fw-normal">
                      {" "}
                      jam
                    </span>
                  </h3>

                </div>

              </div>

              {/* PRETEST */}

              <div className="col-md-4 col-6">

                <div className="dashboard-siswa-box h-100 text-center">

                  <p className="small text-secondary mb-1">
                    Nilai Tugas 1 (Pretest)
                  </p>

                  <h3 className="fw-bold mb-0">
                    {lastValue(
                      dashboard?.tugas_pretest,
                      "nilai"
                    )}
                  </h3>

                </div>

              </div>

              {/* ASSESSMENT */}

              <div className="col-md-6 col-6">

                <div className="dashboard-siswa-box h-100 text-center">

                  <p className="small text-secondary mb-1">
                    Nilai Assessment
                  </p>

                  <h3 className="fw-bold mb-0">
                    {lastValue(
                      dashboard?.assessment,
                      "nilai"
                    )}
                  </h3>

                </div>

              </div>

              {/* POSTTEST */}

              <div className="col-md-6 col-6">

                <div className="dashboard-siswa-box h-100 text-center">

                  <p className="small text-secondary mb-1">
                    Nilai Tugas 2 (Posttest)
                  </p>

                  <h3 className="fw-bold mb-0">
                    {lastValue(
                      dashboard?.tugas_posttest,
                      "nilai"
                    )}
                  </h3>

                </div>

              </div>

            </section>

            {/* =========================
                REKOMENDASI
                ========================= */}

            <h6 className="fw-semibold mb-2">
              <BsClipboardCheck className="me-2" />
              Rekomendasi
            </h6>

            <section className="dashboard-siswa-box risk-recommendation-box mb-4">

              {rekomendasi.length > 0 ? (
                <ul className="mb-0">

                  {rekomendasi.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p className="mb-0">
                  Belum ada rekomendasi
                  untuk minggu ini.
                </p>
              )}

            </section>

          </>
        )}

      </section>

    </main>
  );
}

export default DashboardSiswaPage;
