function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-indigo-400",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <div className={`rounded-xl bg-slate-800 p-3 ${iconColor}`}>
          <Icon size={20} />
        </div>

      </div>

    </div>
  );
}

export default StatCard;