// Proyecto 2: Perro aleatorio
// Aprendes: hacer fetch al pulsar un botón (no solo al cargar la página)
// y leer un campo concreto del JSON.
import { useState } from 'react'

const URL = 'https://dog.ceo/api/breeds/image/random'

export default function App() {
  const [imagen, setImagen] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function obtenerPerro() {
    setCargando(true)
    setError(null)

    try {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      // La API responde: { "message": "https://...jpg", "status": "success" }
      const datos = await response.json()
      setImagen(datos.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main>
      <h1>Perro aleatorio</h1>
      <button onClick={obtenerPerro} disabled={cargando}>
        {cargando ? 'Buscando...' : 'Mostrar un perro'}
      </button>

      {error && <p className="error">{error}</p>}

      {imagen && (
        <div>
          <img src={imagen} alt="Perro aleatorio" />
        </div>
      )}
    </main>
  )
}
