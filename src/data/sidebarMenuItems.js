import {
  BsSpeedometer2,
  BsPeopleFill,
  BsPencilSquare,
  BsGearFill,
} from "react-icons/bs";

// `icon` di sini adalah komponen icon-nya sendiri (bukan string/emoji),
// jadi konsumennya (Sidebar.jsx) tinggal render <item.icon />.
const sidebarMenuItems = [
  { to: "/dashboard", label: "Dashboard", icon: BsSpeedometer2 },
  { to: "/daftar-siswa", label: "Daftar Siswa", icon: BsPeopleFill },
  { to: "/input-nilai-dan-absensi", label: "Input Nilai & Absensi", icon: BsPencilSquare },
  { to: "/pengaturan", label: "Pengaturan", icon: BsGearFill },
];

export default sidebarMenuItems;
