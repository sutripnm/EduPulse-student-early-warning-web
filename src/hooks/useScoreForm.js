import { useState } from "react";
import studentsDummy from "../data/studentsDummy";

const createInitialScores = () => {
  const data = {};

  studentsDummy.forEach((student) => {
    data[student.nisn] = {
      studyTime: "",
      quiz1: "",
      assessment: "",
      quiz2: "",
    };
  });

  return data;
};

function useScoreForm() {
  const [scoreClass, setScoreClass] = useState("");
  const [subject, setSubject] = useState("");
  const [week, setWeek] = useState("1");
  const [scoreDate, setScoreDate] = useState("");
  const [scores, setScores] = useState(createInitialScores());

  const handleScoreChange = (nisn, field, value) => {
    setScores((prev) => ({
      ...prev,
      [nisn]: {
        ...prev[nisn],
        [field]: value,
      },
    }));
  };

  const handleScoreSubmit = (event) => {
    event.preventDefault();

    const scoreData = studentsDummy.map((student) => ({
      nisn: student.nisn,
      nama: student.nama,
      study_time: scores[student.nisn].studyTime,
      quiz_1: scores[student.nisn].quiz1,
      assessment: scores[student.nisn].assessment,
      quiz_2: scores[student.nisn].quiz2,
    }));

    // TODO: sambungkan ke endpoint simpan nilai saat sudah tersedia
    console.log("Data nilai mingguan:", {
      kelas: scoreClass,
      mapel: subject,
      minggu: week,
      tanggal: scoreDate,
      data: scoreData,
    });
  };

  return {
    scoreClass,
    setScoreClass,
    subject,
    setSubject,
    week,
    setWeek,
    scoreDate,
    setScoreDate,
    scores,
    handleScoreChange,
    handleScoreSubmit,
  };
}

export default useScoreForm;
