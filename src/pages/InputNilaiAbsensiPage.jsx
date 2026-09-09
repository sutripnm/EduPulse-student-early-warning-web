import Sidebar from "../components/Sidebar";
import "../styles/input-nilai-dan-absensi.css";
import useAttendanceForm from "../hooks/useAttendanceForm";
import useScoreForm from "../hooks/useScoreForm";
import AttendanceSection from "../components/input-nilai/AttendanceSection";
import ScoreSection from "../components/input-nilai/ScoreSection";

function InputNilaiAbsensiPage() {
  const attendanceForm = useAttendanceForm();
  const scoreForm = useScoreForm();

  return (
    <main className="input-nilai-page d-flex">
      <Sidebar />

      <section className="input-nilai-main flex-grow-1">
        <div className="input-nilai-container">
          <header className="input-page-header mb-4">
            <p className="text-secondary mb-1">Academic Management</p>
            <h1 className="h3 fw-bold mb-1">Input Nilai dan Absensi Siswa</h1>
            <p className="text-secondary mb-0">
              Input data absensi mingguan dan nilai pembelajaran siswa.
            </p>
          </header>

          <AttendanceSection
            attendanceClass={attendanceForm.attendanceClass}
            setAttendanceClass={attendanceForm.setAttendanceClass}
            startDate={attendanceForm.startDate}
            setStartDate={attendanceForm.setStartDate}
            endDate={attendanceForm.endDate}
            setEndDate={attendanceForm.setEndDate}
            attendance={attendanceForm.attendance}
            attendanceDates={attendanceForm.attendanceDates}
            attendanceSummary={attendanceForm.attendanceSummary}
            onAttendanceChange={attendanceForm.handleAttendanceChange}
            onSubmit={attendanceForm.handleAttendanceSubmit}
          />

          <ScoreSection
            scoreClass={scoreForm.scoreClass}
            setScoreClass={scoreForm.setScoreClass}
            subject={scoreForm.subject}
            setSubject={scoreForm.setSubject}
            week={scoreForm.week}
            setWeek={scoreForm.setWeek}
            scoreDate={scoreForm.scoreDate}
            setScoreDate={scoreForm.setScoreDate}
            scores={scoreForm.scores}
            onScoreChange={scoreForm.handleScoreChange}
            onSubmit={scoreForm.handleScoreSubmit}
          />
        </div>
      </section>
    </main>
  );
}

export default InputNilaiAbsensiPage;
