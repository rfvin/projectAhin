import React, { useState } from "react";
import '../index.css';
import { Link } from "react-router-dom";
import '../Theme/theme.css';



const Landing_Page = () => {
    
    const [username , setUsername] = useState(null);
    const [password,setPassword] = useState(null)




    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-item-center d-flex justify-content-center">
                    <h1 className="daftar">Daftar</h1>
                </div>
            </div>
            <div className="row">
            <div className="col-12 align-item-center ">
                    <h5 className="text-center margintop">Untuk memulai menggunakan aplikasi,<br/>
                    Silahkan masukkan password kedalam colom input terlebih dahulu
                    </h5>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4">
                <label htmlFor=""  className="form-label mt-5">Username :     </label>
                    <input type="text" maxLength={12} className="form-control" placeholder="Username"/>

                    <label htmlFor="" className="form-label mt-3">Password :     </label>
                    <input type="password" maxLength={12} className="form-control"  placeholder="Password"/>
                </div>
            </div>
            <div className="row">
            <h5 className="text-center mt-5">Jika sudah, silahkan tekan tombol Daftar dibawah<br/>
                    untuk mulai menggunakan aplikasi
                    </h5>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4 center">
                    <button className="btn btn-primary">Daftar</button>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5">Sudah Daftar? <br/>
                    <Link to="/">
                        Masuk
                    </Link>
                </h5>
            </div>
        </div>
    )
}

export default Landing_Page