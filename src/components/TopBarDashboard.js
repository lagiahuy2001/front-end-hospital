import {Notifications, AccountCircle, Home} from '@mui/icons-material';
import {Link, useNavigate} from "react-router-dom";
import {Avatar, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {statusLoginActions} from "../store/statusLoginSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "../plugins/axios";

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
const TopBarDashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const name = useSelector(state => state.statusLogin.name);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        axios.get('/logout').then((response) => {
            dispatch(statusLoginActions.logout())
            handleMenuClose();
        }).then(() => {navigate('/')})
    }

    return(
        <div className="topBarDashboard">
            <div className="topBarWrapper">
                <div className="topLeft">
                    <div className="topBarIconContainer">
                        <Link to="" className="link"><Home/></Link>
                    </div>
                </div>
                <div className="topRight">
                    <div className="topBarIconContainer">
                        <Notifications className="iconNotifications"/>
                    </div>
                    <div className="topBarIconContainer">
                        <Avatar {...stringAvatar(name ? name : 'user')} onClick={handleProfileMenuOpen}/>
                        <Menu
                            anchorEl={anchorEl}
                            id={menuId}
                            keepMounted
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                        >
                            <MenuItem>
                                <Link to={"/"} className="nav-link active">Trang bệnh viện</Link>
                            </MenuItem>
                            <MenuItem onClick={logout}>Đăng xuất</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TopBarDashboard