import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchData = (url) => {

    const [data, setData] = useState(null);
    const [modal, setModal] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setModal(true)
                const response = await axios.get(url)
                setData(response.data)
            }
            catch (error) {
                setError(error)
            }
            finally {
                setModal(false)
            }
        }

        fetchData()
    }, [url])

    return { data, setData, modal, setModal, error, setError }
}

export default useFetchData