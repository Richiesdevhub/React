// Proyecto 8: Búsqueda en vivo con "debounce" y AbortController
// Aprendes: esperar a que el usuario deje de escribir antes de pedir datos
// y cancelar la petición anterior si llega una nueva búsqueda.
import { useEffect, useState } from 'react'

export default function App() {
  const [texto, setTexto] = useState('')
  const [resultados, setResultados] = useState([])
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('Escribe un nombre, por ejemplo "rick"')

  useEffect(() => {
    const termino = texto.trim()
    if (!termino) {
      setResultados([])
      setMensaje('Escribe un nombre, por ejemplo "rick"')
      return
    }

    const controller = new AbortController()

    // Debounce: esperamos 500 ms desde la última tecla
    const temporizador = setTimeout(async () => {
      setCargando(true)
      setMensaje('')

      try {
        const params = new URLSearchParams({ name: termino })
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?${params}`,
          { signal: controller.signal }
        )

        // Esta API responde 404 cuando no hay coincidencias
        if (response.status === 404) {
          setResultados([])
          setMensaje('Sin resultados')
          return
        }
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)

        const datos = await response.json()
        setResultados(datos.results)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setMensaje(`Error: ${err.message}`)
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false)
        }
      }
    }, 500)

    // Limpieza: si el texto cambia antes de tiempo, cancelamos
    // el temporizador y la petición que estuviera en curso.
    return () => {
      clearTimeout(temporizador)
      controller.abort()
    }
  }, [texto])

  return (
    <main>
      <h1>Búsqueda en vivo</h1>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar personaje..."
      />

      {cargando && <p>Buscando...</p>}
      {mensaje && <p>{mensaje}</p>}

      <ul>
        {resultados.map((p) => (
          <li key={p.id}>
            {p.name} — {p.species}
          </li>
        ))}
      </ul>
    </main>
  )
}
