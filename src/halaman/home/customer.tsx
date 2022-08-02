import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import THEME from "../../Theme/theme";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../index.css';

const Customer: FC = () => {
    const Customer = collection(db, 'customer')
    const [inProcess, setInProcess] = useState<boolean>(false)
    const [daftarCustomer, setDaftarCustomer] = useState<Array<object>>([])

    interface InputProps {
        nama_pembeli: string
        kode_pembeli: string
        notel_pembeli: string
        alamat_pembeli: string
    }

    const [input, setInput] = useState<InputProps>({
        nama_pembeli: '',
        kode_pembeli: '',
        notel_pembeli: '',
        alamat_pembeli: ''
    })

    // Filter
    const [filter, setFilter] = useState("")
    const [isFilter, setIsFilter] = useState(false)

    const cariData = async () => {
        setIsFilter(true)
        const query_data = query(Customer, where("nama_pembeli", ">=", filter), orderBy("nama_pembeli"))
        const querySnapshot = await getDocs(query_data)
        let search_result: any = []
        querySnapshot.forEach((doc) => {
            search_result = [...search_result, [doc.data(), doc.id]]
        });
        setDaftarCustomer(search_result)
    }

    const hapusCari = () => {
        setFilter("")
        setIsFilter(false)
        getData()
    }

    // Validasi
    const [warningSudahAda, setWarningSudahAda] = useState<boolean>(false)
    const [warningInputKosong, setWarningInputKosong] = useState<boolean>(false)
    const [tambahPembeli, setTambahSupplier] = useState<boolean>(false)
    const [updateSupplier, setUpdateSupplier] = useState<boolean>(false)

    const cekDataTambah = async () => {
        setInProcess(true)
        const cek = await getDocs(Customer)

        const sudahAda = cek.docs.find((doc: any) => doc.data().kode_pembeli.toLowerCase() === input.kode_pembeli.toLowerCase() || doc.data().nama_pembeli.toLowerCase() === input.nama_pembeli.toLowerCase())
        const inputKosong = input.nama_pembeli == '' || input.kode_pembeli == '' || input.notel_pembeli == '' || input.alamat_pembeli == ''

        if (sudahAda) { setWarningSudahAda(true); setInProcess(false) }
        else if (inputKosong) { setWarningInputKosong(true); setInProcess(false) }
        else { tambahData(); setTambahSupplier(true) }
    }

    // CRU data
    const getData = () => {
        getDocs(Customer).then(
            res => {
                setDaftarCustomer(res.docs.map(doc => {
                    return [doc.data(), doc.id]
                }))
            }
        )
    }

    const detailData = (obj: any) => {
        setInput((prev: InputProps) => ({
            ...prev,
            id: obj.id,
            nama_pembeli: obj.nama_pembeli,
            kode_pembeli: obj.kode_pembeli,
            notel_pembeli: obj.notel_pembeli,
            alamat_pembeli: obj.alamat_pembeli
        }))
    }

    const tambahData = () => {
        addDoc(Customer, input)
            .then((res) => {
                console.log(res)
                // apa yang terjadi setelah addDoc?
                //mengapa jika di console log dapat return id, parent, path dan lainnya?

                updateDoc(res, { id: res.id })
                setInProcess(false)
                setTambahSupplier(false)
                getData()
                hapusInput()
            })
    }

    const hapusKondisi = () => {
        setWarningSudahAda(false)
        setWarningInputKosong(false)
        setTambahSupplier(false)
        setUpdateSupplier(false)
    }

    const hapusInput = () => {
        setWarningSudahAda(false)
        setWarningInputKosong(false)
        setInput((prev: InputProps) => ({
            nama_pembeli: '',
            kode_pembeli: '',
            notel_pembeli: '',
            alamat_pembeli: ''
        }))
    }

    // const updateDataSupplier = () => {
    //     const updateData = doc(db, 'supplier', input.kode_supplier)
    //     updateDoc(updateData, input)
    //         .then(() => {

    //         })
    // }

    useEffect(() => {
        getData()
        hapusInput()
    }, [])

    return (
        <THEME title={"Home"} subtitle={"Kelola supplier, barang dan pembeli."}>
            <>
                <div className="row">
                    <div className="row justify-content-end">
                        <div className="col-4 d-flex">
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Cari Customer..."
                                aria-label=""
                                onChange={(e) => {
                                    setFilter(e.target.value)
                                }}
                                defaultValue={filter}
                            />
                            <button onClick={() => {
                                cariData()
                            }}
                                className="btn btn-primary ms-2">Cari</button>
                        </div>
                    </div>
                </div>
                <div className="row noscroll" style={{ maxHeight: '100vh' }}>
                    <div className="col-12">

                        <div className="row mt-3 d-flex align-items-center " id="topHomeNav">

                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <Link to="/supplier"><button className="btn">Supplier</button> </Link>
                            </div>

                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <Link to="/barang"><button className="btn">Barang</button></Link>
                            </div>

                            <div className="col-4 d-flex align-items-center justify-content-center topHomeNavActive">
                                <Link to="/customer">  <button className="btn">Customer</button></Link>
                            </div>


                        </div>
                        {
                            isFilter &&
                            <div className="row mt-3">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    Rekomendasi hasil pencarian untuk
                                    <strong className="ms-1">{filter}</strong>
                                    <button
                                        onClick={() => {
                                            //removeSearch()
                                        }}
                                        type="button" className="btn-close" data-bs-dismiss="alert"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                        }


                        {/* Tabel Menampilkan Data */}
                        <div className="row mt-3">
                            <div className="col-12 table-wrapper">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Pembeli</th>
                                            <th>Kode Pembeli</th>
                                            <th>Nomor Telepon Pembeli</th>
                                            <th>Alamat Pembeli</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            daftarCustomer.length > 0 && daftarCustomer.map((data: any, idx) => {
                                                data[0].id = data[1]
                                                return (
                                                    <tr key={data[0].id}>
                                                        <td><b>{idx + 1}.</b></td>
                                                        <td>{data[0].nama_pembeli}</td>
                                                        <td>{data[0].kode_pembeli}</td>
                                                        <td>{data[0].notel_pembeli}</td>
                                                        <td>{data[0].alamat_pembeli}</td>
                                                        <td><a href="#" onClick={() => { detailData(data[0]) }} data-bs-toggle="modal"
                                                            data-bs-target="#modalDetailPembeli">Lihat Detail</a></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 col-12 justify-content-center">
                        <button className="btn-primary center" data-bs-toggle="modal" data-bs-target="#modalTambahPembeli">Tambah Pembeli</button>
                    </div>
                </div>

                {/* Modal Tambah Pembeli */}
                <div className="modal fade" id="modalTambahPembeli" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Pembeli</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => { hapusInput(); hapusKondisi() }} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {
                                    warningSudahAda ? <div className="alert alert-danger text-center" role="alert">Nama atau kode pembeli sudah terdaftar.</div> :
                                        warningInputKosong ? <div className="alert alert-danger text-center" role="alert">Mohon lengkapi informasi dibawah ini.</div> :
                                            tambahPembeli ? <div className="alert alert-primary text-center" role="alert">Menambah data...</div> : ""
                                }
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nama Pembeli</label>
                                        <input type="text" className="form-control"
                                            value={input.nama_pembeli}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    nama_pembeli: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Kode Pembeli</label>
                                        <input type="text" className="form-control"
                                            value={input.kode_pembeli}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    kode_pembeli: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nomor Telepon Pembeli</label>
                                        <input type="number" className="form-control"
                                            value={input.notel_pembeli}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    notel_pembeli: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Alamat Pembeli</label>
                                        <input type="text" className="form-control"
                                            value={input.alamat_pembeli}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    alamat_pembeli: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => { cekDataTambah() }}>
                                    {inProcess ? <div><span className="spinner-border spinner-border-sm me-2"></span>Memproses...</div> : "Simpan"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Modal Detail Pembeli */}
                <div className="modal fade" id="modalDetailPembeli" tabIndex={-1}
                    aria-labelledby="modalDetailBarangLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detail Pembeli</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => { hapusKondisi(); hapusInput() }} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {
                                    warningSudahAda ?
                                        <div className="alert alert-danger text-center" role="alert">Nama atau kode pembeli sudah terdaftar.</div> :
                                        warningInputKosong ? <div className="alert alert-danger text-center" role="alert">Mohon lengkapi informasi dibawah ini</div> : ""
                                }
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nama Pembeli</label>
                                        <input value={input.nama_pembeli} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    nama_pembeli: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Kode Pembeli</label>
                                        <input value={input.kode_pembeli} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    kode_pembeli: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nomor Telepon Pembeli</label>
                                        <input value={input.notel_pembeli} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    notel_pembeli: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Alamat Pembeli</label>
                                        <input value={input.alamat_pembeli} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    alamat_pembeli: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => { setUpdateSupplier(true); }}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </THEME>
    )
}
export default Customer