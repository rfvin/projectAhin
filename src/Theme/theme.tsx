import React, { FC } from "react";
import './theme.css'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link , useLocation} from "react-router-dom";



interface Props {
    children: React.ReactElement,
    title: string,
    subtitle: string,
    toast?: string
}

const THEME: FC<Props> = ({ title, subtitle, children }) => {
    const Route = useLocation()
    return (
        <>
            <div className="row justify-content-between">
                <div className="col-2 theme-sidebar blue">
                    <div className="theme-top-sidebar">
                        <Link to = "/inventaris">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/inventaris' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-box"></i>
                                <span className="ms-5">Inventaris</span>
                            </div>
                        </Link>
                        
                        <Link to = "/transaksi">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/transaksi' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-calculator"></i>
                                <span className="ms-5">Transaksi</span>
                            </div>
                        </Link>
                        
                        <Link to = "/laporan">
                        <div
                            className={`theme-sidebar-menu ${Route.pathname === '/laporan' ? 'theme-sidebar-menu-active' : ''}`}>
                            <i className="bi-file-earmark-text"></i>
                            <span className="ms-5">Laporan</span>
                        </div>
                        </Link>
                        
                    </div>

                    <Link to = "/admin">
                        <div className="theme-bottom-sidebar">
                            <div
                                className={`theme-sidebar-menu ${Route.pathname === '/admin' ? 'theme-sidebar-menu-active' : ''}`}>
                                <i className="bi-person"></i>
                                <span className="ms-5">Admin</span>
                            </div>
                        </div>
                    </Link>
                    
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
            </div>
        </>
    )
}

export default THEME