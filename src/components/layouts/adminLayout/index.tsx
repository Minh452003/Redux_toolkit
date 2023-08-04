import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';
import { BsFillHouseDashFill } from 'react-icons/bs';
import { TbBrandProducthunt } from 'react-icons/tb';
import { MdCategory } from 'react-icons/md';
import { FaBlogger } from 'react-icons/fa';
import { AiFillMessage, AiOutlineComment, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { RiLogoutCircleLine } from 'react-icons/ri';

const AdminLayout = () => {
    const [isSidebarHidden, setSidebarHidden] = useState<boolean>(false);

    const toggleSidebar = () => {
        setSidebarHidden(prevState => !prevState);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 576) {
                setSidebarHidden(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li .a');

        allSideMenu.forEach(item => {
            const li = item.parentElement;

            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement?.classList.remove('active');
                })
                li?.classList.add('active');
            })
        });
    }, [])

    return (
        <div>
            <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
                <Link className="brand" to={'/'}>
                    <img src="https://i.pinimg.com/170x/6b/62/20/6b6220e809e48ee2226f725edfcbc957.jpg" className="img" alt="" />
                    <span className="text">AdminBooK</span>
                </Link>
                <ul className="side-menu top">
                    <li className="active">
                        <Link to={'dashboard'} className="a">
                            <BsFillHouseDashFill />
                            <span className="text1">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'products'} className="a">
                            <TbBrandProducthunt />
                            <span className="text1">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'categories'} className="a">
                            <MdCategory />
                            <span className="text1">Categories</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="blogs" className="a">
                            <FaBlogger />
                            <span className="text1">Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="user" className="a">
                            <AiOutlineUser />
                            <span className="text1">Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="comments" className="a">
                            <AiOutlineComment />
                            <span className="text1">Comments</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="bill" className="a">
                            <AiOutlineShoppingCart />
                            <span className="text1">Carts</span>
                        </Link>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <Link to="#" className="logout">
                            <RiLogoutCircleLine />
                            <span className="text1">Logout</span>
                        </Link>
                    </li>
                </ul>
            </section>

            <section id="content">
                <nav>
                    <span className="menu" onClick={toggleSidebar}><AiOutlineMenu /></span>
                    <Link to="#" className="nav-link"></Link>
                    <form>
                        {/* ... your search form content ... */}
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    <label htmlFor="switch-mode" className="switch-mode"></label>
                    <Link to="#" className="notification">
                        <AiFillMessage />
                        <span className="num">8</span>
                    </Link>
                    <Link to="#" className="profile">
                        <img src="https://i.pinimg.com/170x/6b/62/20/6b6220e809e48ee2226f725edfcbc957.jpg" alt="" />
                    </Link>
                </nav>
                <main>
                    <Outlet />
                </main>
            </section>
        </div>
    );
}

export default AdminLayout;
