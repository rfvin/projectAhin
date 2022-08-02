import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import '../index.css'

const Daftar = () => {
    const Admin = collection(db, 'admin')
    const Daftar = collection(db, 'daftar')
    const [inProcess, setInProcess] = useState<boolean>(false)

    interface InputProps {
        username: string
        password: string
        konfirmasi_password: string
    }

    const [input, setInput] = useState<InputProps>({
        username: "",
        password: "",
        konfirmasi_password: ""
    })

    // State data jika lanjut atau tidak jadi mendaftar
    // const loadDaftar = (obj: any) => {
    //     setUserInput((prev: object) => ({
    //         ...prev,
    //         username: obj.username,
    //         password: obj.password,
    //         konfirmasi_password: obj.konfirmasi_password
    //     }))
    // }

    const hapusInput = () => {
        setWarningSudahDaftar(false)
        setWarningBedaPassword(false)
        setWarningInputKosong(false)
        setInput((prev: InputProps) => ({
            ...prev,
            username: "",
            password: "",
            konfirmasi_password: ""
        }))
    }

    // Validasi apakah username sudah terdaftar, konfirmasi password salah, atau input kosong
    const [warningSudahDaftar, setWarningSudahDaftar] = useState<boolean>(false)
    const [warningBedaPassword, setWarningBedaPassword] = useState<boolean>(false)
    const [warningInputKosong, setWarningInputKosong] = useState<boolean>(false)
    const [berhasilDaftar, setBerhasilDaftar] = useState<boolean>(false)

    const cekData = async () => {
        setInProcess(true)
        const cek = await getDocs(Admin)

        const sudahDaftar = cek.docs.find((doc: any) => doc.data().username === input.username)
        const bedaPassword = input.password !== input.konfirmasi_password
        const inputKosong = input.username === '' || input.password === '' || input.konfirmasi_password === ''

        if (sudahDaftar) { setWarningSudahDaftar(true); setInProcess(false) }
        else if (bedaPassword) { setWarningBedaPassword(true); setInProcess(false) }
        else if (inputKosong) { setWarningInputKosong(true); setInProcess(false) }
        else { simpanData(); setBerhasilDaftar(true) }
    }

    const simpanData = () => {
        addDoc(Daftar, input)
            .then(() => {
                hapusInput()
                window.location.href = '/pemulihan'
            })
    }

    useEffect(() => {
        hapusInput()
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-item-center d-flex justify-content-center" style={{ marginTop: '10vh' }}>
                    <h1 className="title">Daftar</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 align-item-center">
                    <h5 className="text-center mt-3">Untuk memulai menggunakan aplikasi,<br />
                        Silahkan masukkan password kedalam colom input terlebih dahulu.
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-5">
                    {
                        warningSudahDaftar ? <label htmlFor="" className="text-danger col-12 align-item-center d-flex justify-content-center">Username sudah terdaftar.</label> :
                            warningBedaPassword ? <label htmlFor="" className="text-danger col-12 align-item-center d-flex justify-content-center">Konfirmasi password tidak sesuai.</label> :
                                warningInputKosong ? <label htmlFor="" className="text-danger col-12 align-item-center d-flex justify-content-center">Mohon lengkapi informasi dibawah ini.</label> :
                                    berhasilDaftar ? <label htmlFor="" className="text-primary col-12 align-item-center d-flex justify-content-center text-center">Berhasil mendaftar<br />Mohon tunggu sebentar...</label> : ""
                    }
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4">
                    <div className="form-group">
                        <input type="text" className="mt-3 form-control" placeholder="Username" onChange={(e) => {
                            setInput((prev: InputProps) => ({
                                ...prev,
                                username: e.target.value
                            }))
                        }}
                        />
                        <input type="password" className="mt-3 form-control" placeholder="Password" onChange={(e) => {
                            setInput((prev: InputProps) => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }}
                        />
                        <input type="password" className="mt-3 form-control" placeholder="Konfirmasi Password" onChange={(e) => (
                            setInput((prev: InputProps) => ({
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
                    <button className="mt-2 btn btn-primary" onClick={() => { cekData() }}>
                        {inProcess ? "Mendaftar..." : "Lanjut"}
                    </button>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center" style={{ marginTop: '12vh' }}>Sudah Daftar?<br />
                    <Link to="/">
                        Masuk
                    </Link>
                </h5>
            </div>
        </div>
    )
}

export default Daftar