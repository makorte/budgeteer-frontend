import HeaderComponent from "./HeaderComponent";

const NotFoundPage = () => {
    return (
        <div>
            <HeaderComponent/>
            <div className="container text-center p-5">
                <h3 className="text-danger">404 - Page Not Found!</h3>
            </div>
        </div>
    )
}

export default NotFoundPage
