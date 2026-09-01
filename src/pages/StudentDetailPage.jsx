import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/student-detail-page.css";

const studentData = {
  1: {
    nis: "2023001",
    name: "Ahmad Rizky",
    className: "X IPA 1",
    gender: "Laki-laki",

    attendance: 68,
    score: 60.02,
    taskScore: 50,
    studyHour: 5,

    risk: "Tinggi",

    riskFactors: [
      "Absensi di bawah batas 70%.",
      "Nilai Matematika & Fisika < KKM.",
    ],

    recommendations: [
      "Terbitkan Surat Pemberitahuan Wali.",
      "Jadwalkan konseling individu (BK).",
    ],
  },

  2: {
    nis: "2023002",
    name: "Siti Aisyah",
    className: "X IPA 2",
    gender: "Perempuan",

    attendance: 68,
    score: 61,
    taskScore: 55,
    studyHour: 6,

    risk: "Tinggi",

    riskFactors: [
      "Absensi di bawah batas 70%.",
      "Nilai tugas masih rendah.",
    ],

    recommendations: [
      "Jadwalkan konseling individu (BK).",
      "Berikan pendampingan belajar.",
    ],
  },
};

function StudentDetailPage() {
  const { id } = useParams();

  const student = studentData[id];

  return (
    <main className="student-detail-page d-flex">

      <Sidebar />

      <section className="student-detail-main flex-grow-1 p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h1 className="h4 fw-bold mb-1">
              Detail Profil Siswa & Analisis Risiko
            </h1>

            <p className="text-secondary mb-0">
              Informasi siswa dan hasil analisis risiko
            </p>
          </div>

          <Link
            to="/student-list"
            className="btn btn-outline-dark"
          >
            ← Kembali
          </Link>

        </div>


        {/* ========================= */}
        {/* PROFIL SISWA */}
        {/* ========================= */}

        <section className="student-profile-info mb-4">

          <div className="student-info-item">
            Nama Siswa
          </div>

          <div className="student-info-item">
            NIS
          </div>

          <div className="student-info-item">
            Kelas
          </div>

        </section>


        {/* ========================= */}
        {/* METRIK SISWA */}
        {/* ========================= */}

        <section className="student-metrics mb-3">

          {/* Kehadiran */}
          <div className="metric-card">

            <span>
              Kehadiran
            </span>

            <strong>
              {student.attendance}%
            </strong>

          </div>


          {/* Rata-rata Nilai */}
          <div className="metric-card">

            <span>
              Rata-rata Nilai
            </span>

            <strong>
              {student.score}
            </strong>

          </div>


          {/* Nilai Tugas */}
          <div className="metric-card">

            <span>
              Rata-rata Nilai Tugas
            </span>

            <strong>
              {student.taskScore}
            </strong>

          </div>


          {/* Study Hour */}
          <div className="metric-card">

            <span>
              Study Hour
            </span>

            <strong>
              {student.studyHour} Jam
            </strong>

          </div>


          {/* Risk */}
          <div className="metric-card metric-risk">

            <span>
              Result Status Risk
            </span>

            <strong>
              {student.risk}
            </strong>

          </div>

        </section>


        {/* ========================= */}
        {/* INDIKATOR */}
        {/* ========================= */}

        <p className="fw-semibold mb-2">
          📊 Indikator Metrik Utama Siswa
        </p>


        <section className="risk-analysis-card">

          {/* Faktor Risiko */}
          <div className="risk-analysis-section">

            <h6 className="fw-semibold">
              🚨 Tingkat Risiko: {student.risk} (High Risk)
            </h6>

            <h6 className="fw-semibold mt-3">
              📌 Faktor Penentu ML:
            </h6>

            <ol className="mb-0">

              {student.riskFactors.map((factor, index) => (
                <li key={index}>
                  {factor}
                </li>
              ))}

            </ol>

          </div>


          {/* Rekomendasi */}
          <div className="risk-analysis-section">

            <h6 className="fw-semibold">
              💡 Rekomendasi Tindakan
            </h6>

            <ul className="mb-0">

              {student.recommendations.map(
                (recommendation, index) => (
                  <li key={index}>
                    {recommendation}
                  </li>
                )
              )}

            </ul>

          </div>

        </section>

      </section>

    </main>
  );
}

export default StudentDetailPage;