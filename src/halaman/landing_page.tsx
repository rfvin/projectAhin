import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import '../index.css'
import { Auth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Landing_Page = () => {
    const AdminCollectionRef = collection(db, 'admin')
    
    // Validasi password untuk cek apakah kosong atau sama
    // const validatePassword = () => {
    //     let isValid = true
    //     if (password !== '' && confirmPassword !== ''){
    //         if (password !== confirmPassword) {
    //             isValid = false
    //             setError('Mohon konfirmasi kembali password')
    //         }
    //     }
    // }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-item-center d-flex justify-content-center" style={{marginTop:'15vh'}}>
                    <h1 className="title">Daftar</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 align-item-center ">
                    <h5 className="text-center margintop">Untuk memulai menggunakan aplikasi,<br />
                        Silahkan masukkan password kedalam colom input terlebih dahulu.
                    </h5>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4">
                    <input type="text" maxLength={12} className="mt-5 form-control" placeholder="Username" />
                    <input type="password" maxLength={12} className="mt-3 form-control" placeholder="Password" />
                    <input type="password" maxLength={12} className="mt-3 form-control" placeholder="Konfirmasi Password" />
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5">Jika sudah, silahkan tekan tombol Daftar dibawah<br />
                    untuk mulai menggunakan aplikasi.
                </h5>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4 center">
                    <button className="mt-2 btn btn-primary">Daftar</button>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5">Sudah Daftar?<br />
                    <Link to="/">
                        Masuk
                    </Link>
                </h5>
            </div>
        </div>
    )
}

export default Landing_Page