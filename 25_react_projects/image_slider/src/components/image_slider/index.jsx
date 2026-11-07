import { use } from "react"
import { state, useState } from "react"
import { useEffect } from "react";

export default function image_slider({ url, limit }) {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrectSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false)


    async function fetchImages(getUrl) {

        try {
            setLoading(true);
            const response = await fetch(getUrl);
            const data = await response.json();

            if (data) {
                setImages(data);
                setLoading(false);
            }

        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (url != '') fetchImages(url)
    }, [url])

    if (loading) {
        return <div>Loading data ! Please wait</div>
    }

    if (errorMsg !== null) {
        return <div>Error occured ! {errorMsg}</div>
    }

    return <div className='container'></div>
}
