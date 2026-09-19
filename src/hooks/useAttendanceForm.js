import { useEffect, useState } from "react";

import {
  createPresensi,
  getSchoolAnalytics,
  getStudents,
  getCurrentUser,
} from "../services/api";

import teacherMapel from "../data/teacherMapel";

// =========================================================
// SEMESTER AKTIF
// =========================================================
// Untuk sementara Guru tidak bisa GET /academic/semester/
// karena permission backend.
// Semester aktif yang digunakan saat ini adalah ID 1.
//
// Kalau backend nanti memberikan ID semester aktif yang berbeda,
// cukup ubah angka ini.
// =========================================================
const ACTIVE_SEMESTER_ID = 1;

function useAttendanceForm() {
  // =========================================================
  // STATE FILTER
  // =========================================================

  const [attendanceClass, setAttendanceClass] =
    useState("");

  const [mapelId, setMapelId] =
    useState("");

  const [kelasOptions, setKelasOptions] =
    useState([]);

  const [mapelOptions, setMapelOptions] =
    useState([]);

  // =========================================================
  // USER
  // =========================================================

  const [currentUser, setCurrentUser] =
    useState(null);

  const [userLoading, setUserLoading] =
    useState(true);

  // =========================================================
  // SEMESTER
  // =========================================================

  const [semesterId] =
    useState(ACTIVE_SEMESTER_ID);

  // =========================================================
  // TANGGAL
  // =========================================================

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  // =========================================================
  // ABSENSI
  // =========================================================

  const [attendance, setAttendance] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [students, setStudents] =
    useState([]);

  // =========================================================
  // USER LOGIN
  // =========================================================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result =
          await getCurrentUser();

        const user =
          result?.data || result;

        console.log(
          "ATTENDANCE USER:",
          user
        );

        setCurrentUser(user);
      } catch (error) {
        console.error(
          "Gagal mengambil user absensi:",
          error.response?.data ||
            error.message
        );

        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // =========================================================
  // ROLE
  // =========================================================

  const role = String(
    currentUser?.role || ""
  ).toUpperCase();

  const isGuru =
    role === "GURU";

  const isAdmin =
    role === "ADMIN";

  // =========================================================
  // MAPEL GURU
  // =========================================================

  const guruMapel =
    isGuru
      ? teacherMapel[
          currentUser?.email
        ]
      : null;

  const guruMapelCode =
    guruMapel?.kode || "";

  const guruMapelName =
    guruMapel?.nama || "";

  // =========================================================
  // KELAS + MAPEL
  // =========================================================
  // Untuk Guru:
  // sumber filter dari dashboard analytics
  //
  // Untuk Admin:
  // tetap dari sumber yang sama karena endpoint
  // analytics sudah menyediakan kelas + mapel.
  // =========================================================

  useEffect(() => {
    const fetchFilterOptions =
      async () => {
        if (
          userLoading ||
          !currentUser
        ) {
          return;
        }

        try {
          const result =
            await getSchoolAnalytics({});

          const data =
            result?.data || {};

          // ===================================================
          // KELAS
          // ===================================================

          const rawKelas =
            data
              ?.filter_options
              ?.kelas || [];

          const cleanedKelas =
            rawKelas.filter(
              (kelas) =>
                kelas &&
                kelas.id &&
                kelas.nama_kelas &&
                String(
                  kelas.nama_kelas
                )
                  .trim()
                  .toLowerCase() !==
                  "string"
            );

          setKelasOptions(
            cleanedKelas
          );

          // ===================================================
          // MAPEL
          // ===================================================

          const rawMapel =
            data
              ?.filter_options
              ?.mapel || [];

          const cleanedMapel =
            rawMapel.filter(
              (mapel) =>
                mapel &&
                mapel.id &&
                mapel.nama_mapel &&
                String(
                  mapel.nama_mapel
                )
                  .trim()
                  .toLowerCase() !==
                  "string"
            );

          let visibleMapel =
            cleanedMapel;

          // ===================================================
          // GURU
          // HANYA MAPEL YANG DIA AJAR
          // ===================================================

          if (isGuru) {
            visibleMapel =
              cleanedMapel.filter(
                (mapel) => {
                  const kode =
                    String(
                      mapel.kode_mapel ||
                        mapel.kode ||
                        mapel.code ||
                        ""
                    )
                      .trim()
                      .toUpperCase();

                  const nama =
                    String(
                      mapel.nama_mapel ||
                        ""
                    )
                      .trim()
                      .toLowerCase();

                  const cocokKode =
                    guruMapelCode &&
                    kode ===
                      guruMapelCode
                        .trim()
                        .toUpperCase();

                  const cocokNama =
                    guruMapelName &&
                    nama ===
                      guruMapelName
                        .trim()
                        .toLowerCase();

                  return (
                    cocokKode ||
                    cocokNama
                  );
                }
              );
          }

          // ===================================================
          // ADMIN
          // ===================================================

          if (isAdmin) {
            visibleMapel =
              cleanedMapel;
          }

          console.log(
            "ATTENDANCE KELAS:",
            cleanedKelas
          );

          console.log(
            "ATTENDANCE SEMUA MAPEL:",
            cleanedMapel
          );

          console.log(
            "ATTENDANCE MAPEL GURU:",
            guruMapel
          );

          console.log(
            "ATTENDANCE MAPEL TERLIHAT:",
            visibleMapel
          );

          setMapelOptions(
            visibleMapel
          );

          // ===================================================
          // GURU
          // OTOMATIS PILIH MAPEL GURU
          // ===================================================

          if (
            isGuru &&
            !mapelId &&
            visibleMapel.length === 1
          ) {
            setMapelId(
              String(
                visibleMapel[0].id
              )
            );
          }

        } catch (error) {
          console.error(
            "Gagal mengambil filter absensi:",
            error.response?.data ||
              error.message
          );

          setKelasOptions([]);
          setMapelOptions([]);
        }
      };

    fetchFilterOptions();

  }, [
    userLoading,
    currentUser,
    isGuru,
    isAdmin,
    guruMapelCode,
    guruMapelName,
    mapelId,
  ]);

  // =========================================================
  // DEBUG SEMESTER
  // =========================================================

  useEffect(() => {
    console.log(
      "SEMESTER ID AKTIF ABSENSI:",
      semesterId
    );
  }, [semesterId]);

  // =========================================================
  // AMBIL SISWA BERDASARKAN KELAS
  // =========================================================
  //
  // Guru:
  // → gunakan siswa-risk-summary karena endpoint
  //   academic/siswa dibatasi.
  //
  // Admin:
  // → gunakan getStudents() seperti sebelumnya.
  // =========================================================

useEffect(() => {
  const fetchStudents = async () => {
    if (!attendanceClass) {
      setStudents([]);
      setAttendance({});
      return;
    }

    try {
      const result = await getStudents({
        limit: 100,
        offset: 0,
        kelas_id: attendanceClass,
      });

      const studentList =
        result?.results || [];

      console.log(
        "KELAS TERPILIH ABSENSI:",
        attendanceClass
      );

      console.log(
        "SISWA ABSENSI:",
        studentList
      );

      setStudents(studentList);

      // Reset absensi ketika kelas berubah
      setAttendance({});
    } catch (error) {
      console.error(
        "Gagal mengambil siswa absensi:",
        error.response?.data ||
          error.message
      );

      setStudents([]);
      setAttendance({});
    }
  };

  fetchStudents();
}, [attendanceClass]);

  // =========================================================
  // DAFTAR TANGGAL
  // =========================================================

  const attendanceDates = [];

  if (
    startDate &&
    endDate
  ) {
    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    const current =
      new Date(start);

    while (
      current <= end
    ) {
      attendanceDates.push(
        current
          .toISOString()
          .split("T")[0]
      );

      current.setDate(
        current.getDate() + 1
      );
    }
  }

  // =========================================================
  // UBAH STATUS ABSENSI
  // =========================================================

  const handleAttendanceChange =
    (
      nisn,
      date,
      status
    ) => {
      setAttendance(
        (prev) => ({
          ...prev,

          [nisn]: {
            ...prev[nisn],

            [date]:
              status,
          },
        })
      );
    };

  // =========================================================
  // SUMMARY ABSENSI
  // =========================================================

  const attendanceSummary = {
    HADIR: 0,
    IZIN: 0,
    SAKIT: 0,
    ALPHA: 0,
  };

  students.forEach(
    (student) => {
      attendanceDates.forEach(
        (date) => {
          const status =
            attendance[
              student.nisn
            ]?.[date] ||
            "HADIR";

          if (
            attendanceSummary[
              status
            ] !== undefined
          ) {
            attendanceSummary[
              status
            ] += 1;
          }
        }
      );
    }
  );

  // =========================================================
  // SUBMIT ABSENSI
  // =========================================================

  const handleAttendanceSubmit =
    async (event) => {
      event.preventDefault();

      // =====================================================
      // VALIDASI
      // =====================================================

      if (!attendanceClass) {
        alert(
          "Silakan pilih kelas."
        );
        return;
      }

      if (!mapelId) {
        alert(
          "Silakan pilih mata pelajaran."
        );
        return;
      }

      if (
        !startDate ||
        !endDate
      ) {
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

      if (
        attendanceDates.length ===
        0
      ) {
        alert(
          "Periode tanggal tidak valid."
        );
        return;
      }

      if (
        students.length === 0
      ) {
        alert(
          "Tidak ada siswa pada kelas yang dipilih."
        );
        return;
      }

      // =====================================================
      // STATUS
      // =====================================================

      const statusMap = {
        HADIR: "Hadir",
        IZIN: "Izin",
        SAKIT: "Sakit",
        ALPHA: "Alpha",
      };

      // =====================================================
      // ITEMS
      // =====================================================

      const items =
        students.map(
          (student) => ({
            siswa_nisn:
              student.nisn,

            presensi_harian:
              attendanceDates.map(
                (date) => ({
                  tanggal:
                    date,

                  status:
                    statusMap[
                      attendance[
                        student.nisn
                      ]?.[date] ||
                        "HADIR"
                    ],
                })
              ),
          })
        );

      // =====================================================
      // PAYLOAD
      // =====================================================

      const payload = {
        mapel_id:
          Number(
            mapelId
          ),

        semester_id:
          Number(
            semesterId
          ),

        tanggal_mulai:
          startDate,

        tanggal_akhir:
          endDate,

        items,
      };

      console.log(
        "PAYLOAD PRESENSI:",
        payload
      );

      try {
        setLoading(true);

        const result =
          await createPresensi(
            payload
          );

        console.log(
          "HASIL PRESENSI:",
          result
        );

        alert(
          result?.message ||
            "Data absensi berhasil disimpan."
        );

      } catch (error) {
        console.error(
          "Gagal menyimpan absensi:",
          error.response?.data ||
            error.message
        );

        alert(
          error.response?.data
            ?.message ||
            "Gagal menyimpan data absensi."
        );

      } finally {
        setLoading(false);
      }
    };

  // =========================================================
  // RETURN
  // =========================================================

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