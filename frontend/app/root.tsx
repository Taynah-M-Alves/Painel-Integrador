import { useEffect, useState } from "react";
// use fetch nativo; se preferir axios, pode importar e usar
const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/ping/`)
      .then((r) => r.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>React + Vite</h1>
      <p>API URL: {API}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}