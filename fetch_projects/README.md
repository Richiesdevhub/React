# 10 proyectos para aprender `fetch` con React + Vite

Cada carpeta es un proyecto independiente de Vite + React (React 19, Vite 8).
Todas las APIs son públicas, gratuitas y **no necesitan API key**.

## Cómo ejecutar cualquiera

```bash
cd 01-lista-usuarios
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).
Necesitas Node.js 20.19+ o 22.12+ (requisito de Vite 8).

## Ruta de aprendizaje (en orden)

| # | Proyecto | API | Qué aprendes |
|---|----------|-----|--------------|
| 01 | Lista de usuarios | JSONPlaceholder | `fetch` GET en `useEffect`, estados de carga/error, `response.ok`, `response.json()` |
| 02 | Perro aleatorio | Dog CEO | `fetch` al pulsar un botón |
| 03 | Buscador de Pokémon | PokeAPI | URL dinámica con lo que escribe el usuario, manejar 404, `encodeURIComponent` |
| 04 | Paginación Rick and Morty | Rick and Morty API | Volver a pedir datos cuando cambia un estado (dependencias de `useEffect`) |
| 05 | Clima actual | Open-Meteo | `URLSearchParams` y dos `fetch` encadenados |
| 06 | Crear publicación | JSONPlaceholder | POST con `method`, `headers` y `body: JSON.stringify(...)` |
| 07 | Editar y eliminar tareas | JSONPlaceholder | PATCH y DELETE, y actualizar el estado local |
| 08 | Búsqueda en vivo | Rick and Morty API | Debounce y cancelar peticiones con `AbortController` |
| 09 | Perfil con peticiones paralelas | JSONPlaceholder | `Promise.all` para varias peticiones a la vez |
| 10 | Hook `useFetch` | PokeAPI + JSONPlaceholder | Crear un custom hook reutilizable con `refetch` |

## Ideas clave que se repiten

1. **`fetch` no lanza error con 404 o 500.** Solo falla si no hay red. Por eso siempre se revisa `response.ok`.
2. **`response.json()` también es asíncrono**: hay que usar `await`.
3. **Limpieza en `useEffect`**: `AbortController` cancela la petición si el componente se desmonta o si cambian las dependencias. En desarrollo, `StrictMode` ejecuta los efectos dos veces a propósito; la limpieza evita resultados duplicados.
4. **JSONPlaceholder es una API falsa**: responde a POST/PATCH/DELETE como si funcionaran, pero no guarda nada. Por eso los proyectos 6 y 7 actualizan el estado de React.
