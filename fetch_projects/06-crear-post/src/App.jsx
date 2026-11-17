// Proyecto 6: Crear una publicación (POST)
// Aprendes: enviar datos con fetch usando method, headers y body (JSON.stringify).
// Nota: JSONPlaceholder es una API de pruebas: responde como si guardara
// la publicación (status 201, id 101), pero en realidad no la guarda.
import { useState } from 'react'

export default function App() {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [respuesta, setRespuesta] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  async function enviar(evento) {
    evento.preventDefault()
    setEnviando(true)
    setError(null)
    setRespuesta(null)

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,
          body: contenido,
          userId: 1,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const datos = await response.json()
      setRespuesta({ status: response.status, datos })
      setTitulo('')
      setContenido('')
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main>
      <h1>Crear publicación</h1>
      <form onSubmit={enviar}>
        <div>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            required
          />
        </div>
        <div>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Contenido"
            rows={4}
            required
          />
        </div>
        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Publicar'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {respuesta && (
        <div className="tarjeta">
          <p>Código de estado: {respuesta.status}</p>
          <p>Respuesta del servidor:</p>
          <pre>{JSON.stringify(respuesta.datos, null, 2)}</pre>
        </div>
      )}
    </main>
  )
}
