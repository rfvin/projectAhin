import React, { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login: FC = () => {
    const AdminCollectionRef = collection(db, 'admin')
    const [inProcess, setInProcess] = useState<boolean>(false)
    const [wrongPassword, setwrongPassword] = useState<boolean>(false)

    interface UserinputProps {
        password: string
    }

    const [Userinput, setUserinput] = useState<UserinputProps>({ password: "" })

    const clearProcess = () => {
        setUserinput((prev: UserinputProps) => ({
            ...prev,
            password: ""
        }))
        setInProcess(false)
    }

    const loginfailed = () => {
        setwrongPassword(true)
        setInProcess(false)
        setTimeout(() => {
            setwrongPassword(false)
        }, 2000)
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
                    if (doc.data().password === Userinput.password) {
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
                    <div className="col-6 justify-content-center align-items-center d-flex" style={{ marginTop: '300px' }}>
                        <div className="masuk">Masuk</div>
                    </div>
                    <div className="col-6" style={{ marginTop: '360px' }}>
                        <div className="row justify-content-center">
                            <div className="col-8">
                                <div className="form-group">
                                    {
                                        wrongPassword && <label htmlFor="" className="text-danger">Password Salah</label>
                                    }
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
                    <div className="row" style={{ marginTop: '100px' }}>
                    <div className="col-12 justify-content-center align-items-center d-flex" >
                        <p>Pengguna baru?</p><br/>
                    </div>
                    <Link to="/" className=" d-flex justify-content-center">
                            Daftar
                        </Link>
                </div>
                </div>
            </div>
        </>
    )
}
export default Login