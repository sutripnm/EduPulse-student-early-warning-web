import { useEffect, useState } from "react";
import { createNilai } from "../services/api";
import useStudentsByClass from "./useStudentsByClass";
import { ACTIVE_SEMESTER_ID } from "../constants/academic";

/**
 * Mengubah daftar siswa + state nilai menjadi item payload API.
 */
function buildScoreItems(students, scores) {
  return students.map((student) => {
    const score = scores[student.nisn] || {};

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
          jenis_evaluasi: "QUIZ2",
          nama_evaluasi: "Quiz 2",
          skor: Number(score.quiz2),
        },
      ],
    };
  });
}

/**
 * Menyiapkan state dan submit form input nilai mingguan.
 * Opsi kelas/mapel dibagikan dari useTeachingFilters oleh parent page.
 */
function useScoreForm({ kelasOptions, mapelOptions }) {
  const [scoreClass, setScoreClass] = useState("");
  const [subject, setSubject] = useState("");
  const [scoreDate, setScoreDate] = useState("");
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(false);

  const semesterId = ACTIVE_SEMESTER_ID;
  const { students } = useStudentsByClass(scoreClass);

  useEffect(() => {
    /**
     * Membuat nilai kosong untuk setiap siswa saat kelas berubah.
     */
    const initializeScores = () => {
      const initialScores = {};

      students.forEach((student) => {
        initialScores[student.nisn] = {
          studyTime: "",
          quiz1: "",
          assessment: "",
          quiz2: "",
        };
      });

      setScores(initialScores);
    };

    initializeScores();
  }, [students]);

  /**
   * Mengubah satu field nilai untuk satu siswa tanpa menimpa field lainnya.
   */
  const handleScoreChange = (nisn, field, value) => {
    setScores((previous) => ({
      ...previous,
      [nisn]: {
        ...previous[nisn],
        [field]: value,
      },
    }));
  };

  /**
   * Memvalidasi form dan mengirim seluruh nilai siswa ke API.
   */
  const handleScoreSubmit = async (event) => {
    event.preventDefault();

    if (!scoreClass) {
      alert("Silakan pilih kelas.");
      return;
    }

    if (!subject) {
      alert("Silakan pilih mata pelajaran.");
      return;
    }

    if (!scoreDate) {
      alert("Silakan pilih tanggal input.");
      return;
    }

    if (!semesterId) {
      alert("Semester aktif tidak ditemukan.");
      return;
    }

    const incompleteStudent = students.find((student) => {
      const score = scores[student.nisn];

      return (
        !score ||
        score.studyTime === "" ||
        score.quiz1 === "" ||
        score.assessment === "" ||
        score.quiz2 === ""
      );
    });

    if (incompleteStudent) {
      alert(
        `Semua field nilai harus diisi. Periksa ${incompleteStudent.nama}.`
      );
      return;
    }

    const payload = {
      mapel_id: Number(subject),
      semester_id: Number(semesterId),
      tanggal_input: scoreDate,
      items: buildScoreItems(students, scores),
    };

    try {
      setLoading(true);

      const result = await createNilai(payload);

      alert(result?.message || "Data nilai berhasil disimpan.");
    } catch (error) {
      console.error(
        "Gagal menyimpan nilai:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
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
