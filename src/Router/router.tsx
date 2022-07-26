import React, {FC} from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "../halaman/login";
import Admin from "../halaman/admin";
import Laporan from "../halaman/laporan/laporan";
import Inventaris from "../halaman/home/inventaris";
import Supplier from "../halaman/home/suppplier";
import Customer from "../halaman/home/customer";
import Transaksi from "../halaman/transaksi";
import Daftar from "../halaman/daftar";
import ProtectedRoutes from "./protected_routes";
import Lupa_Password from "../halaman/lupa_password";
import Pemulihan from "../halaman/pemulihan";


const RouterPath =  () => {
    return(
        <BrowserRouter>
            <Routes>
                    <Route path="/inventaris" element = {
                        <ProtectedRoutes>
                            <Inventaris/>
                        </ProtectedRoutes>
                        
                    }/>
                     <Route path="/customer" element = {
                        <ProtectedRoutes>
                        <Customer/>
                        </ProtectedRoutes>
                    }/>
                     <Route path="/supplier" element = {
                        <ProtectedRoutes>
                        <Supplier/>
                        </ProtectedRoutes>
                    }/>
                    <Route path="/transaksi" element = {
                        <ProtectedRoutes>
                            <Transaksi/>
                        </ProtectedRoutes>
                        
                    }/>
                    <Route path="/laporan" element = {
                        <ProtectedRoutes>
                        <Laporan/>
                        </ProtectedRoutes>
                    }/>
                    <Route path="/admin" element = {
                        <ProtectedRoutes>
                        <Admin/>
                        </ProtectedRoutes>
                    }/>

                    <Route path="/daftar" element={
                        <Daftar/>
                    }>
                    </Route>

                    <Route path="/lupa_password" element={
                        <Lupa_Password/>
                    }>
                    </Route>

                    <Route path="/pemulihan" element={
                        <Pemulihan/>
                    }></Route>

                    <Route path="/" element = {
                        <Login/>
                    }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterPath