import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createStudent,
  getKelas,
} from "../services/api";

function useAddStudentForm() {
  const navigate = useNavigate();

  const [kelasOptions, setKelasOptions] = useState([]);

  const [formData, setFormData] = useState({
    nisn: "",
    nama: "",
    gender: "",
    kelas_id: "",
    first_name_orang_tua: "",
    last_name_orang_tua: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET KELAS
  // =========================

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const result = await getKelas();

        setKelasOptions(
          result.results || []
        );
      } catch (error) {
        console.error(
          "Gagal mengambil kelas:",
          error.response?.data ||
            error.message
        );

        setError(
          "Gagal mengambil daftar kelas."
        );
      }
    };

    fetchKelas();
  }, []);

  // =========================
  // CHANGE
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // Validasi
    if (!formData.nisn.trim()) {
      setError("NISN wajib diisi.");
      return;
    }

    if (!formData.nama.trim()) {
      setError("Nama siswa wajib diisi.");
      return;
    }

    if (!formData.gender) {
      setError("Silakan pilih gender.");
      return;
    }

    if (!formData.kelas_id) {
      setError("Silakan pilih kelas.");
      return;
    }

    if (
      !formData.first_name_orang_tua.trim()
    ) {
      setError(
        "Nama depan orang tua wajib diisi."
      );
      return;
    }

    if (
      !formData.last_name_orang_tua.trim()
    ) {
      setError(
        "Nama belakang orang tua wajib diisi."
      );
      return;
    }

    const payload = {
      nisn: formData.nisn.trim(),
      nama: formData.nama.trim(),
      gender: formData.gender,
      kelas_id: Number(formData.kelas_id),
      first_name_orang_tua:
        formData.first_name_orang_tua.trim(),
      last_name_orang_tua:
        formData.last_name_orang_tua.trim(),
    };

    console.log(
      "PAYLOAD TAMBAH SISWA:",
      payload
    );

    try {
      setLoading(true);

      const result =
        await createStudent(payload);

      console.log(
        "HASIL TAMBAH SISWA:",
        result
      );

      alert(
        "Data siswa berhasil ditambahkan."
      );

      navigate("/daftar-siswa");
    } catch (error) {
      console.error(
        "Gagal menambahkan siswa:",
        error.response?.data ||
          error.message
      );

      setError(
        error.response?.data?.message ||
          "Gagal menambahkan siswa."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,

    kelasOptions,

    loading,
    error,
  };
}

export default useAddStudentForm;