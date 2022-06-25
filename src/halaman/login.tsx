import React, { FC } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../theme/theme.css'
import '../index.css'

const Login: FC = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 vh-100 justify-content-center align-items-center d-flex">
                    <div className="masuk">Masuk</div>
                </div>
                <div className="col-6 vh-100">
                    <div className="row justify-content-center">
                        <div className="col-8" style={{ marginTop: '45vh' }}>
                            <div className="form-group">
                                {
                                    <label htmlFor="" className="text-danger">Password Salah</label>
                                }
                                <input type="text" placeholder="Password" className="form-control mt-2" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary float-end mt-2">
                                    Masuk
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login