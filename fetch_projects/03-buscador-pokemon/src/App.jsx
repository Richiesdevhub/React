// Proyecto 3: Buscador de Pokémon
// Aprendes: construir la URL con lo que escribe el usuario,
// manejar un 404 (Pokémon que no existe) y usar un formulario.
import { useState } from 'react'

export default function App() {
  const [busqueda, setBusqueda] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function buscar(evento) {
    evento.preventDefault()

    // PokeAPI necesita el nombre en minúsculas y sin espacios
    const nombre = busqueda.trim().toLowerCase()
    if (!nombre) return

    setCargando(true)
    setError(null)
    setPokemon(null)

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`
      )

      if (response.status === 404) {
        throw new Error(`No existe ningún Pokémon llamado "${nombre}"`)
      }
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const datos = await response.json()
      setPokemon(datos)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <main>
      <h1>Buscador de Pokémon</h1>

      <form onSubmit={buscar}>
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej.: pikachu o 25"
        />
        <button type="submit" disabled={cargando}>
          Buscar
        </button>
      </form>

      {cargando && <p>Buscando...</p>}
      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div className="tarjeta">
          <h2>
            #{pokemon.id} {pokemon.name}
          </h2>
          {pokemon.sprites.front_default && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )}
          <p>Tipos: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
          {/* La API da la altura en decímetros y el peso en hectogramos */}
          <p>Altura: {pokemon.height / 10} m</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
        </div>
      )}
    </main>
  )
}
