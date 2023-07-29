import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { BiSolidUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="top-navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        <img src="https://img.freepik.com/premium-vector/vintage-motorcycle-skull-wing-logo_638909-335.jpg" alt="" width={100} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse" id="navbars-rs-food">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><Link className="nav-link" to={'/'}>Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={'/'}>Menu</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={'/'}>About</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={'/'}>Blogs</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={'/'}>Contact</Link></li>
                        </ul>

                    </div>
                    <span>
                        <input type="checkbox" className="check" />
                        <div className="items btn-camera">
                            <Link style={{ color: 'white' }} to={'/signin'}><PiShoppingCartSimpleFill /></Link>
                        </div>
                        <div className="items btn-image">
                            <Link style={{ color: 'white' }} to={'/signin'}><BiSolidUserCircle /></Link>
                        </div>
                    </span>
                </div>

            </nav>
        </header>
    )
}

export default Header