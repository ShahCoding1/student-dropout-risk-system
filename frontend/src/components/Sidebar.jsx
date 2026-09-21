import {
  LayoutDashboard,
  Target,
  Users,
  BarChart3,
  Brain,
  GraduationCap,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Risk Predictor",
    path: "/predictor",
    icon: Target,
  },
  {
    name: "Students",
    path: "/students",
    icon: Users,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "ML Model",
    path: "/model",
    icon: Brain,
  },
];

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-800 bg-slate-900 md:flex md:flex-col">

      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-5">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
            <GraduationCap size={23} />
          </div>

          <div>
            <h1 className="font-bold text-white">
              DropoutGuard
            </h1>

            <p className="text-xs text-slate-400">
              Early Warning System
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

      {/* API Status */}
      <div className="border-t border-slate-800 p-4">
        <div className="rounded-xl bg-slate-800/60 p-4">

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            <span className="text-sm font-medium text-white">
              System Online
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
            <Activity size={13} />
            FastAPI connected
          </div>

        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
