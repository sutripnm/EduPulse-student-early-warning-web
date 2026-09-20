import { useCallback, useEffect, useState } from "react";

/**
 * Mengelola operasi CRUD resource sederhana yang memiliki pola:
 * ambil daftar, buat, ubah, hapus, lalu refresh daftar setelah mutasi.
 */
function useAcademicResource({ load, create, update, remove }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * Mengambil ulang daftar resource dari API.
   */
  const reload = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const result = await load();
      const nextItems = result?.results || [];
      setItems(nextItems);
      return result;
    } catch (requestError) {
      console.error("Gagal memuat data:", requestError.response?.data || requestError.message);
      setItems([]);
      setError(true);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [load]);

  useEffect(() => {
    reload().catch(() => {
      // Error sudah disimpan ke state oleh reload().
    });
  }, [reload]);

  /**
   * Membuat resource baru lalu memuat ulang daftar.
   */
  const createItem = useCallback(
    async (data) => {
      const result = await create(data);
      await reload();
      return result;
    },
    [create, reload]
  );

  /**
   * Mengubah resource lalu memuat ulang daftar.
   */
  const updateItem = useCallback(
    async (id, data) => {
      const result = await update(id, data);
      await reload();
      return result;
    },
    [update, reload]
  );

  /**
   * Menghapus resource lalu memuat ulang daftar.
   */
  const removeItem = useCallback(
    async (id) => {
      const result = await remove(id);
      await reload();
      return result;
    },
    [remove, reload]
  );

  return {
    items,
    loading,
    error,
    reload,
    createItem,
    updateItem,
    removeItem,
  };
}

export default useAcademicResource;
