function FeatureCard({ title, text }) {
  return (
    <div
      className="
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      p-8
      rounded-3xl
      shadow-xl
      hover:-translate-y-3
      hover:border-indigo-500
      transition
      duration-300
    "
    >

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-6 shadow-lg">

        🚀

      </div>

      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <p className="text-gray-400 leading-8">
        {text}
      </p>

    </div>
  );
}

export default FeatureCard;