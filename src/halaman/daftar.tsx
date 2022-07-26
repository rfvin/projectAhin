import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import '../index.css'
import { async, isEmpty } from "@firebase/util";

const Daftar = () => {
    const AdminCollectionRef = collection(db, 'admin')
    const [inProcess, setInProcess] = useState<boolean>(false)
    const [userExists, setUserExists] = useState<boolean>(false)
    const [differentPassword, setDifferentPassword] = useState<boolean>(false)
    const [fieldEmpty, setFieldEmpty] = useState<boolean>(false)

    // Isi input
    interface UserinputProps {
        username: string
        password: string
        konfirmasi_password: string
    }

    const [Userinput, setUserinput] = useState<UserinputProps>({
        username: "",
        password: "",
        konfirmasi_password: ""
    })

    // Validasi apakah kosong, username terdaftar, register gagal
    const checkUser = async () => {
        setInProcess(true)
        try {
            const result = await getDocs(AdminCollectionRef)
            const checkUsers = result.docs.find((doc: any) => doc.data().username === Userinput.username)

            if (
                Userinput.username === '' || Userinput.password === '' || Userinput.konfirmasi_password === ''
            ) { setInProcess(false); setFieldEmpty(true); return <label htmlFor="" className="text-danger align-self-center justify-content-center d-flex mt-3">Mohon isi seluruh kolom dibawah ini.</label> }
            else if (
                Userinput.password != Userinput.konfirmasi_password
            ) { setInProcess(false); setDifferentPassword(true); return <label htmlFor="" className="text-danger align-self-center justify-content-center d-flex mt-3"><strong>Konfirmasi Password</strong> berbeda, mohon agar dapat disamakan.</label> }
            else {
                if (checkUsers) { setInProcess(false); setUserExists(true); return <label htmlFor="" className="text-danger align-self-center justify-content-center d-flex mt-3"><strong>Konfirmasi Password</strong> berbeda, mohon agar dapat disamakan.</label> }
                else { setInProcess(false); window.location.href = '/pemulihan' }
            }

        }
        catch (error) {
            registerFailed()
        }
    }

    const registerFailed = async () => {
        setInProcess(false)
        return <label>Gagal mendaftar, silahkan coba mendaftar ulang.</label>
    }

    // useEffect(() => {
    //     checkUser()
    // }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-item-center d-flex justify-content-center" style={{ marginTop: '10vh' }}>
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
                    <div className="form-group">
                        {
                            
                        }
                        <input type="text" className="mt-3 form-control" placeholder="Username" onChange={(e) => {
                            setUserinput((prev: UserinputProps) => ({
                                ...prev,
                                username: e.target.value
                            }))
                        }}
                        />
                        <input type="password" className="mt-3 form-control" placeholder="Password" onChange={(e) => {
                            setUserinput((prev: UserinputProps) => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }}
                        />
                        <input type="password" className="mt-3 form-control" placeholder="Konfirmasi Password" onChange={(e) => (
                            setUserinput((prev: UserinputProps) => ({
                                ...prev,
                                konfirmasi_password: e.target.value
                            }))
                        )}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5">Jika sudah, silahkan tekan tombol Daftar dibawah<br />
                    untuk mulai menggunakan aplikasi.
                </h5>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4 center">
                    <button className="mt-2 btn btn-primary" onClick={() => checkUser()}>
                        {inProcess ? "Mendaftar..." : "Lanjut"}
                    </button>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5">Sudah Daftar?<br />
                    <Link to="/masuk">
                        Masuk
                    </Link>
                </h5>
            </div>
        </div>
    )
}

export default Daftar