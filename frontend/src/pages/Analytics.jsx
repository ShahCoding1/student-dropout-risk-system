import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getDashboard } from "../services/api";

function Analytics() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getDashboard()
      .then(setDashboard)
      .catch(console.error);
  }, []);

  const riskData = Object.entries(
    dashboard?.risk_distribution || {}
  ).map(([name, value]) => ({
    name,
    students: value,
  }));

  const outcomeData = Object.entries(
    dashboard?.outcome_distribution || {}
  ).map(([name, value]) => ({
    name,
    students: value,
  }));

  return (
    <div>

      <div className="mb-8">
        <p className="text-sm text-indigo-400">
          Data Exploration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Explore the distribution of student risk and academic
          outcomes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <ChartCard
          title="Students by Risk Level"
          description="Number of students in each predicted risk category."
          icon={TrendingUp}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="name"
                stroke="#64748b"
              />

              <YAxis
                stroke="#64748b"
              />

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                }}
              />

              <Bar
                dataKey="students"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Student Outcomes"
          description="Distribution across dropout, enrolled and graduate outcomes."
          icon={BarChart3}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outcomeData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="name"
                stroke="#64748b"
              />

              <YAxis
                stroke="#64748b"
              />

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                }}
              />

              <Bar
                dataKey="students"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

    </div>
  );
}

function ChartCard({
  title,
  description,
  icon: Icon,
  children,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-start justify-between">

        <div>
          <h2 className="font-semibold text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {description}
          </p>
        </div>

        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
          <Icon size={20} />
        </div>

      </div>

      <div className="h-80">
        {children}
      </div>

    </div>
  );
}

export default Analytics;