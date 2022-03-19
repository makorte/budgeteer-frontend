import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setDestination} from "../store/destinationSlice";

function useDestination() {
    const location = useLocation()
    const dispatch = useDispatch()

    dispatch(setDestination(location.pathname))
}

export default useDestination
