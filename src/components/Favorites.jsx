import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("INR");
  const [rate, setRate] = useState(null);

  const currencyList = ["USD", "EUR", "INR", "JPY", "GBP", "CAD", "AUD", "CNY"];

  const fetchRate = async () => {
    try {
      const res = await fetch(
        `https://api.apilayer.com/fixer/latest?base=${base}&symbols=${target}`,
        {
          headers: {
            apikey: import.meta.env.VITE_API_KEY,
          },
        }
      );
      const json = await res.json();
      setRate(json?.rates?.[target] || null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [base, target]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const addToFavorites = () => {
    const newEntry = { base, target };
    const updated = [...favorites, newEntry];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (index) => {
    const updated = favorites.filter((_, i) => i !== index);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="bg-white/30 dark:bg-gray-900/40 p-6 rounded-2xl shadow-md backdrop-blur-xl border border-gray-200 dark:border-gray-700 transition-all">
      <h2 className="text-xl font-bold mb-4">⭐ Favorite Conversions</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 shadow-inner outline-none"
        >
          {currencyList.map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>

        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 shadow-inner outline-none"
        >
          {currencyList.map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>
      </div>

      {rate && (
        <p className="mb-2 text-lg text-indigo-700 dark:text-indigo-300">
          💱 1 {base} = {rate.toFixed(2)} {target}
        </p>
      )}

      <button
        onClick={addToFavorites}
        className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-full text-white font-semibold mb-6"
      >
        ➕ Add to Favorites
      </button>

      <div className="space-y-3">
        {favorites.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No favorites yet. Add one above!
          </p>
        ) : (
          favorites.map((fav, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-yellow-100 dark:from-yellow-900 to-orange-100 dark:to-orange-900 rounded-xl shadow transition hover:scale-[1.02]"
            >
              <span className="font-medium">
                🌍 {fav.base} → {fav.target}
              </span>
              <button
                onClick={() => removeFavorite(index)}
                className="text-red-500 hover:text-red-700 transition text-sm"
              >
                ❌ Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
