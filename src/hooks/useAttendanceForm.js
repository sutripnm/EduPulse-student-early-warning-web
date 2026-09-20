import { useEffect, useMemo, useState } from "react";
import { createPresensi } from "../services/api";
import useStudentsByClass from "./useStudentsByClass";
import { getDateRange } from "../utils/date";
import { ACTIVE_SEMESTER_ID } from "../constants/academic";

const ATTENDANCE_STATUS_MAP = {
  HADIR: "Hadir",
  IZIN: "Izin",
  SAKIT: "Sakit",
  ALPHA: "Alpa",
};

/**
 * Membuat item payload presensi berdasarkan siswa dan tanggal terpilih.
 */
function buildAttendanceItems(students, attendance, attendanceDates) {
  return students.map((student) => ({
    siswa_nisn: student.nisn,
    presensi_harian: attendanceDates.map((date) => ({
      tanggal: date,
      status:
        ATTENDANCE_STATUS_MAP[
          attendance[student.nisn]?.[date] || "HADIR"
        ],
    })),
  }));
}

/**
 * Menyiapkan state dan submit form input absensi harian.
 * Opsi kelas/mapel dibagikan dari useTeachingFilters oleh parent page.
 */
function useAttendanceForm({ kelasOptions, mapelOptions }) {
  const [attendanceClass, setAttendanceClass] = useState("");
  const [mapelId, setMapelId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  const semesterId = ACTIVE_SEMESTER_ID;
  const { students } = useStudentsByClass(attendanceClass);

  const attendanceDates = useMemo(
    () => getDateRange(startDate, endDate),
    [startDate, endDate]
  );

  useEffect(() => {
    /**
     * Mereset pilihan status ketika kelas atau daftar siswa berubah.
     */
    const resetAttendance = () => {
      setAttendance({});
    };

    resetAttendance();
  }, [students]);

  const attendanceSummary = useMemo(() => {
    /**
     * Menghitung total setiap status absensi untuk seluruh tabel.
     */
    const summary = {
      HADIR: 0,
      IZIN: 0,
      SAKIT: 0,
      ALPHA: 0,
    };

    students.forEach((student) => {
      attendanceDates.forEach((date) => {
        const status =
          attendance[student.nisn]?.[date] || "HADIR";

        if (summary[status] !== undefined) {
          summary[status] += 1;
        }
      });
    });

    return summary;
  }, [students, attendance, attendanceDates]);

  /**
   * Mengubah status kehadiran pada satu sel siswa/tanggal.
   */
  const handleAttendanceChange = (nisn, date, status) => {
    setAttendance((previous) => ({
      ...previous,
      [nisn]: {
        ...previous[nisn],
        [date]: status,
      },
    }));
  };

  /**
   * Memvalidasi periode absensi dan mengirim seluruh presensi ke API.
   */
  const handleAttendanceSubmit = async (event) => {
    event.preventDefault();

    if (!attendanceClass) {
      alert("Silakan pilih kelas.");
      return;
    }

    if (!mapelId) {
      alert("Silakan pilih mata pelajaran.");
      return;
    }

    if (!startDate || !endDate) {
      alert("Silakan pilih periode tanggal.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Tanggal mulai tidak boleh lebih besar dari tanggal akhir.");
      return;
    }

    if (!semesterId) {
      alert("Semester aktif tidak ditemukan.");
      return;
    }

    if (attendanceDates.length === 0) {
      alert("Periode tanggal tidak valid.");
      return;
    }

    if (students.length === 0) {
      alert("Tidak ada siswa pada kelas yang dipilih.");
      return;
    }

    const payload = {
      mapel_id: Number(mapelId),
      semester_id: Number(semesterId),
      tanggal_mulai: startDate,
      tanggal_akhir: endDate,
      items: buildAttendanceItems(
        students,
        attendance,
        attendanceDates
      ),
    };

    try {
      setLoading(true);

      const result = await createPresensi(payload);

      alert(result?.message || "Data absensi berhasil disimpan.");
    } catch (error) {
      console.error(
        "Gagal menyimpan absensi:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Gagal menyimpan data absensi."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    attendanceClass,
    setAttendanceClass,
    kelasOptions,
    mapelId,
    setMapelId,
    mapelOptions,
    semesterId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    attendance,
    attendanceDates,
    attendanceSummary,
    handleAttendanceChange,
    handleAttendanceSubmit,
    loading,
  };
}

export default useAttendanceForm;
