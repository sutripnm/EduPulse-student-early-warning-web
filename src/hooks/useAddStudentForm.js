import { useState } from "react";

const initialFormData = {
  nis: "",
  name: "",
  entryYear: "",
  className: "",
  gender: "",
  parent: "",
};

function useAddStudentForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: sambungkan ke endpoint tambah siswa saat sudah tersedia
    console.log("Data siswa:", formData);
  };

  return { formData, handleChange, handleSubmit };
}

export default useAddStudentForm;
