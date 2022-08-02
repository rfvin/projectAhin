import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';

const Login: FC = () => {
    const Admin = collection(db, 'admin')
    const [InProcess, setInProcess] = useState<boolean>(false)
    const [passwordSalah, setPassWordSalah] = useState<boolean>(false)

    interface UserInputProps {
        username: string
        password: string
    }

    const [UserInput, setUserInput] = useState<UserInputProps>({ 
        username: "",
        password: "" 
    })

    const loginfailed = async () => {
        setPassWordSalah(true)
        setInProcess(false)
    }

    const handleLogin = async () => {
        setInProcess(true)
        let success = false
        await getDocs(Admin)
            .then((res: any) => {
                res.docs.map((doc: any) => {
                    if (doc.data().username === UserInput.username && doc.data().password === UserInput.password) {
                        success = true
                        localStorage.setItem("auth", doc.data().password && doc.data().password)
                        window.location.href = '/supplier'
                        return
                    }
                })
            })
        if (success)
            return
        else
            loginfailed()
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 justify-content-center align-items-center d-flex" style={{ marginTop: '40vh' }}>
                        <h1 className="title">Masuk</h1>
                    </div>
                    <div className="col-6" style={{ marginTop: '40vh' }}>
                        <div className="row justify-content-center">
                            <div className="col-8">
                                <div className="form-group">
                                    {
                                        passwordSalah && <label htmlFor="" className="text-danger">Username atau password salah. <Link to="/lupa_password">Lupa Password?</Link>
                                        </label>
                                    }
                                    <input type="text" placeholder="Username" className="form-control mt-2" onChange={(e) => {
                                        setUserInput((prev: UserInputProps) => ({
                                            ...prev,
                                            username: e.target.value
                                        }))
                                    }}
                                    />
                                    <input type="password" placeholder="Password" className="form-control mt-2" onChange={(e) => {
                                        setUserInput((prev: UserInputProps) => ({
                                            ...prev,
                                            password: e.target.value
                                        }))
                                    }}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary float-end mt-2" onClick={() => { handleLogin() }}>
                                        {InProcess ? <div><span className="spinner-border spinner-border-sm me-2"></span>Memproses...</div> : "Masuk"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '30vh' }}>
                        <div className="col-12 justify-content-center align-items-center d-flex" >
                            <h5>Pengguna baru?<br />
                                <Link to="/daftar" className="d-flex justify-content-center">
                                    Daftar
                                </Link>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login