import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

let currentUserCache = null;
let currentUserRequest = null;

/**
 * Mengambil user yang sedang login dan menyediakan status loading.
 * Request yang bersamaan dibagikan agar Sidebar, Dashboard, dan halaman lain
 * tidak memanggil endpoint /auth/me/ berkali-kali.
 */
function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const accessToken = localStorage.getItem("accessToken");

    /**
     * Mengambil current user sekali untuk access token yang sama.
     */
    const fetchCurrentUser = async () => {
      if (!accessToken) {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        let currentUser;

        if (currentUserCache?.token === accessToken) {
          currentUser = currentUserCache.user;
        } else if (currentUserRequest?.token === accessToken) {
          currentUser = await currentUserRequest.promise;
        } else {
          const promise = getCurrentUser().then((result) => {
            const nextUser = result?.data || result || null;
            currentUserCache = {
              token: accessToken,
              user: nextUser,
            };
            return nextUser;
          });

          currentUserRequest = {
            token: accessToken,
            promise,
          };

          try {
            currentUser = await promise;
          } finally {
            if (currentUserRequest?.promise === promise) {
              currentUserRequest = null;
            }
          }
        }

        if (!isMounted) return;

        setUser(currentUser);
        if (currentUser) {
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      } catch (error) {
        console.error(
          "Gagal mengambil current user:",
          error.response?.data || error.message
        );

        if (!isMounted) return;

        setUser(null);
        localStorage.removeItem("user");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
}

export default useCurrentUser;
