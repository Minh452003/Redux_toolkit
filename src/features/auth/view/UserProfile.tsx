import { useGetUserByIdQuery } from "@/api/authApi";
import { getDecodedAccessToken } from "@/api/decoder";
import { FaSignInAlt } from "react-icons/fa";
import { TbBrandProducthunt } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"
import { BsCartCheckFill } from "react-icons/bs";
import { Skeleton } from "antd";
import { GrUserAdmin } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";


const UserProfile = () => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const navigate = useNavigate();
    const { data: user, isLoading: userSuccess } = useGetUserByIdQuery(id);
    const onHandleOut = () => {
        localStorage.removeItem("accessToken")
        navigate('/')
    }
    if (userSuccess) return <Skeleton />;
    return (
        <div>
            <div className="container bootstrap snippets bootdey">
                <div className="row">
                    <div className="profile-nav col-md-3">
                        <div className="panel">
                            <div className="user-heading round">
                                <a href="#">
                                    <img src={user?.image.url} alt="" />
                                </a>
                                <h1>{user?.name}</h1>
                                <p>{user?.email}</p>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link to={'/profile'} className="a">
                                        <TbBrandProducthunt className="float-left mt-2" />
                                        <span className="text1">Profile</span>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={'/order'} className="a ">
                                        <BsCartCheckFill className="float-left mt-2" />
                                        <span className="text1">Order</span>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={'/signin'} className="a ">
                                        <FaSignInAlt className="float-left mt-2" />
                                        <span className="text1">Sign In</span>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={'/signup'} className="a ">
                                        <FiUserPlus className="float-left mt-2" />
                                        <span className="text1">Sign Up</span>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={'signup'} className="a ">
                                        <BiLogOut className="text-danger float-left mt-2" />
                                        <span className="text1 text-danger" onClick={() => onHandleOut()}>LogOut</span>
                                    </Link>
                                </li>
                                {user && user?.role === 'admin' && (
                                    <li className="list-group-item">
                                        <Link to={'/admin'} className="a ">
                                            <GrUserAdmin className="float-left mt-2" />
                                            <span className="text1">Login admin</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="profile-info col-md-9">
                        <div className="panel">
                        </div>
                        <div className="panel">
                            <div className="bio-graph-heading">
                                Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum. Aliquam ac magna metus.
                            </div>
                            <div className="panel-body bio-graph-info">
                                <h1>Bio Graph</h1>
                                <div className="row">
                                    <div className="bio-row">
                                        <p><span> Name </span>: {user?.name}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Email </span>: {user?.email}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Address</span>: {user?.address}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Phone</span>: {user?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile