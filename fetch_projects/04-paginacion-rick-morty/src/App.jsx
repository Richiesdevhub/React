// Proyecto 4: Personajes de Rick and Morty con paginación
// Aprendes: volver a hacer fetch cuando cambia un estado (la página),
// usando ese estado en el array de dependencias de useEffect.
import { useEffect, useState } from 'react'

export default function App() {
  const [pagina, setPagina] = useState(1)
  const [personajes, setPersonajes] = useState([])
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${pagina}`,
          { signal: controller.signal }
        )
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        // Respuesta: { info: { count, pages, next, prev }, results: [...] }
        const datos = await response.json()
        setPersonajes(datos.results)
        setTotalPaginas(datos.info.pages)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargar()
    return () => controller.abort()
  }, [pagina]) // <- cada vez que cambia "pagina", se vuelve a ejecutar

  return (
    <main>
      <h1>Personajes de Rick and Morty</h1>

      <div>
        <button onClick={() => setPagina((p) => p - 1)} disabled={pagina === 1 || cargando}>
          ← Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button
          onClick={() => setPagina((p) => p + 1)}
          disabled={pagina === totalPaginas || cargando}
        >
          Siguiente →
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <div className="rejilla">
          {personajes.map((p) => (
            <div key={p.id} className="tarjeta">
              <img src={p.image} alt={p.name} />
              <strong>{p.name}</strong>
              <div>
                {p.species} — {p.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
