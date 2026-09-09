import { useState } from "react";

function useSettings() {
  // Profil pengguna (read-only untuk saat ini)
  const [profile] = useState({
    name: "Agus Guru",
    email: "agus@sekolah.sch.id",
    role: "Guru",
  });

  const [school, setSchool] = useState({
    name: "SMA EduPulse",
    academicYear: "2026/2027",
    subject: "Matematika",
    className: "XI IPA 1",
    semester: "Ganjil",
  });

  const [risk, setRisk] = useState({
    attendance: 70,
    studyTime: 5,
    quiz1: 70,
    assessment: 70,
    quiz2: 70,
  });

  const [theme, setTheme] = useState("light");

  const handleSchoolChange = (event) => {
    const { name, value } = event.target;
    setSchool((prev) => ({ ...prev, [name]: value }));
  };

  const handleRiskChange = (event) => {
    const { name, value } = event.target;
    setRisk((prev) => ({ ...prev, [name]: value }));
  };

  const handleSchoolSubmit = (event) => {
    event.preventDefault();
    console.log("Sekolah:", school);
  };

  const handleRiskSubmit = (event) => {
    event.preventDefault();
    console.log("Risiko:", risk);
  };

  return {
    profile,
    school,
    handleSchoolChange,
    handleSchoolSubmit,
    risk,
    handleRiskChange,
    handleRiskSubmit,
    theme,
    setTheme,
  };
}

export default useSettings;
