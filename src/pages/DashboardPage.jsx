import Sidebar from "../components/Sidebar";
import "../styles/dashboard-page.css";
import useDashboardData from "../hooks/useDashboardData";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import KpiCards from "../components/dashboard/KpiCards";
import PerformanceTrendChart from "../components/dashboard/PerformanceTrendChart";
import RiskDonutChart from "../components/dashboard/RiskDonutChart";
import TopInterventionTable from "../components/dashboard/TopInterventionTable";
import ClassInsightPanel from "../components/dashboard/ClassInsightPanel";
import SchoolAnalyticsSection from "../components/dashboard/SchoolAnalyticsSection";

function DashboardPage() {
  const {
    dashboardData,
    riskByClassData,
    riskFactorData,
    riskData,
    topRiskStudents,
    topHighRiskClasses,
    topLowRiskClasses,
  } = useDashboardData();

  return (
    <main className="dashboard-page d-flex">
      <Sidebar />

      <section className="dashboard-main flex-grow-1 p-4">
        <DashboardHeader />

        <KpiCards dashboardData={dashboardData} />

        <section className="row g-3">
          <div className="col-lg-9">
            <div className="row g-3">
              <div className="col-md-8">
                <PerformanceTrendChart data={dashboardData?.trend_performa || []} />
              </div>

              <div className="col-md-4">
                <RiskDonutChart data={riskData} />
              </div>
            </div>

            <TopInterventionTable students={topRiskStudents} />
          </div>

          <div className="col-lg-3">
            <ClassInsightPanel
              highRiskClasses={topHighRiskClasses}
              lowRiskClasses={topLowRiskClasses}
            />
          </div>
        </section>

        <SchoolAnalyticsSection
          riskByClassData={riskByClassData}
          riskFactorData={riskFactorData}
        />
      </section>
    </main>
  );
}

export default DashboardPage;
