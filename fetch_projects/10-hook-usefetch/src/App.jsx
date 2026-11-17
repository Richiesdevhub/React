// Proyecto 10: Custom hook useFetch
// Aprendes: reutilizar la misma lógica de fetch en varios componentes
// con un hook propio (ver useFetch.js).
import { useFetch } from './useFetch.js'

function ListaPokemon() {
  const { data, loading, error, refetch } = useFetch(
    'https://pokeapi.co/api/v2/pokemon?limit=10'
  )

  return (
    <section className="tarjeta">
      <h2>Primeros 10 Pokémon (PokeAPI)</h2>
      <button onClick={refetch}>Recargar</button>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {data && !loading && (
        <ol>
          {data.results.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ol>
      )}
    </section>
  )
}

function Comentarios() {
  const { data, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/comments?postId=1'
  )

  return (
    <section className="tarjeta">
      <h2>Comentarios del post 1 (JSONPlaceholder)</h2>
      <button onClick={refetch}>Recargar</button>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {data && !loading && (
        <ul>
          {data.map((c) => (
            <li key={c.id}>
              <strong>{c.email}</strong>: {c.body}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function App() {
  return (
    <main>
      <h1>Hook personalizado useFetch</h1>
      <ListaPokemon />
      <Comentarios />
    </main>
  )
}
