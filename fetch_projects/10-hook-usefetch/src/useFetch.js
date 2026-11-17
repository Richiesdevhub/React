// Custom hook reutilizable: encapsula toda la lógica de fetch
// (datos, carga, error, cancelación y recarga) para usarla en cualquier componente.
import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recargas, setRecargas] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function cargar() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const json = await response.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    cargar()
    return () => controller.abort()
  }, [url, recargas])

  // Cambiar "recargas" vuelve a ejecutar el efecto
  const refetch = () => setRecargas((n) => n + 1)

  return { data, loading, error, refetch }
}
