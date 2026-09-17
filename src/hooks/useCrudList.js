import { useState } from "react";

// Hook generik untuk daftar item yang cuma punya {id, name} dan bisa
// ditambah / diedit / dihapus lewat sebuah form kecil. Dipakai 2x di
// AcademicSettingsPage: satu untuk Mata Pelajaran, satu untuk Kelas.
function useCrudList(initialItems, confirmDeleteMessage) {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const openAddForm = () => {
    setName("");
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setName(item.name);
    setEditingId(item.id);
    setShowForm(true);
  };

  const cancelForm = () => {
    setName("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, name } : item))
      );
    } else {
      setItems((prev) => [...prev, { id: Date.now(), name }]);
    }

    cancelForm();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(confirmDeleteMessage);

    if (!confirmed) {
      return;
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    items,
    showForm,
    name,
    setName,
    editingId,
    openAddForm,
    openEditForm,
    cancelForm,
    handleSubmit,
    handleDelete,
  };
}

export default useCrudList;
