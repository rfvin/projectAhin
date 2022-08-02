import React, { FC } from "react";
import './theme.css'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from "react-router-dom";

interface Props {
    children: React.ReactElement,
    title: string,
    subtitle: string
}

const THEME: FC<Props> = ({ title, subtitle, children }) => {
    const Route = useLocation()

    const Logout = () => {
        localStorage.removeItem('auth')
        window.location.href = '/'
    }

    return (
        <>
            <div className="row justify-content-between">
                <div className="col-2 theme-sidebar blue">
                    <div className="theme-top-sidebar">
                        <Link to="/supplier">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/supplier' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-house-door"></i>
                                <span className="ms-5">Home</span>
                            </div>
                        </Link>
                        <Link to="/pembelian">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/penjualan' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-plus-square"></i>
                                <span className="ms-5">Pembelian</span>
                            </div>
                        </Link>
                        <Link to="/penjualan">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/penjualan' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-calculator"></i>
                                <span className="ms-5">Penjualan</span>
                            </div>
                        </Link>
                        <Link to="/laporan">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/laporan' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-file-earmark-text"></i>
                                <span className="ms-5">Laporan</span>
                            </div>
                        </Link>

                    </div>

                    <Link to="/admin">
                        <div className="theme-bottom-sidebar">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/admin' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-person"></i>
                                <span className="ms-5">Admin</span>
                            </div>
                        </div>
                    </Link>

                    <div className="theme-bottom-sidebar">
                        <div className="theme-sidebar-menu" onClick={() => Logout()}>
                            <i className="bi-box-arrow-in-right"></i>
                            <span className="ms-5">Log Out</span>
                        </div>
                    </div>

                </div>
                <div className="col-10 p-5">
                    <div className="row mt-1">
                        <div className="col-12 theme-title">
                            {title}
                        </div>
                        <div className="col-12 theme-subtitle">
                            {subtitle}
                        </div>
                    </div>
                    {children}
                </div>
            </div >
        </>
    )
}

export default THEME