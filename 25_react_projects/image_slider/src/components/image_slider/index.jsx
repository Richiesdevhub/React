import {useState, useEffect } from "react"

//import './style.css'

export default function Image_slider({ url, page=1 , limit=5 }) {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrectSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false)


    async function fetchImages(getUrl) {

        try {
            setLoading(true);
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            console.log("respuesta de la API:", data);

            if (data) {
                setImages(data);
                setLoading(false);
            }

        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (url) fetchImages(url)
    }, [url])

    console.log("images: ",images)

    if (loading) {
        return <div>Loading data ! Please wait</div>
    }

    if (errorMsg !== null) {
        return <div>Error occured ! {errorMsg}</div>
    }

    return <div className='container'></div>
}
