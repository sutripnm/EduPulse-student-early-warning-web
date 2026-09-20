import {
  BsSpeedometer2,
  BsPeopleFill,
  BsPencilSquare,
  BsGearFill,
} from "react-icons/bs";

/**
 * Membuat daftar menu sidebar sesuai role user dan NISN terkait.
 */
export function getSidebarMenuItems(role, nisn) {
  const normalizedRole = String(role || "").toUpperCase();

  if (normalizedRole === "SISWA") {
    return [
      {
        label: "Dashboard Siswa",
        to: `/dashboard-siswa/${nisn}`,
        icon: BsSpeedometer2,
      },
    ];
  }

  if (
    normalizedRole === "ORANGTUA" ||
    normalizedRole === "ORANG_TUA"
  ) {
    return [
      {
        label: "Dashboard Orang Tua",
        to: `/dashboard-ortu/${nisn}`,
        icon: BsSpeedometer2,
      },
    ];
  }

  if (normalizedRole === "GURU") {
    return [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: BsSpeedometer2,
      },
      {
        label: "Daftar Siswa",
        to: "/daftar-siswa",
        icon: BsPeopleFill,
      },
      {
        label: "Input Nilai & Absensi",
        to: "/input-nilai-dan-absensi",
        icon: BsPencilSquare,
      },
    ];
  }

  if (normalizedRole === "ADMIN") {
    return [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: BsSpeedometer2,
      },
      {
        label: "Daftar Siswa",
        to: "/daftar-siswa",
        icon: BsPeopleFill,
      },
      {
        label: "Input Nilai & Absensi",
        to: "/input-nilai-dan-absensi",
        icon: BsPencilSquare,
      },
      {
        label: "Pengaturan",
        to: "/pengaturan",
        icon: BsGearFill,
      },
    ];
  }

  return [];
}

export default getSidebarMenuItems;
