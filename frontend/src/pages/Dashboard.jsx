import { useEffect, useState } from "react";
import {
  Users,
  AlertTriangle,
  Activity,
  GraduationCap,
  PieChart as PieIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getDashboard } from "../services/api";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-slate-400">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
        {error}
      </div>
    );
  }

  const riskDistribution = Object.entries(
    dashboard?.risk_distribution || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const outcomeDistribution = Object.entries(
    dashboard?.outcome_distribution || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-indigo-400">
          Student Dropout Risk Analytics
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
          Early Warning Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Monitor student risk levels and identify students who may
          require early academic or financial intervention.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Students"
          value={dashboard?.total_students ?? 0}
          subtitle="Students analyzed"
          icon={Users}
        />

        <StatCard
          title="High Risk"
          value={dashboard?.risk_distribution?.["High Risk"] ?? 0}
          subtitle="Requires attention"
          icon={AlertTriangle}
          iconColor="text-red-400"
        />

        <StatCard
          title="Medium Risk"
          value={dashboard?.risk_distribution?.["Medium Risk"] ?? 0}
          subtitle="Needs monitoring"
          icon={Activity}
          iconColor="text-amber-400"
        />

        <StatCard
          title="Low Risk"
          value={dashboard?.risk_distribution?.["Low Risk"] ?? 0}
          subtitle="Currently stable"
          icon={GraduationCap}
          iconColor="text-emerald-400"
        />

      </div>

      {/* Average probability */}
      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-400">
              Average Dropout Probability
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {dashboard?.average_dropout_probability != null
                ? `${Number(
                    dashboard.average_dropout_probability
                  ).toFixed(2)}%`
                : "N/A"}
            </p>
          </div>

          <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
            <PieIcon size={22} />
          </div>

        </div>

      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Risk */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-4">
            <h2 className="font-semibold text-white">
              Risk Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Current student risk classification
            </p>
          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  innerRadius={65}
                  paddingAngle={3}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell
                      key={`risk-${index}`}
                      fill={
                        entry.name === "High Risk"
                          ? "#ef4444"
                          : entry.name === "Medium Risk"
                          ? "#f59e0b"
                          : "#10b981"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Outcomes */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-4">
            <h2 className="font-semibold text-white">
              Student Outcomes
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Distribution of student academic outcomes
            </p>
          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={outcomeDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  innerRadius={65}
                  paddingAngle={3}
                >
                  {outcomeDistribution.map((entry, index) => (
                    <Cell
                      key={`outcome-${index}`}
                      fill={
                        entry.name === "Dropout"
                          ? "#ef4444"
                          : entry.name === "Graduate"
                          ? "#10b981"
                          : "#6366f1"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Early warning */}
      <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">

        <h2 className="font-semibold text-white">
          Early Warning System
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          The machine learning model estimates dropout probability
          using student demographic, academic, financial and
          enrollment-related factors. Students with higher predicted
          risk can be prioritized for early intervention.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;