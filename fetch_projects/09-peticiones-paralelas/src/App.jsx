// Proyecto 9: Perfil de usuario con peticiones en paralelo
// Aprendes: lanzar varias peticiones a la vez con Promise.all
// y esperar a que todas terminen.
import { useEffect, useState } from 'react'

const BASE = 'https://jsonplaceholder.typicode.com'

// Función auxiliar: hace fetch, revisa response.ok y devuelve el JSON
async function obtenerJSON(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Error HTTP ${response.status} en ${url}`)
  return response.json()
}

export default function App() {
  const [idUsuario, setIdUsuario] = useState(1)
  const [perfil, setPerfil] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)

      try {
        // Las tres peticiones salen al mismo tiempo
        const [usuario, posts, tareas] = await Promise.all([
          obtenerJSON(`${BASE}/users/${idUsuario}`, controller.signal),
          obtenerJSON(`${BASE}/posts?userId=${idUsuario}`, controller.signal),
          obtenerJSON(`${BASE}/todos?userId=${idUsuario}`, controller.signal),
        ])
        setPerfil({ usuario, posts, tareas })
      } catch (err) {
        // Si UNA falla, Promise.all falla completo
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
  }, [idUsuario])

  return (
    <main>
      <h1>Perfil de usuario</h1>
      <label>
        Usuario:{' '}
        <select value={idUsuario} onChange={(e) => setIdUsuario(Number(e.target.value))}>
          {/* JSONPlaceholder tiene usuarios con id del 1 al 10 */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </label>

      {cargando && <p>Cargando perfil...</p>}
      {error && <p className="error">{error}</p>}

      {!cargando && !error && perfil && (
        <>
          <div className="tarjeta">
            <h2>{perfil.usuario.name}</h2>
            <p>
              {perfil.usuario.email} · {perfil.usuario.company.name}
            </p>
            <p>
              {perfil.posts.length} publicaciones ·{' '}
              {perfil.tareas.filter((t) => t.completed).length} de {perfil.tareas.length} tareas
              completadas
            </p>
          </div>

          <h3>Publicaciones</h3>
          <ul>
            {perfil.posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
