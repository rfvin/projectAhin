import React, {FC} from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "../halaman/login";
import Admin from "../halaman/admin";
import Laporan from "../halaman/laporan";
import Inventaris from "../halaman/inventaris";
import Transaksi from "../halaman/transaksi";
import ProtectedRoutes from "./protected_routes";
import { Navigate } from "react-router-dom";

const RouterPath =  () => {
    return(
        <BrowserRouter>
            <Routes>
                    <Route path="/inventaris" element = {
                        <ProtectedRoutes>
                            <Inventaris/>
                        </ProtectedRoutes>
                        
                    }/>
                    <Route path="transaksi" element = {
                        <ProtectedRoutes>
                            <Transaksi/>
                        </ProtectedRoutes>
                        
                    }/>
                    <Route path="laporan" element = {
                        <ProtectedRoutes>
                        <Laporan/>
                        </ProtectedRoutes>
                    }/>
                    <Route path="admin" element = {
                        <ProtectedRoutes>
                        <Admin/>
                        </ProtectedRoutes>
                    }/>
                    <Route path="login" element = {
                        <Login/>
                    }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterPath