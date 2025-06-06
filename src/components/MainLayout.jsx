import "./mainLayout.scss"
import Header from "./organics/header/Header.jsx";
import Footer from "./organics/footer/Footer.jsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header/>
            <main className="main">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
};

export default MainLayout