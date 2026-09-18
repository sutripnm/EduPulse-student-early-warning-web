import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getParentDashboard,
} from "../services/api";

import {
  normalizeParentDashboard,
} from "../utils/dashboardNormalize";

import {
  getRiskPriority,
} from "../utils/risk";

const DUMMY_DASHBOARD = {
  profil: {
    nisn: "0051234567",
    nama: "Nadya Putri Ramadhani",
    kelas: "XI IPA 1",
  },

  absensi: [],

  study_time: [],

  tugas_pretest: [],

  assessment: [],

  tugas_posttest: [],

  komparasi: {
    kehadiran: {},
    study_time: {},
    pretest: {},
    assessment: {},
    posttest: {},
  },

  status_risk: "MEDIUM",

  rekomendasi: [],

  filter_opsi_mapel: [],
};

function useParentDashboard() {
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
  // MAPEL + RISIKO
  // =========================

  useEffect(() => {
    const fetchMapelRisk = async () => {
      if (!studentNisn) {
        return;
      }

      try {
        const result =
          await getParentDashboard(
            studentNisn,
            ""
          );

        const normalized =
          normalizeParentDashboard(
            result
          );

        const mapelList =
          normalized.filter_opsi_mapel ||
          [];

        const riskResults =
          await Promise.all(
            mapelList.map(
              async (mapel) => {
                try {
                  const result =
                    await getParentDashboard(
                      studentNisn,
                      mapel.id
                    );

                  const normalizedMapel =
                    normalizeParentDashboard(
                      result
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
                    `Gagal mengambil risiko ${mapel.nama_mapel}:`,
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

        console.log(
          "RISIKO MAPEL ORTU:",
          validResults
        );

        validResults.sort(
          (a, b) =>
            getRiskPriority(
              a.status_risiko
            ) -
            getRiskPriority(
              b.status_risiko
            )
        );

        setRiskMapelOptions(
          validResults
        );

        // =========================
        // OTOMATIS PILIH TERTINGGI
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
          "Gagal mengambil mapel ortu:",
          error.response?.data ||
            error.message
        );

        setRiskMapelOptions([]);
      }
    };

    fetchMapelRisk();
  }, [studentNisn]);

  // =========================
  // DASHBOARD AKTIF
  // =========================

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!studentNisn) {
        return;
      }

      setLoading(true);

      try {
        const result =
          await getParentDashboard(
            studentNisn,
            selectedMapel
          );

        const normalized =
          normalizeParentDashboard(
            result
          );

        setDashboard(
          normalized
        );

        setIsDummy(false);

      } catch (error) {
        console.error(
          "Gagal mengambil dashboard ortu:",
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

export default useParentDashboard;