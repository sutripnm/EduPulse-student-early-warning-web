import { useEffect, useState } from "react";
import {
  createPresensi,
  getKelas,
  getMapel,
  getSemester,
  getStudents,
} from "../services/api";

function useAttendanceForm() {
  const [attendanceClass, setAttendanceClass] = useState("");
  const [mapelId, setMapelId] = useState("");

  const [kelasOptions, setKelasOptions] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);

  const [semesterId, setSemesterId] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [attendance, setAttendance] = useState({});

  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);

  useEffect(() => {
  const fetchStudents = async () => {
    if (!attendanceClass) {
      setStudents([]);
      return;
    }

    try {
      const result = await getStudents({
        limit: 100,
        offset: 0,
        kelas_id: attendanceClass,
      });

      setStudents(result.results || []);
    } catch (error) {
      console.error(
        "Gagal mengambil siswa:",
        error.response?.data || error.message
      );

      setStudents([]);
    }
  };

  fetchStudents();
}, [attendanceClass]);

  // =========================
  // Ambil filter
  // =========================

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [
          kelasResult,
          mapelResult,
          semesterResult,
        ] = await Promise.all([
          getKelas(),
          getMapel(),
          getSemester(),
        ]);

        setKelasOptions(
          kelasResult.results || []
        );

        setMapelOptions(
          mapelResult.results || []
        );

        const activeSemester =
          semesterResult.results?.find(
            (semester) => semester.is_aktif
          );

        setSemesterId(
          activeSemester?.id || null
        );
      } catch (error) {
        console.error(
          "Gagal mengambil data form absensi:",
          error.response?.data ||
            error.message
        );
      }
    };

    fetchFilterOptions();
  }, []);

  // =========================
  // Buat daftar tanggal
  // =========================

  const attendanceDates = [];

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const current = new Date(start);

    while (current <= end) {
      attendanceDates.push(
        current.toISOString().split("T")[0]
      );

      current.setDate(
        current.getDate() + 1
      );
    }
  }

  // =========================
  // Ubah status absensi
  // =========================

  const handleAttendanceChange = (
    nisn,
    date,
    status
  ) => {
    setAttendance((prev) => ({
      ...prev,

      [nisn]: {
        ...prev[nisn],

        [date]: status,
      },
    }));
  };

  // =========================
  // Summary
  // =========================

  const attendanceSummary = {
    HADIR: 0,
    IZIN: 0,
    SAKIT: 0,
    ALPHA: 0,
  };

 students.forEach((student) => {
  attendanceDates.forEach((date) => {
    const status =
      attendance[student.nisn]?.[date] || "HADIR";

    attendanceSummary[status] += 1;
  });
});

  // =========================
  // Submit
  // =========================

  const handleAttendanceSubmit = async (
    event
  ) => {
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
      alert(
        "Silakan pilih periode tanggal."
      );
      return;
    }

    if (
      new Date(startDate) >
      new Date(endDate)
    ) {
      alert(
        "Tanggal mulai tidak boleh lebih besar dari tanggal akhir."
      );

      return;
    }

    if (!semesterId) {
      alert(
        "Semester aktif tidak ditemukan."
      );

      return;
    }

    if (attendanceDates.length === 0) {
      alert(
        "Periode tanggal tidak valid."
      );

      return;
    }

    // API memakai format:
    // Hadir / Izin / Sakit / Alpha

    const statusMap = {
      HADIR: "Hadir",
      IZIN: "Izin",
      SAKIT: "Sakit",
      ALPHA: "Alpha",
    };

const items = students.map((student) => ({
  siswa_nisn: student.nisn,

  presensi_harian: attendanceDates.map((date) => ({
    tanggal: date,

    status:
      statusMap[
        attendance[student.nisn]?.[date] || "HADIR"
      ],
  })),
}));

    const payload = {
      mapel_id: Number(mapelId),
      semester_id: Number(semesterId),

      tanggal_mulai: startDate,
      tanggal_akhir: endDate,

      items,
    };

    console.log(
      "PAYLOAD PRESENSI:",
      payload
    );

    try {
      setLoading(true);

      const result =
        await createPresensi(payload);

      console.log(
        "HASIL PRESENSI:",
        result
      );

      alert(
        "Data absensi berhasil disimpan."
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan absensi:",
        error.response?.data ||
          error.message
      );

      alert(
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