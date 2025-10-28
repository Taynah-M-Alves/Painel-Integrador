import React, { useEffect, useState } from 'react';
export default function ProjectList({ token }) {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getProjetos(token);
        setProjetos(res.data);
      } catch (e) {
        setErro(e.response?.data || e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  if (loading) return <div>Carregando projetos...</div>;
  if (erro) return <div>Erro: {JSON.stringify(erro)}</div>;

  return (
    <div>
      <h2>Projetos</h2>
      <ul>
        {projetos.map(p => (
          <li key={p.id}>{p.tema || p.Tema /* conforme o que seu serializer retorna */}</li>
        ))}
      </ul>
    </div>
  );
}
