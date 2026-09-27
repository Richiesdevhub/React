import './App.css'
import MovieCard from "./components/MovieCard"

function App() {
  const movieNumber=1

  return (
    <>
    {movieNumber===2 &&
      (<MovieCard movie={{title:"Rick's film", release_date:"2023"}} />)
    }
    // :
    // (<MovieCard movie={{title:"Dulce's birthday", release_date:"1980"}} />)
    </>
  )
}

function Text({text}) {
  return (
    <div>{text}</div>
    )
    }
export default App
