import Sidebar from "../components/Sidebar";
import "../styles/input-nilai-dan-absensi.css";

import useAttendanceForm from "../hooks/useAttendanceForm";
import useScoreForm from "../hooks/useScoreForm";
import useTeachingFilters from "../hooks/useTeachingFilters";

import AttendanceSection from "../components/input-nilai/AttendanceSection";
import ScoreSection from "../components/input-nilai/ScoreSection";

/**
 * Menampilkan halaman input nilai dan absensi siswa.
 *
 * Data kelas dan mata pelajaran berasal dari useTeachingFilters
 * lalu digunakan bersama oleh form absensi dan form nilai.
 * Dengan cara ini, kedua form tidak melakukan request filter
 * yang sama secara terpisah.
 */
function InputNilaiAbsensiPage() {
  // Sumber filter kelas dan mata pelajaran yang digunakan
  // bersama oleh form absensi dan form nilai.
  const teachingFilters = useTeachingFilters();

  // Mengelola seluruh state dan handler form absensi.
  const attendanceForm = useAttendanceForm(teachingFilters);

  // Mengelola seluruh state dan handler form nilai.
  const scoreForm = useScoreForm(teachingFilters);

  return (
    <main className="input-nilai-page d-flex">
      <Sidebar />

      <section className="input-nilai-main flex-grow-1">
        <div className="input-nilai-container">
          {/* =================================================
              HEADER
              ================================================= */}
          <header className="input-page-header mb-4">
            <p className="text-secondary mb-1">
              Academic Management
            </p>

            <h1 className="h3 fw-bold mb-1">
              Input Nilai dan Absensi Siswa
            </h1>

            <p className="text-secondary mb-0">
              Input data absensi mingguan dan nilai pembelajaran siswa.
            </p>
          </header>

          {/* Menampilkan pesan jika filter kelas/mapel gagal diambil. */}
          {teachingFilters.error && (
            <div
              className="alert alert-danger mb-4"
              role="alert"
            >
              Gagal mengambil data kelas dan mata pelajaran.
            </div>
          )}

          {/* =================================================
              FORM INPUT
              
              Desktop  : 2 kolom
              Tablet/HP: 1 kolom
              ================================================= */}
          <div className="input-section-grid">
            {/* Form absensi hanya mengelola state absensi. */}
            <div className="input-section-column">
              <AttendanceSection
                attendanceClass={attendanceForm.attendanceClass}
                setAttendanceClass={
                  attendanceForm.setAttendanceClass
                }
                kelasOptions={attendanceForm.kelasOptions}
                mapelId={attendanceForm.mapelId}
                setMapelId={attendanceForm.setMapelId}
                mapelOptions={attendanceForm.mapelOptions}
                startDate={attendanceForm.startDate}
                setStartDate={attendanceForm.setStartDate}
                endDate={attendanceForm.endDate}
                setEndDate={attendanceForm.setEndDate}
                students={attendanceForm.students}
                attendance={attendanceForm.attendance}
                attendanceDates={attendanceForm.attendanceDates}
                attendanceSummary={attendanceForm.attendanceSummary}
                onAttendanceChange={
                  attendanceForm.handleAttendanceChange
                }
                onSubmit={
                  attendanceForm.handleAttendanceSubmit
                }
                loading={attendanceForm.loading}
              />
            </div>

            {/* Form nilai hanya mengelola state nilai siswa. */}
            <div className="input-section-column">
              <ScoreSection
                scoreClass={scoreForm.scoreClass}
                setScoreClass={scoreForm.setScoreClass}
                kelasOptions={scoreForm.kelasOptions}
                subject={scoreForm.subject}
                setSubject={scoreForm.setSubject}
                mapelOptions={scoreForm.mapelOptions}
                scoreDate={scoreForm.scoreDate}
                setScoreDate={scoreForm.setScoreDate}
                students={scoreForm.students}
                scores={scoreForm.scores}
                onScoreChange={scoreForm.handleScoreChange}
                onSubmit={scoreForm.handleScoreSubmit}
                loading={scoreForm.loading}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default InputNilaiAbsensiPage;