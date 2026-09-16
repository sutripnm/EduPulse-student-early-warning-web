import { useEffect, useState } from "react";
import {
  createNilai,
  getKelas,
  getMapel,
  getSemester,
  getStudents,
} from "../services/api";

function useScoreForm() {
  const [scoreClass, setScoreClass] =
    useState("");

  // Sekarang menyimpan ID mapel
  const [subject, setSubject] =
    useState("");

  const [scoreDate, setScoreDate] =
    useState("");

const [scores, setScores] = useState({});

  const [kelasOptions, setKelasOptions] =
    useState([]);

  const [mapelOptions, setMapelOptions] =
    useState([]);

  const [semesterId, setSemesterId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [students, setStudents] = useState([]);

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

      const studentList = result.results || [];

      setStudents(studentList);

      // Reset nilai sesuai siswa dari kelas yang dipilih
      setScores(() => {
        const newScores = {};

        studentList.forEach((student) => {
          newScores[student.nisn] = {
            studyTime: "",
            quiz1: "",
            assessment: "",
            quiz2: "",
          };
        });

        return newScores;
      });
    } catch (error) {
      console.error(
        "Gagal mengambil siswa:",
        error.response?.data || error.message
      );

      setStudents([]);
      setScores({});
    }
  };

  fetchStudents();
}, [scoreClass]);

  // =========================
  // Ambil filter
  // =========================

  useEffect(() => {
    const fetchFilterOptions =
      async () => {
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
              (semester) =>
                semester.is_aktif
            );

          setSemesterId(
            activeSemester?.id || null
          );
        } catch (error) {
          console.error(
            "Gagal mengambil data form nilai:",
            error.response?.data ||
              error.message
          );
        }
      };

    fetchFilterOptions();
  }, []);

  // =========================
  // Ubah nilai
  // =========================

  const handleScoreChange = (
    nisn,
    field,
    value
  ) => {
    setScores((prev) => ({
      ...prev,

      [nisn]: {
        ...prev[nisn],
        [field]: value,
      },
    }));
  };

  // =========================
  // Submit nilai
  // =========================

  const handleScoreSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!scoreClass) {
      alert("Silakan pilih kelas.");
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

    // =========================
    // Validasi semua field
    // =========================

    const incompleteStudent = students.find(
      (student) => {
        const score = scores[student.nisn];

        return (
          !score ||
          score.studyTime === "" ||
          score.quiz1 === "" ||
          score.assessment === "" ||
          score.quiz2 === ""
        );
      }
    );

    if (incompleteStudent) {
      alert(
        `Semua field nilai harus diisi. Periksa ${incompleteStudent.nama}.`
      );

      return;
    }

    // =========================
    // Buat items
    // =========================

const items = students.map((student) => {
  const score = scores[student.nisn];

  return {
    siswa_nisn: student.nisn,

    studytime: Number(score.studyTime),

    evaluasi_list: [
      {
        jenis_evaluasi: "QUIZ",
        nama_evaluasi: "Quiz 1",
        skor: Number(score.quiz1),
      },
      {
        jenis_evaluasi: "TUGAS",
        nama_evaluasi: "Tugas",
        skor: Number(score.assessment),
      },
      {
        jenis_evaluasi: "QUIZ",
        nama_evaluasi: "Quiz 2",
        skor: Number(score.quiz2),
      },
    ],
  };
});

    // =========================
    // Payload
    // =========================

    const payload = {
      mapel_id: Number(subject),

      semester_id: Number(
        semesterId
      ),

      tanggal_input: scoreDate,

      items,
    };

    console.log(
      "PAYLOAD NILAI:",
      payload
    );

    // =========================
    // POST
    // =========================

    try {
      setLoading(true);

      const result =
        await createNilai(payload);

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