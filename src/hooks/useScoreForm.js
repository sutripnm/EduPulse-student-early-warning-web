import { useEffect, useState } from "react";

import {
  createNilai,
  getSchoolAnalytics,
  getStudents,
  getCurrentUser,
} from "../services/api";

import teacherMapel from "../data/teacherMapel";

function useScoreForm() {
  // =========================================================
  // FILTER
  // =========================================================

  const [scoreClass, setScoreClass] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [scoreDate, setScoreDate] =
    useState("");

  // =========================================================
  // NILAI
  // =========================================================

  const [scores, setScores] =
    useState({});

  // =========================================================
  // OPTIONS
  // =========================================================

  const [kelasOptions, setKelasOptions] =
    useState([]);

  const [mapelOptions, setMapelOptions] =
    useState([]);

  // =========================================================
  // SEMESTER
  // =========================================================

  const ACTIVE_SEMESTER_ID = 1;

  const [semesterId] =
    useState(ACTIVE_SEMESTER_ID);

  // =========================================================
  // USER
  // =========================================================

  const [currentUser, setCurrentUser] =
    useState(null);

  const [userLoading, setUserLoading] =
    useState(true);

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] =
    useState(false);

  const [students, setStudents] =
    useState([]);

  // =========================================================
  // USER LOGIN
  // =========================================================

  useEffect(() => {
    const fetchCurrentUser =
      async () => {
        try {
          const result =
            await getCurrentUser();

          const user =
            result?.data || result;

          console.log(
            "SCORE USER:",
            user
          );

          setCurrentUser(user);
        } catch (error) {
          console.error(
            "Gagal mengambil user nilai:",
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
  // AMBIL KELAS + MAPEL
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
            "SCORE KELAS:",
            cleanedKelas
          );

          console.log(
            "SCORE SEMUA MAPEL:",
            cleanedMapel
          );

          console.log(
            "SCORE MAPEL GURU:",
            guruMapel
          );

          console.log(
            "SCORE MAPEL TERLIHAT:",
            visibleMapel
          );

          setMapelOptions(
            visibleMapel
          );

          // ===================================================
          // GURU
          // otomatis pilih mapel
          // ===================================================

          if (
            isGuru &&
            !subject &&
            visibleMapel.length === 1
          ) {
            setSubject(
              String(
                visibleMapel[0].id
              )
            );
          }

        } catch (error) {
          console.error(
            "Gagal mengambil filter nilai:",
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
    subject,
  ]);

  // =========================================================
  // SEMESTER
  // =========================================================


  // =========================================================
  // AMBIL SISWA
  // berdasarkan kelas
  // =========================================================

useEffect(() => {
  const fetchStudents = async () => {
    if (!scoreClass) {
      setStudents([]);
      setScores({});
      return;
    }

    try {
      const result = await getStudents({
        limit: 100,
        offset: 0,
        kelas_id: scoreClass,
      });

      console.log(
        "KELAS TERPILIH NILAI:",
        scoreClass
      );

      console.log(
        "HASIL GET STUDENTS NILAI:",
        result
      );

      const studentList =
        result?.results || [];

      console.log(
        "DAFTAR SISWA NILAI:",
        studentList
      );

      setStudents(studentList);

      const newScores = {};

      studentList.forEach((student) => {
        newScores[student.nisn] = {
          studyTime: "",
          quiz1: "",
          assessment: "",
          quiz2: "",
        };
      });

      setScores(newScores);
    } catch (error) {
      console.error(
        "Gagal mengambil siswa nilai:",
        error.response?.data ||
          error.message
      );

      setStudents([]);
      setScores({});
    }
  };

  fetchStudents();
}, [scoreClass]);

  // =========================================================
  // UBAH NILAI
  // =========================================================

  const handleScoreChange =
    (
      nisn,
      field,
      value
    ) => {
      setScores(
        (prev) => ({
          ...prev,

          [nisn]: {
            ...prev[nisn],
            [field]:
              value,
          },
        })
      );
    };

  // =========================================================
  // SUBMIT NILAI
  // =========================================================

  const handleScoreSubmit =
    async (event) => {
      event.preventDefault();

      if (!scoreClass) {
        alert(
          "Silakan pilih kelas."
        );
        return;
      }

      if (!subject) {
        alert(
          "Silakan pilih mata pelajaran."
        );
        return;
      }

      if (!scoreDate) {
        alert(
          "Silakan pilih tanggal input."
        );
        return;
      }

      if (!semesterId) {
        alert(
          "Semester aktif tidak ditemukan."
        );
        return;
      }

      // =======================================================
      // VALIDASI FIELD
      // =======================================================

      const incompleteStudent =
        students.find(
          (student) => {
            const score =
              scores[
                student.nisn
              ];

            return (
              !score ||
              score.studyTime ===
                "" ||
              score.quiz1 ===
                "" ||
              score.assessment ===
                "" ||
              score.quiz2 ===
                ""
            );
          }
        );

      if (
        incompleteStudent
      ) {
        alert(
          `Semua field nilai harus diisi. Periksa ${incompleteStudent.nama}.`
        );

        return;
      }

      // =======================================================
      // ITEMS
      // =======================================================

      const items =
        students.map(
          (student) => {
            const score =
              scores[
                student.nisn
              ];

            return {
              siswa_nisn:
                student.nisn,

              studytime:
                Number(
                  score.studyTime
                ),

              evaluasi_list: [
                {
                  jenis_evaluasi:
                    "QUIZ",

                  nama_evaluasi:
                    "Quiz 1",

                  skor:
                    Number(
                      score.quiz1
                    ),
                },

                {
                  jenis_evaluasi:
                    "TUGAS",

                  nama_evaluasi:
                    "Tugas",

                  skor:
                    Number(
                      score.assessment
                    ),
                },

                {
                  jenis_evaluasi:
                    "QUIZ",

                  nama_evaluasi:
                    "Quiz 2",

                  skor:
                    Number(
                      score.quiz2
                    ),
                },
              ],
            };
          }
        );

      // =======================================================
      // PAYLOAD
      // =======================================================

      const payload = {
        mapel_id:
          Number(
            subject
          ),

        semester_id:
          Number(
            semesterId
          ),

        tanggal_input:
          scoreDate,

        items,
      };

      console.log(
        "PAYLOAD NILAI:",
        payload
      );

      // =======================================================
      // POST
      // =======================================================

      try {
        setLoading(true);

        const result =
          await createNilai(
            payload
          );

        console.log(
          "HASIL NILAI:",
          result
        );

        alert(
          "Data nilai berhasil disimpan."
        );

      } catch (error) {
        console.error(
          "Gagal menyimpan nilai:",
          error.response?.data ||
            error.message
        );

        alert(
          "Gagal menyimpan data nilai."
        );

      } finally {
        setLoading(false);
      }
    };

    

  // =========================================================
  // RETURN
  // =========================================================

  return {
    scoreClass,
    setScoreClass,

    subject,
    setSubject,

    scoreDate,
    setScoreDate,

    kelasOptions,
    mapelOptions,

    students,
    scores,

    handleScoreChange,
    handleScoreSubmit,

    loading,
  };
}

export default useScoreForm;