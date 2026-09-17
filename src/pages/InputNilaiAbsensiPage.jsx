import Sidebar from "../components/Sidebar";
import "../styles/input-nilai-dan-absensi.css";
import useAttendanceForm from "../hooks/useAttendanceForm";
import useScoreForm from "../hooks/useScoreForm";
import AttendanceSection from "../components/input-nilai/AttendanceSection";
import ScoreSection from "../components/input-nilai/ScoreSection";

function InputNilaiAbsensiPage() {
  // 2 form yang independen: satu buat absensi, satu buat nilai mingguan.
  // Masing-masing punya state & handler sendiri dari hook terpisah.
  const attendanceForm = useAttendanceForm();
  const scoreForm = useScoreForm();

  return (
    <main className="input-nilai-page d-flex">
      <Sidebar />

      <section className="input-nilai-main flex-grow-1">
        <div className="input-nilai-container">
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

          <div className="input-section-grid">

            {/* =========================
                ABSENSI
                ========================= */}

            <div className="input-section-column">
              <AttendanceSection
                attendanceClass={attendanceForm.attendanceClass}
                setAttendanceClass={attendanceForm.setAttendanceClass}

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

                onAttendanceChange={attendanceForm.handleAttendanceChange}
                onSubmit={attendanceForm.handleAttendanceSubmit}

                loading={attendanceForm.loading}
              />
            </div>

            {/* =========================
                NILAI
                ========================= */}

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