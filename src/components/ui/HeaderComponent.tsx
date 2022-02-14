import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoggedOut} from "../../store/LoginInfosSlice";

export const CONTRACTS = "contracts"

type Props = {
    active?: typeof CONTRACTS
}

const HeaderComponent = ({active}: Props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSignOut = () => {
        localStorage.removeItem("token")
        dispatch(setLoggedOut())
        navigate("/login")
    }

    return (
        <nav className={"bg-emerald-600 w-full p-2"}>
            <div className={"c-flex-middle justify-start"}>
                <div className={"c-flex-middle items-center space-x-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-300" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path
                            d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                              clipRule="evenodd"/>
                    </svg>
                    <Link to={"/dashboard"}
                          className={"text-2xl text-white hover:text-gray-200"}>Budgeteer</Link>
                </div>
                <div className={"flex flex-row flex-grow align-middle justify-center items-center"}>
                    <div className={`c-nav-item space-x-1 ${active == CONTRACTS && "bg-emerald-500 hover:text-gray-200"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <Link to={"/contracts"}>Contracts</Link>
                    </div>
                </div>
                <div className={"flex align-middle space-x-4 mr-2"}>
                    <div
                        className={"c-nav-item"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                        </svg>
                        <Link to={"/selectProject"}>Switch Project</Link>
                    </div>
                    <div
                        className={"c-nav-item"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <p onClick={onSignOut}>Sign out</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderComponent