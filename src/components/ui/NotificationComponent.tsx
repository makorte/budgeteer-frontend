import {Transition} from "@headlessui/react";
import React from "react";
import {LOGGED_OUT, REGISTERED} from "../../store/LoginInfosSlice";
import classNames from "classnames";

export const NOTIFICATION_ERROR = "error"
export const NOTIFICATION_SUCCESS = "success"
export const NOTIFICATION_INFO = "info"

type Props = {
    message: string | undefined,
    type: typeof NOTIFICATION_ERROR | typeof NOTIFICATION_SUCCESS | typeof NOTIFICATION_INFO
}

const NotificationComponent = ({message, type}: Props) => {
    return (
        <Transition show={message !== "" && message !== undefined}
                    enter="transition-opacity duration-400"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-800"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className={"m-5 flex align-middle justify-center fixed top-0 left-0 right-0 z-10"}>
            <div
                className={classNames(type === NOTIFICATION_ERROR ? "bg-red-400" : (type === NOTIFICATION_SUCCESS ? "bg-green-400" : "bg-blue-400"), "py-2 px-3 rounded-md flex flex-row align-middle justify-center bg-opacity-80 items-center")}>
                {type === NOTIFICATION_ERROR ? <svg xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-red-900 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg> : type === NOTIFICATION_SUCCESS ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-900 mr-2" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900 mr-2" fill="none"
                                  viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>}
                <p className={classNames(type === NOTIFICATION_ERROR ? "text-red-900" : (type === NOTIFICATION_SUCCESS ? "text-green-900" : "text-blue-900"), "text-sm font-medium text-center")}>{message === LOGGED_OUT ? "You've been logged out!" : message === REGISTERED ? "You've been successfully registered!" : message}
                </p>
            </div>
        </Transition>
    )

}

export default NotificationComponent