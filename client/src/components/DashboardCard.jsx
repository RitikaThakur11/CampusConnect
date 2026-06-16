function DashboardCard({
  title,
  value,
}) {
  return (
    <div className="
      bg-gradient-to-br
      from-slate-900
      to-slate-800
      border
      border-slate-700
      p-8
      rounded-3xl
      shadow-xl
      hover:scale-105
      transition
      duration-300
    ">
      <h2 className="text-gray-400 text-lg mb-4">
        {title}
      </h2>

      <h1 className="text-5xl font-bold text-indigo-500">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;