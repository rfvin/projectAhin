import React from "react";
import '../index.css'
import { Link } from "react-router-dom";

const Lupa_Password = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-item-center d-flex justify-content-center" style={{marginTop:'15vh'}}>
                    <h1 className="title">Lupa Password</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 align-item-center ">
                    <h5 className="text-center margintop">Silahkan jawab pertanyaan dibawah ini.
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col-12 align-item-center d-flex justify-content-center">
                    <label htmlFor="" className="text-danger mt-3">Jawaban Pemulihan Anda Salah. </label>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5"><label htmlFor="">Pertanyaan</label>
                </h5>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4 center">
                    <button className="mt-2 btn btn-primary">Submit</button>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5"><br />
                    <Link to="/">
                        Kembali
                    </Link>
                </h5>
            </div>
        </div>
    )
}

export default Lupa_Password
