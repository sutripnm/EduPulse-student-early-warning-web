import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken =
        localStorage.getItem("accessToken");

      // Belum login
      if (!accessToken) {
        setUser(null);
        return;
      }

      try {
        const result =
          await getCurrentUser();

        const currentUser =
          result?.data || result;

        console.log(
          "CURRENT USER HEADER:",
          currentUser
        );

        setUser(
          currentUser || null
        );

        // Sinkronkan juga localStorage
        // supaya data user lama tidak tertinggal
        if (currentUser) {
          localStorage.setItem(
            "user",
            JSON.stringify(
              currentUser
            )
          );
        }
      } catch (error) {
        console.error(
          "Gagal mengambil current user:",
          error.response?.data ||
            error.message
        );

        setUser(null);

        // Hapus data user lama
        localStorage.removeItem(
          "user"
        );
      }
    };

    fetchCurrentUser();
  }, []);

  return user;
}

export default useCurrentUser;