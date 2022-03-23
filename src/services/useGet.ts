import {useEffect, useState} from "react";
import http from "../http-common";
import {useNavigate} from "react-router-dom";
import {toLogin, toSelectProject} from "./NavigationService";
import {AxiosError} from "axios";

function useGet<T>(url: string, initialData: T, onError: string) {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const refetch = () => {
        setLoading(true)

        http.get(url)
            .then(res => setData(res.data))
            .catch(err => handleError(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        let isMounted = true
        setLoading(true)

        http.get(url)
            .then(res => isMounted && setData(res.data))
            .catch(err => handleError(err))
            .finally(() => isMounted && setLoading(false))

        return () => {
            isMounted = false
        }
    }, [navigate, onError, url])

    const handleError = (err: AxiosError) => {
        if (err.response?.status === 401) {
            toLogin(navigate)
        } else if (err.response?.status === 403) {
            toSelectProject(navigate)
        } else if (err.response?.status === 400 || err.response?.status === 500) {
            navigate(onError)
        } else {
            alert(err.message)
        }
    }

    return {data, loading, refetch}
}

export default useGet
