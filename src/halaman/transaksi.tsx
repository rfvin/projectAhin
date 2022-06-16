import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './theme.css'
import '../index.css'

const transaksi = () => {
    return (
        // Sidenav
        <div className="col-4">
            <div className="row justify-content-between ">
                <div className="col-sm-8 theme-sidebar theme-bg-blue">
                    <div className="theme-top-sidebar">
                        <div className="theme-sidebar-menu  mt-2 " >
                            
                            <span className="ms-3">
                            <a href="#" className="bi-box"> Inventaris</a>
                            </span>
                        </div>
                        <div className="theme-sidebar-menu  mt-2" >
                            <span className="ms-3">
                                <a href="#" className="bi-calculator-fill"> Transaksi</a>
                            </span>
                        </div>
                        <div className="theme-sidebar-menu  mt-2" >
                            <span className="ms-3">
                                <a href="#" className="bi-file-earmark-text"> Laporan</a>
                            </span>
                        </div>
                        <div className="theme-bottom-sidebar">
                            <div className="theme-sidebar-menu mt-2">
                                <span className="ms-3">
                                    <a href="#" className="bi-person"> Admin</a>
                                </span>
                            </div>
                            <div className="theme-sidebar-menu mt-2">
                                <span className="ms-3">
                                    <a href="#" className="bi-box-arrow-right">  Log Out</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>


    )
}
    export default transaksi;