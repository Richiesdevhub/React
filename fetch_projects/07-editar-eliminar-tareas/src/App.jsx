// Proyecto 7: Tareas — GET, PATCH y DELETE
// Aprendes: los otros métodos HTTP. PATCH para modificar un campo
// y DELETE para borrar. Luego actualizamos el estado local.
// Nota: JSONPlaceholder simula los cambios pero no los guarda;
// por eso actualizamos la lista en el estado de React.
import { useEffect, useState } from 'react'

const BASE = 'https://jsonplaceholder.typicode.com/todos'

export default function App() {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // GET: cargamos solo 10 tareas con el parámetro _limit
  useEffect(() => {
    const controller = new AbortController()

    fetch(`${BASE}?_limit=10`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        return response.json()
      })
      .then((datos) => {
        setTareas(datos)
        setCargando(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setCargando(false)
        }
      })

    return () => controller.abort()
  }, [])

  // PATCH: cambiar solo el campo "completed"
  async function alternarCompletada(tarea) {
    setError(null)
    try {
      const response = await fetch(`${BASE}/${tarea.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !tarea.completed }),
      })
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)

      const actualizada = await response.json()
      setTareas((prev) => prev.map((t) => (t.id === tarea.id ? actualizada : t)))
    } catch (err) {
      setError(err.message)
    }
  }

  // DELETE: borrar la tarea
  async function eliminar(id) {
    setError(null)
    try {
      const response = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)

      setTareas((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (cargando) return <p>Cargando tareas...</p>

  return (
    <main>
      <h1>Mis tareas</h1>
      {error && <p className="error">{error}</p>}
      {tareas.length === 0 && <p>No quedan tareas.</p>}
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <label>
              <input
                type="checkbox"
                checked={tarea.completed}
                onChange={() => alternarCompletada(tarea)}
              />
              <span style={{ textDecoration: tarea.completed ? 'line-through' : 'none' }}>
                {tarea.title}
              </span>
            </label>
            <button onClick={() => eliminar(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
