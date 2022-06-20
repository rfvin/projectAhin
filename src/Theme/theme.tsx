import React, {FC} from "react";
import {Link, useLocation} from 'react-router-dom';
import './theme.css'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Props {
    children: React.ReactElement,
    title: string,
    subtitle: string,
    toast?: string
}

const THEME: FC<Props> = ({children,title,subtitle}) => {
    return (
        <>
            <div className="row justify-content-between">
                <div className="col-2 theme-sidebar theme-bg-blue">
                    <div className="theme-top-sidebar">

                            <div
                                className={`theme-sidebar-menu mt-2`}>
                                <i className="bi-box"></i>
                                <span className="ms-3">Inventaris</span>
                            </div>


                            <div
                                className={`theme-sidebar-menu mt-2`}>
                                <i className="bi-calculator-fill"></i>
                                <span className="ms-3">Transaksi</span>
                            </div>


                            <div
                                className={`theme-sidebar-menu mt-2`}>
                                <i className="bi-file-earmark-text"></i>
                                <span className="ms-3">Laporan</span>
                            </div>

                    </div>
                    <div className="theme-bottom-sidebar">

                            <div
                                className={`theme-sidebar-menu mt-2`}>
                                <i className="bi-person"></i>
                                <span className="ms-3">Admin</span>
                            </div>
                        <div className="theme-sidebar-menu mt-2" onClick={() => {

                        }}>
                            <i className="bi-box-arrow-right"></i>
                            <span className="ms-3">Log Out</span>
                        </div>
                    </div>
                </div>
                <div className="col-10 p-5">
                    <div className="row mt-5">
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