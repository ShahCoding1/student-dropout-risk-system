import { useEffect, useState } from "react";
import {
  Brain,
  Database,
  ShieldCheck,
} from "lucide-react";

import { getModelInfo } from "../services/api";

function Model() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    getModelInfo()
      .then(setModel)
      .catch(console.error);
  }, []);

  return (
    <div>

      <div className="mb-8">
        <p className="text-sm text-indigo-400">
          Machine Learning
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Model Information
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Information about the trained early-warning model used
          by the application.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <InfoCard
          icon={Brain}
          title="Model"
          value={
            model?.model_type ||
            model?.model ||
            "Early Warning Model"
          }
        />

        <InfoCard
          icon={Database}
          title="Target"
          value={
            model?.target ||
            "Student Dropout"
          }
        />

        <InfoCard
          icon={ShieldCheck}
          title="System"
          value="Operational"
        />

      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="font-semibold text-white">
          Model Metadata
        </h2>

        <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-300">
          {JSON.stringify(model, null, 2)}
        </pre>

      </div>

    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
          <Icon size={21} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <p className="mt-1 font-semibold text-white">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Model;