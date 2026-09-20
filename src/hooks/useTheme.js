import { useEffect, useState } from "react";  

// Preferensi tema disimpan di localStorage dan diterapkan lewat
// atribut data-theme di <html>. Dipisah dari SettingsPage supaya
// halaman itu murni jadi komponen tampilan.
function useTheme() {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  /** Mengubah state menggunakan fungsi setTheme. */
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return {
    theme,
    setTheme,
  };
}

export default useTheme;
