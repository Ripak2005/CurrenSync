import { useEffect, useState } from "react";
import Converter from "./components/Converter";
import Chart from "./components/Chart";
import Favorites from "./components/Favorites";
import Insight from "./components/Insight";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen px-4 py-8 font-sans transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-tr from-black via-slate-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-sky-100 to-white text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl p-8 transition-all">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2">
            💱 <span>CurrenSync</span>
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-full text-white font-semibold shadow-md"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="grid gap-8">
          <Converter />
          <Chart />
          <Insight />
          <Favorites />
        </div>
      </div>

      <footer className="text-center mt-10 text-sm opacity-60">
        Built with ❤️ by Ripak. Powered by Fixer API.
      </footer>
    </div>
  );
}
