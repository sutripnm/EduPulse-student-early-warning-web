import teacherMapel from "../data/teacherMapel";

/**
 * Memeriksa apakah nilai berasal dari placeholder Swagger "string".
 */
const isPlaceholder = (value) =>
  String(value ?? "").trim().toLowerCase() === "string";

/**
 * Memeriksa apakah data kelas valid untuk ditampilkan di UI.
 */
export function isValidKelas(kelas) {
  return Boolean(
    kelas?.id &&
      kelas?.nama_kelas &&
      !isPlaceholder(kelas.nama_kelas)
  );
}

/**
 * Memeriksa apakah data mata pelajaran valid untuk ditampilkan di UI.
 */
export function isValidMapel(mapel) {
  return Boolean(
    mapel?.id &&
      mapel?.nama_mapel &&
      !isPlaceholder(mapel.nama_mapel) &&
      !isPlaceholder(mapel.kode_mapel)
  );
}

/**
 * Membersihkan daftar kelas dari response API.
 */
export function filterValidKelas(list) {
  return (list || []).filter(isValidKelas);
}

/**
 * Membersihkan daftar mata pelajaran dari response API.
 */
export function filterValidMapel(list) {
  return (list || []).filter(isValidMapel);
}

/**
 * Mengambil data mapel yang dikonfigurasi untuk seorang guru.
 */
export function getTeacherMapel(user) {
  const role = String(user?.role || "").toUpperCase();

  return role === "GURU"
    ? teacherMapel[user?.email] || null
    : null;
}

/**
 * Mencocokkan mapel API dengan mapel yang dimiliki seorang guru.
 * Kode diprioritaskan, sedangkan nama menjadi fallback.
 */
export function isTeacherMapelMatch(mapel, teacherSubject) {
  if (!teacherSubject) return false;

  const mapelCode = String(
    mapel?.kode_mapel || mapel?.kode || mapel?.code || ""
  )
    .trim()
    .toUpperCase();

  const mapelName = String(mapel?.nama_mapel || "")
    .trim()
    .toLowerCase();

  const teacherCode = String(teacherSubject.kode || "")
    .trim()
    .toUpperCase();

  const teacherName = String(teacherSubject.nama || "")
    .trim()
    .toLowerCase();

  return (
    (teacherCode && mapelCode === teacherCode) ||
    (teacherName && mapelName === teacherName)
  );
}

/**
 * Mengambil daftar mapel yang boleh dilihat berdasarkan role pengguna.
 */
export function getVisibleMapelOptions(
  list,
  { isAdmin = false, isGuru = false, teacherMapel = null } = {}
) {
  const validMapel = filterValidMapel(list);

  if (isAdmin) return validMapel;

  if (isGuru) {
    return validMapel.filter((mapel) =>
      isTeacherMapelMatch(mapel, teacherMapel)
    );
  }

  return [];
}
