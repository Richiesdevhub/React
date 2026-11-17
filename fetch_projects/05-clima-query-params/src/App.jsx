// Proyecto 5: Clima actual con Open-Meteo (sin API key)
// Aprendes: construir parámetros de consulta con URLSearchParams
// y encadenar dos fetch (primero la ciudad → coordenadas, luego el clima).
import { useState } from 'react'

export default function App() {
  const [ciudad, setCiudad] = useState('')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function consultar(evento) {
    evento.preventDefault()
    if (!ciudad.trim()) return

    setCargando(true)
    setError(null)
    setResultado(null)

    try {
      // 1) Geocodificación: nombre de ciudad → latitud y longitud
      const paramsGeo = new URLSearchParams({
        name: ciudad.trim(),
        count: '1',
        language: 'es',
      })
      const resGeo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?${paramsGeo}`
      )
      if (!resGeo.ok) throw new Error(`Error HTTP: ${resGeo.status}`)
      const datosGeo = await resGeo.json()

      // Si no encuentra nada, la propiedad "results" no viene en la respuesta
      if (!datosGeo.results || datosGeo.results.length === 0) {
        throw new Error('No se encontró esa ciudad')
      }
      const lugar = datosGeo.results[0]

      // 2) Clima actual con esas coordenadas
      const paramsClima = new URLSearchParams({
        latitude: String(lugar.latitude),
        longitude: String(lugar.longitude),
        current: 'temperature_2m,wind_speed_10m',
      })
      const resClima = await fetch(`https://api.open-meteo.com/v1/forecast?${paramsClima}`)
      if (!resClima.ok) throw new Error(`Error HTTP: ${resClima.status}`)
      const datosClima = await resClima.json()

      setResultado({
        nombre: lugar.name,
        pais: lugar.country,
        temperatura: datosClima.current.temperature_2m,
        unidadTemp: datosClima.current_units.temperature_2m,
        viento: datosClima.current.wind_speed_10m,
        unidadViento: datosClima.current_units.wind_speed_10m,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main>
      <h1>Clima actual</h1>
      <form onSubmit={consultar}>
        <input
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Ej.: Guadalajara"
        />
        <button type="submit" disabled={cargando}>
          Consultar
        </button>
      </form>

      {cargando && <p>Consultando...</p>}
      {error && <p className="error">{error}</p>}

      {resultado && (
        <div className="tarjeta">
          <h2>
            {resultado.nombre}, {resultado.pais}
          </h2>
          <p>
            Temperatura: {resultado.temperatura} {resultado.unidadTemp}
          </p>
          <p>
            Viento: {resultado.viento} {resultado.unidadViento}
          </p>
        </div>
      )}
    </main>
  )
}
