import { useEffect, useState } from "react";

// Membaca data user yang tersimpan di localStorage setelah login
// (lihat hooks/useLogin.js). Dipisah jadi hook sendiri supaya
// komponen seperti DashboardHeader tidak perlu tahu soal localStorage.
function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user;
}

export default useCurrentUser;
