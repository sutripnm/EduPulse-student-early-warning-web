import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent, getKelas } from "../services/api";

/**
 * Mengelola form tambah siswa, opsi kelas, validasi, dan submit API.
 */
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

  useEffect(() => {
    let isMounted = true;

    /**
     * Mengambil kelas valid untuk dropdown siswa baru.
     */
    const fetchKelas = async () => {
      try {
        const result = await getKelas();

        if (isMounted) {
          setKelasOptions(result?.results || []);
        }
      } catch (requestError) {
        console.error(
          "Gagal mengambil kelas:",
          requestError.response?.data || requestError.message
        );

        if (isMounted) {
          setError("Gagal mengambil daftar kelas.");
        }
      }
    };

    fetchKelas();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Memperbarui satu field form tanpa menimpa field lainnya.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /**
   * Memvalidasi data lalu membuat siswa baru melalui API.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const requiredFields = [
      ["nisn", "NISN wajib diisi."],
      ["nama", "Nama siswa wajib diisi."],
      ["gender", "Silakan pilih gender."],
      ["kelas_id", "Silakan pilih kelas."],
      [
        "first_name_orang_tua",
        "Nama depan orang tua wajib diisi.",
      ],
      [
        "last_name_orang_tua",
        "Nama belakang orang tua wajib diisi.",
      ],
    ];

    const invalidField = requiredFields.find(([field]) => {
      const value = formData[field];
      return typeof value === "string"
        ? !value.trim()
        : !value;
    });

    if (invalidField) {
      setError(invalidField[1]);
      return;
    }

    const payload = {
      nisn: formData.nisn.trim(),
      nama: formData.nama.trim(),
      gender: formData.gender,
      kelas_id: Number(formData.kelas_id),
      first_name_orang_tua: formData.first_name_orang_tua.trim(),
      last_name_orang_tua: formData.last_name_orang_tua.trim(),
    };

    try {
      setLoading(true);
      await createStudent(payload);

      alert("Data siswa berhasil ditambahkan.");
      navigate("/daftar-siswa");
    } catch (requestError) {
      console.error(
        "Gagal menambahkan siswa:",
        requestError.response?.data || requestError.message
      );

      setError(
        requestError.response?.data?.message ||
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
