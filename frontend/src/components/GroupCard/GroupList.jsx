import React, { useEffect, useState } from "react";

export default function GrupoList() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // se você configurou proxy no Vite, pode usar '/api/grupos/'
    fetch("/api/grupos/") 
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(data => setGrupos(data.grupos || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando grupos...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (grupos.length === 0) return <div>Nenhum grupo encontrado</div>;

  return (
    <div>
      {grupos.map(g => {
        // acessa campos independentemente do formato de chave
        const nome = g.nomeGrupo ?? g.NomeGrupo ?? g["Nome do Grupo"];
        const data = g.dataCriacao ?? g.DataCriacao;
        const lider = g.lider ?? g.Lider;
        const integrantes = g.integrantes ?? g.Integrantes ?? [];

        return (
          <div key={g.id} className="card" style={{ padding: 12, marginBottom: 10 }}>
            <h3>{nome}</h3>
            <p><strong>Criado:</strong> {data}</p>
            <p><strong>Líder:</strong> {lider ? (lider.username ?? lider.nome) : "—"}</p>
            <p><strong>Integrantes:</strong></p>
            <ul>
              {integrantes.map(i => (
                <li key={i.id}>{i.username ?? i.nome}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}