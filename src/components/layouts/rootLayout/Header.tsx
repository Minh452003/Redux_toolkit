import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { BiSolidUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { useSearchProductQuery } from '@/api/productApi'

const Header = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = (event: any) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    };
    const handleSearchReset = () => {
        setSearchValue('');
    };
    const { data: searchProducts } = useSearchProductQuery(searchValue);
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
                            <Link style={{ color: 'white' }} to={'/carts'}><PiShoppingCartSimpleFill /></Link>
                        </div>
                        <div className="items btn-image">
                            <Link style={{ color: 'white' }} to={'/profile'}><BiSolidUserCircle /></Link>
                        </div>
                    </span>
                    <form action="">
                        <div className="src-box">
                            <input type="text"
                                placeholder=""
                                value={searchValue}
                                onChange={handleSearchChange} />
                            <button type="reset" onClick={handleSearchReset}></button>
                        </div>
                    </form>
                </ul>
            </nav>
            <div className="search-results float-right">
                {searchValue && searchProducts && searchProducts.docs && searchProducts.docs.length > 0 && (
                    <ul className="list-group">
                        {searchProducts.docs.map((item: any) => (
                            <li className="list-group-item" key={item._id}>
                                <img src={item.image.url} className="image" alt={item.name} />
                                <Link className='a1' to={`/products/${item._id}`}>{item.name}</Link>
                                <p className="price float-right">{item.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </header >
    )
}

export default Header