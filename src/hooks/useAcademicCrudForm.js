import { useState } from "react";

// Menangani state form tambah/edit + submit/delete untuk AcademicCrudCard.
// Dipakai 2x di AcademicSettingsPage: satu untuk Mapel, satu untuk Kelas
// (dibedakan lewat `type`, karena payload keduanya beda bentuk).
function useAcademicCrudForm({ type, title, onCreate, onUpdate, onDelete }) {
  const isMapel = type === "mapel";
  const inputId = `${type}-name`;

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [kodeMapel, setKodeMapel] = useState("");
  const [nama, setNama] = useState("");

  const [saving, setSaving] = useState(false);

  const openAddForm = () => {
    setEditingId(null);
    setKodeMapel("");
    setNama("");
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingId(item.id);

    if (isMapel) {
      setKodeMapel(item.kode_mapel || "");
      setNama(item.nama_mapel || "");
    } else {
      setNama(item.nama_kelas || "");
    }

    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setKodeMapel("");
    setNama("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nama.trim()) {
      return;
    }

    try {
      setSaving(true);

      const payload = isMapel
        ? { kode_mapel: kodeMapel.trim(), nama_mapel: nama.trim() }
        : { nama_kelas: nama.trim() };

      if (editingId) {
        await onUpdate(editingId, payload);
      } else {
        await onCreate(payload);
      }

      cancelForm();
    } catch (error) {
      console.error(
        `Gagal menyimpan ${type}:`,
        error.response?.data || error.message
      );

      alert(error.response?.data?.message || `Gagal menyimpan ${title}.`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus ${title.toLowerCase()} ini?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await onDelete(id);
    } catch (error) {
      console.error(
        `Gagal menghapus ${type}:`,
        error.response?.data || error.message
      );

      alert(error.response?.data?.message || `Gagal menghapus ${title}.`);
    }
  };

  return {
    isMapel,
    inputId,
    showForm,
    editingId,
    kodeMapel,
    setKodeMapel,
    nama,
    setNama,
    saving,
    openAddForm,
    openEditForm,
    cancelForm,
    handleSubmit,
    handleDelete,
  };
}

export default useAcademicCrudForm;
