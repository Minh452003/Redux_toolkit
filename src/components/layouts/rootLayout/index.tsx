import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import './index.css'
const RootLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default RootLayout