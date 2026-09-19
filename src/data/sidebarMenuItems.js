import {
  BsSpeedometer2,
  BsPeopleFill,
  BsPencilSquare,
  BsGearFill,
  BsBookFill,
  BsPersonPlusFill,
} from "react-icons/bs";

const sidebarMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: BsSpeedometer2,
  },

  {
    label: "Daftar Siswa",
    to: "/daftar-siswa",
    icon: BsPeopleFill,
  },

  {
    label: "Input Nilai & Absensi",
    to: "/input-nilai",
    icon: BsPencilSquare,
  },

  {
    label: "Pengaturan",
    to: "/pengaturan",
    icon: BsGearFill,
  },

];

export default sidebarMenuItems;