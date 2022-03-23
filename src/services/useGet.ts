import {useEffect, useState} from "react";
import http from "../http-common";
import {useNavigate} from "react-router-dom";
import {toLogin, toSelectProject} from "./NavigationService";

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
                    toLogin(navigate)
                } else if (err.response?.status === 403) {
                    toSelectProject(navigate)
                } else if (err.response?.status === 400 || err.response?.status === 500) {
                    navigate(onError)
                } else {
                    alert(err.message)
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => refetch(), [url])

    return {data, loading, refetch}
}

export default useGet
