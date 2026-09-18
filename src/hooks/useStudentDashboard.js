import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getStudentDashboard,
} from "../services/api";

import {
  normalizeStudentDashboard,
} from "../utils/dashboardNormalize";

import {
  getRiskPriority,
} from "../utils/risk";

// =========================
// DATA CONTOH
// =========================

const DUMMY_DASHBOARD = {
  profil: {
    nisn: "0051234567",
    nama: "Nadya Putri Ramadhani",
    kelas: "XI IPA 1",
  },

  absensi_harian: [],

  study_time: [
    {
      label: "Minggu Ini",
      jam: 7,
    },
  ],

  tugas_pretest: [
    {
      label: "Minggu Ini",
      nilai: 78,
    },
  ],

  assessment: [
    {
      label: "Minggu Ini",
      nilai: 82,
    },
  ],

  tugas_posttest: [
    {
      label: "Minggu Ini",
      nilai: 85,
    },
  ],

  status_risk: "MEDIUM",

  rekomendasi: [
    "Tingkatkan waktu belajar mandiri terutama sebelum assessment.",
    "Perhatikan kehadiran, terutama di akhir minggu.",
  ],

  filter_opsi_mapel: [],
};

function useStudentDashboard() {
  const { nisn } = useParams();

  const studentNisn =
    nisn ||
    localStorage.getItem("nisn");

  const [selectedMapel, setSelectedMapel] =
    useState("");

  const [dashboard, setDashboard] =
    useState(null);

  const [riskMapelOptions, setRiskMapelOptions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isDummy, setIsDummy] =
    useState(false);

  // =========================
  // AMBIL MAPEL + RISIKO
  // =========================

  useEffect(() => {
    const fetchMapelRisk = async () => {
      if (!studentNisn) {
        return;
      }

      try {
        // Ambil daftar mapel dari dashboard
        // tanpa filter mapel.
        const result =
          await getStudentDashboard(
            studentNisn,
            ""
          );

        const normalized =
          normalizeStudentDashboard(
            result
          );

        const mapelList =
          normalized.filter_opsi_mapel ||
          [];

        // =========================
        // CEK STATUS SETIAP MAPEL
        // =========================

        const riskResults =
          await Promise.all(
            mapelList.map(
              async (mapel) => {
                try {
                  const mapelResult =
                    await getStudentDashboard(
                      studentNisn,
                      mapel.id
                    );

                  const normalizedMapel =
                    normalizeStudentDashboard(
                      mapelResult
                    );

                  return {
                    id: mapel.id,

                    nama_mapel:
                      mapel.nama_mapel,

                    status_risiko:
                      normalizedMapel.status_risk ||
                      "LOW",
                  };
                } catch (error) {
                  console.error(
                    `Gagal mengambil risiko mapel ${mapel.nama_mapel}:`,
                    error.response?.data ||
                      error.message
                  );

                  return null;
                }
              }
            )
          );

        const validResults =
          riskResults.filter(Boolean);

        // =========================
        // URUTKAN
        // HIGH → MEDIUM → LOW
        // =========================

        validResults.sort(
          (a, b) =>
            getRiskPriority(
              a.status_risiko
            ) -
            getRiskPriority(
              b.status_risiko
            )
        );

        console.log(
          "RISIKO MAPEL SISWA:",
          validResults
        );

        setRiskMapelOptions(
          validResults
        );

        // =========================
        // OTOMATIS PILIH
        // RISIKO TERTINGGI
        // =========================

        if (
          validResults.length > 0
        ) {
          setSelectedMapel(
            String(
              validResults[0].id
            )
          );
        }
      } catch (error) {
        console.error(
          "Gagal mengambil mapel siswa:",
          error.response?.data ||
            error.message
        );

        setRiskMapelOptions([]);
      }
    };

    fetchMapelRisk();
  }, [studentNisn]);

  // =========================
  // AMBIL DASHBOARD AKTIF
  // =========================

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!studentNisn) {
        return;
      }

      setLoading(true);

      try {
        const result =
          await getStudentDashboard(
            studentNisn,
            selectedMapel
          );

        const normalized =
          normalizeStudentDashboard(
            result
          );

        setDashboard(
          normalized
        );

        setIsDummy(false);

      } catch (error) {
        console.error(
          "Gagal mengambil dashboard siswa:",
          error.response?.data ||
            error.message
        );

        setDashboard(
          DUMMY_DASHBOARD
        );

        setIsDummy(true);

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [
    studentNisn,
    selectedMapel,
  ]);

  return {
    studentNisn,

    selectedMapel,
    setSelectedMapel,

    dashboard,

    riskMapelOptions,

    loading,
    isDummy,
  };
}

export default useStudentDashboard;