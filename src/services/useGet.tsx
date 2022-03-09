import {useEffect, useState} from "react";
import http from "../http-common";
import {useNavigate} from "react-router-dom";

function useGet<T>(url: string, initialData: T, onError: string) {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const refetch = () => {
        setLoading(true)

        http.get(url)
            .then(res => setData(res.data))
            .catch(err => {
                if (err.response?.status === 401) {
                    navigate("/login")
                } else if (err.response?.status === 400 || err.response?.status === 500) {
                    navigate(onError)
                } else {
                    console.error(err)
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => refetch(), [url])

    return {data, loading, refetch}
}

export default useGet
