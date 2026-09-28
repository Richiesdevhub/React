import MovieCard from "../components/MovieCard"
import {useState} from "react"

function Home() {

    const[searchQuery, setSearchQuery] = useState("");


    const movies = [
        { id: 1, title: "Rick's film", release_date: "2023" },
        { id: 2, title: "Dulce's birthday", release_date: "1980" },
        { id: 3, title: "Another movie", release_date: "1995" },
        { id: 4, title: "Terminator", release_date: "1990" },
        { id: 5, title: "John Wick", release_date: "2020" }

    ]

    const handleSearch = (e) => {
        e.preventDefault(); console.log("Searching for movies...")
    }
    return (
        <div className="Home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="movies-grid">
                {movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
            </div>
        </div>
    );
}

export default Home