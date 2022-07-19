import React, { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';

const Login: FC = () => {
    const AdminCollectionRef = collection(db, 'admin')
    const [inProcess, setInProcess] = useState<boolean>(false)
    const [wrongPassword, setwrongPassword] = useState<boolean>(false)

    interface UserinputProps {
        username: string
        password: string
    }

    const [Userinput, setUserinput] = useState<UserinputProps>({ 
        username: "",
        password: "" 
    })

    const clearProcess = () => {
        setUserinput((prev: UserinputProps) => ({
            ...prev,
            password: ""
        }))
        setInProcess(false)
    }

    const loginfailed = async () => {
        setwrongPassword(true)
        setInProcess(false)
    }

    useEffect(() => {
        if (localStorage.getItem('auth'))
            window.location.href = '/inventaris'
    }, [])

    const handleLogin = async () => {
        setInProcess(true)
        let success = false
        await getDocs(AdminCollectionRef)
            .then((res: any) => {
                res.docs.map((doc: any) => {
                    if (doc.data().username === Userinput.username && doc.data().password === Userinput.password) {
                        success = true
                        localStorage.setItem("auth", doc.data().password)
                        window.location.href = '/inventaris'
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
                    <div className="col-6 justify-content-center align-items-center d-flex" style={{ marginTop: '45vh' }}>
                        <h1 className="title">Masuk</h1>
                    </div>
                    <div className="col-6" style={{ marginTop: '45vh' }}>
                        <div className="row justify-content-center">
                            <div className="col-8">
                                <div className="form-group">
                                    {
                                        wrongPassword && <label htmlFor="" className="text-danger">Username atau password salah.</label>
                                    }
                                    <input type="text" placeholder="Username" className="form-control mt-2" onChange={(e) => {
                                        setUserinput((prev: UserinputProps) => ({
                                            ...prev,
                                            username: e.target.value
                                        }))
                                    }}
                                    />
                                    <input type="password" placeholder="Password" className="form-control mt-2" onChange={(e) => {
                                        setUserinput((prev: UserinputProps) => ({
                                            ...prev,
                                            password: e.target.value
                                        }))
                                    }}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary float-end mt-2" onClick={() => { handleLogin() }}>
                                        {inProcess ? "Mencoba masuk..." : "Masuk"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '25vh' }}>
                        <div className="col-12 justify-content-center align-items-center d-flex" >
                            <h5>Pengguna baru?<br />
                                <Link to="/register" className="d-flex justify-content-center">
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