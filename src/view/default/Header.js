import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {Avatar, Menu, MenuItem} from "@mui/material";
import {statusLoginActions} from '../../store/statusLoginSlice'
import logo from '../../assets/logo.png'
import axios from "../../plugins/axios";


function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

const Header = () => {
    const isLogin = useSelector(state => state.statusLogin.isLogin);
    const role = useSelector(state => state.statusLogin.role);
    const name = useSelector(state => state.statusLogin.name);
    const [path, setPath] = useState("")
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() =>{
        if(role === "ADMIN"){
            setPath("/admin")
        } else if(role === "PATIENT"){
            setPath("/patient/profile")
        } else if(role === "STAFF"){
            setPath("/staff")
        } else if(role === "TESTER"){
            setPath("/tester")
        } else if(role === "COORDINATOR"){
            setPath("/coordinator")
        }
    },[role])

    const logout = () => {
        axios.get('/logout').then((response) => {
            dispatch(statusLoginActions.logout())
            handleMenuClose();
            navigate("/")
        })
    }


    return (
        <header style={{borderBlockEnd: "solid 2px #008000", zIndex: 11}}>
            <nav className="navbar navbar-expand-lg" style={{backgroundColor: "white", height: "125px"}}>
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><img src={logo} style={{height: "90px", width: "104px"}}/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/guide">Hướng dẫn</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/contact">Liên hệ</Link>
                            </li>
                            {(role === "PATIENT" || role == "") && <li className="nav-item">
                                <Link className="nav-link active" aria-current="page"
                                      to={isLogin ? "/patient/form-test-register" : "/test-register"}>Đăng ký xét
                                    nghiệm</Link>
                            </li>}
                            <li className="nav-item" hidden={isLogin}>
                                <Link className="nav-link active" aria-current="page" to="/login">Đăng nhập</Link>
                            </li>
                            <li className="nav-item" hidden={!isLogin}>
                                <Avatar {...stringAvatar(name ? name : 'user')} onClick={handleProfileMenuOpen}/>
                                <Menu
                                    anchorEl={anchorEl}
                                    id={menuId}
                                    keepMounted
                                    open={isMenuOpen}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link to={path}
                                              className="nav-link active">{role === "PATIENT" ? "Tài khoản" : "Trang quản lý"}</Link>
                                    </MenuItem>
                                    <MenuItem onClick={logout}>Đăng xuất</MenuItem>
                                </Menu>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header;
