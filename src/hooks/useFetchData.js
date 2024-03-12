import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [modal, setModal] = useState(false); // Changed initial state to false
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setModal(true);
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setModal(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    const refetchData = async () => {
        fetchData();
    };

    return { data, modal, setModal, error, refetchData };
};

export default useFetchData;
