import { useEffect, useState } from "react";

export default function Converter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencyList = [
    { code: "USD", flag: "🇺🇸" },
    { code: "EUR", flag: "🇪🇺" },
    { code: "INR", flag: "🇮🇳" },
    { code: "GBP", flag: "🇬🇧" },
    { code: "JPY", flag: "🇯🇵" },
    { code: "CAD", flag: "🇨🇦" },
    { code: "AUD", flag: "🇦🇺" },
    { code: "CNY", flag: "🇨🇳" }
  ];

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
        {
          headers: {
            apikey: import.meta.env.VITE_API_KEY,
          },
        }
      );
      const data = await res.json();
      setResult(data.result?.toFixed(2));
    } catch (err) {
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, from, to]);

  return (
    <div className="bg-white/30 dark:bg-gray-900/40 p-6 rounded-2xl shadow-md backdrop-blur-xl border border-gray-200 dark:border-gray-700 transition-all">
      <h2 className="text-xl font-bold mb-4">🔁 Live Currency Converter</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Enter amount"
        />

        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {currencyList.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {currencyList.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={convertCurrency}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all font-semibold w-full"
      >
        Convert Now
      </button>

      {loading ? (
        <p className="mt-4 text-indigo-500 font-medium">⏳ Converting...</p>
      ) : (
        result && (
          <p className="mt-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            💰 {amount} {from} = {result} {to}
          </p>
        )
      )}
    </div>
  );
}
