import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Predictor from "./pages/Predictor";
import Students from "./pages/Students";
import Analytics from "./pages/Analytics";
import Model from "./pages/Model";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-950 text-slate-100">

        <div className="flex min-h-screen">

          <Sidebar />

          <main className="min-w-0 flex-1">

            <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur md:px-8">

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Student Dropout Risk Analytics
                </p>

                <p className="mt-1 font-semibold text-white">
                  Early Warning System
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-emerald-400">
                  API Online
                </span>

              </div>

            </header>

            <div className="p-6 md:p-8">

              <Routes>

                <Route
                  path="/"
                  element={<Dashboard />}
                />

                <Route
                  path="/predictor"
                  element={<Predictor />}
                />

                <Route
                  path="/students"
                  element={<Students />}
                />

                <Route
                  path="/analytics"
                  element={<Analytics />}
                />

                <Route
                  path="/model"
                  element={<Model />}
                />

              </Routes>

            </div>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;