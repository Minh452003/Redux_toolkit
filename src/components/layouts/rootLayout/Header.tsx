import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { BiSolidUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

const Header = () => {
    return (
        <header className="top-navbar sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <AiOutlineMenu />
                </label>
                <label className="logo">
                    <img src="https://img.freepik.com/premium-vector/vintage-motorcycle-skull-wing-logo_638909-335.jpg" alt="" width={100} />
                </label>
                <ul className="navbar-nav ml-auto">
                    <li ><Link to={'/'}>Home</Link></li>
                    <li ><Link to={'/'}>Menu</Link></li>
                    <li ><Link to={'/'}>About</Link></li>
                    <li ><Link to={'/'}>Blogs</Link></li>
                    <li ><Link to={'/'}>Contact</Link></li>
                    <span>
                        <input type="checkbox" className="check" />
                        <div className="items btn-camera">
                            <Link style={{ color: 'white' }} to={'/signin'}><PiShoppingCartSimpleFill /></Link>
                        </div>
                        <div className="items btn-image">
                            <Link style={{ color: 'white' }} to={'/signin'}><BiSolidUserCircle /></Link>
                        </div>
                    </span>
                </ul>

            </nav>
        </header>
    )
}

export default Header