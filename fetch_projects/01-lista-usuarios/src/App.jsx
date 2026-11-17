// Proyecto 1: Lista de usuarios
// Aprendes: fetch GET dentro de useEffect, estados de carga y error,
// comprobar response.ok y convertir la respuesta con response.json().
import { useEffect, useState } from 'react'

const URL = 'https://jsonplaceholder.typicode.com/users'

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController permite cancelar la petición si el componente se desmonta.
    // (En desarrollo, StrictMode monta/desmonta dos veces: así evitamos efectos duplicados.)
    const controller = new AbortController()

    async function cargarUsuarios() {
      try {
        const response = await fetch(URL, { signal: controller.signal })

        // fetch NO lanza error con 404 o 500: hay que revisar response.ok
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const datos = await response.json()
        setUsuarios(datos)
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

    cargarUsuarios()

    return () => controller.abort()
  }, [])

  if (cargando) return <p>Cargando usuarios...</p>
  if (error) return <p className="error">Ocurrió un error: {error}</p>

  return (
    <main>
      <h1>Lista de usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.name}</strong> — {usuario.email} ({usuario.address.city})
          </li>
        ))}
      </ul>
    </main>
  )
}
