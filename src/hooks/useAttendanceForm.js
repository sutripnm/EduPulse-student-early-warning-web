import { useMemo, useState } from "react";
import studentsDummy from "../data/studentsDummy";
import { getDateRange } from "../utils/date";

function useAttendanceForm() {
  const [attendanceClass, setAttendanceClass] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendance, setAttendance] = useState({});

  const attendanceDates = getDateRange(startDate, endDate);

  const handleAttendanceChange = (nisn, date, status) => {
    setAttendance((prev) => ({
      ...prev,
      [nisn]: {
        ...prev[nisn],
        [date]: status,
      },
    }));
  };

  const handleAttendanceSubmit = (event) => {
    event.preventDefault();

    const attendanceData = [];

    studentsDummy.forEach((student) => {
      attendanceDates.forEach((date) => {
        attendanceData.push({
          nisn: student.nisn,
          nama: student.nama,
          tanggal: date,
          status: attendance[student.nisn]?.[date] || "HADIR",
        });
      });
    });

    // TODO: sambungkan ke endpoint simpan absensi saat sudah tersedia
    console.log("Data absensi:", {
      kelas: attendanceClass,
      tanggal_mulai: startDate,
      tanggal_akhir: endDate,
      data: attendanceData,
    });
  };

  const attendanceSummary = useMemo(() => {
    const summary = { HADIR: 0, IZIN: 0, SAKIT: 0, ALPHA: 0 };

    if (attendanceDates.length === 0) {
      return summary;
    }

    studentsDummy.forEach((student) => {
      attendanceDates.forEach((date) => {
        const status = attendance[student.nisn]?.[date];

        if (status) {
          summary[status] += 1;
        }
      });
    });

    return summary;
  }, [attendance, startDate, endDate]);

  return {
    attendanceClass,
    setAttendanceClass,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    attendance,
    attendanceDates,
    attendanceSummary,
    handleAttendanceChange,
    handleAttendanceSubmit,
  };
}

export default useAttendanceForm;
