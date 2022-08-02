import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import THEME from "../../Theme/theme";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../index.css';

const Supplier: FC = () => {
    const Supplier = collection(db, "supplier")
    const [inProcess, setInProcess] = useState(false)
    const [daftarSupplier, setDaftarSupplier] = useState<Array<object>>([])

    interface InputProps {
        nama_supplier: string
        kode_supplier: string
        notel_supplier: string
        alamat_supplier: string
    }

    const [input, setInput] = useState<InputProps>({
        nama_supplier: '',
        kode_supplier: '',
        notel_supplier: '',
        alamat_supplier: ''
    })

    // Filter
    const [filter, setFilter] = useState("")
    const [isFilter, setIsFilter] = useState(false)

    const cariData = async () => {
        setIsFilter(true)
        const query_data = query(Supplier, where("nama_supplier", ">=", filter), orderBy("nama_supplier"))
        const querySnapshot = await getDocs(query_data)
        let search_result: any = []
        querySnapshot.forEach((doc) => {
            search_result = [...search_result, [doc.data(), doc.id]]
        });
        setDaftarSupplier(search_result)
    }

    const hapusCari = () => {
        setFilter("")
        setIsFilter(false)
        getData()
    }

    // Validasi
    const [warningSudahAda, setWarningSudahAda] = useState<boolean>(false)
    const [warningInputKosong, setWarningInputKosong] = useState<boolean>(false)
    const [tambahSupplier, setTambahSupplier] = useState<boolean>(false)
    const [updateSupplier, setUpdateSupplier] = useState<boolean>(false)

    const cekDataTambah = async () => {
        setInProcess(true)
        const cek = await getDocs(Supplier)

        const sudahAda = cek.docs.find((doc: any) => doc.data().kode_supplier.toLowerCase() === input.kode_supplier.toLowerCase() || doc.data().nama_supplier.toLowerCase() === input.nama_supplier.toLowerCase())
        const inputKosong = input.nama_supplier == '' || input.kode_supplier == '' || input.notel_supplier == '' || input.alamat_supplier == ''

        if (sudahAda) { setWarningSudahAda(true); setInProcess(false) }
        else if (inputKosong) { setWarningInputKosong(true); setInProcess(false) }
        else { tambahData(); setTambahSupplier(true) }
    }

    const cekDataUpdate = async () => {
        setInProcess(true)
        const cek = await getDocs(Supplier)

        const sudahAda = cek.docs.find((doc: any) => doc.data().kode_supplier.toLowerCase() === input.kode_supplier.toLowerCase() || doc.data().nama_supplier.toLowerCase() === input.nama_supplier.toLowerCase())
        const inputKosong = input.nama_supplier == '' || input.kode_supplier == '' || input.notel_supplier == '' || input.alamat_supplier == ''

        if (sudahAda) { setWarningSudahAda(true); setInProcess(false) }
        else if (inputKosong) { setWarningInputKosong(true); setInProcess(false) }
    }

    // CRU data
    const getData = () => {
        getDocs(Supplier).then(res => {
            setDaftarSupplier(res.docs.map(doc => {
                return [doc.data(), doc.id]
            }))
        })
    }

    const detailData = (obj: any) => {
        setInput((prev: InputProps) => ({
            ...prev,
            id: obj.id,
            nama_supplier: obj.nama_supplier,
            kode_supplier: obj.kode_supplier,
            notel_supplier: obj.notel_supplier,
            alamat_supplier: obj.alamat_supplier
        }))
    }

    const tambahData = () => {
        addDoc(Supplier, input)
            .then((res) => {
                updateDoc(res, { id: res.id })
                    .then(() => {
                        setInProcess(false)
                        setTambahSupplier(false)
                        hapusKondisi()
                        hapusInput()
                        getData()
                    })
            })
    }

    const hapusKondisi = () => {
        setWarningSudahAda(false)
        setWarningInputKosong(false)
        setTambahSupplier(false)
        setUpdateSupplier(false)
    }

    const hapusInput = () => {
        setInput((prev: InputProps) => ({
            ...prev,
            nama_supplier: '',
            kode_supplier: '',
            notel_supplier: '',
            alamat_supplier: ''
        }))
    }

    useEffect(() => {
        getData()
        hapusInput()
        hapusKondisi()
        setInProcess(false)
    }, [])

    return (
        <THEME title={"Home"} subtitle={"Kelola supplier, barang dan pembeli."}>
            <>
                <div className="row">
                    <div className="row justify-content-end">
                        <div className="col-4 d-flex">
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Cari Supplier..."
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

                        <div className="row mt-3 d-flex align-items-center" id="topHomeNav">

                            <div className="col d-flex align-items-center justify-content-center topHomeNavActive">
                                <Link to="/supplier"><button className="btn">Supplier</button> </Link>
                            </div>

                            <div className="col d-flex align-items-center justify-content-center">
                                <Link to="/barang"><button className="btn">Barang</button></Link>
                            </div>

                            <div className="col d-flex align-items-center justify-content-center">
                                <Link to="/customer"><button className="btn">Pembeli</button></Link>
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
                                            hapusCari()
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
                                            <th>Nama Supplier</th>
                                            <th>Kode Supplier</th>
                                            <th>Nomor Telepon Supplier</th>
                                            <th>Alamat Supplier</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            daftarSupplier.length > 0 && daftarSupplier.map((data: any, idx) => {
                                                data[0].id = data[1]
                                                return (
                                                    <tr key={data[0].id}>
                                                        <td><b>{idx + 1}.</b></td>
                                                        <td>{data[0].nama_supplier}</td>
                                                        <td>{data[0].kode_supplier}</td>
                                                        <td>{data[0].notel_supplier}</td>
                                                        <td>{data[0].alamat_supplier}</td>
                                                        <td><a href="" onClick={() => { detailData(data[0]) }} data-bs-toggle="modal"
                                                            data-bs-target="#modalDetailSupplier">Lihat Detail</a></td>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 col-12 justify-content-center">
                        <button className="btn-primary center" data-bs-toggle="modal" data-bs-target="#modalTambahSupplier">Tambah Supplier</button>
                    </div>
                </div>

                {/* Modal Tambah Supplier */}
                <div className="modal fade" id="modalTambahSupplier" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Supplier</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => { hapusInput(); hapusKondisi() }} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {
                                    warningSudahAda ? <div className="alert alert-danger text-center" role="alert">Nama atau kode supplier sudah terdaftar.</div> :
                                        warningInputKosong ? <div className="alert alert-danger text-center" role="alert">Mohon lengkapi informasi dibawah ini.</div> :
                                            tambahSupplier ? <div className="alert alert-primary text-center" role="alert">Menambah data...</div> : ""
                                }
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nama Supplier</label>
                                        <input type="text" className="form-control"
                                            value={input.nama_supplier}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    nama_supplier: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Kode Supplier</label>
                                        <input type="text" className="form-control"
                                            value={input.kode_supplier}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    kode_supplier: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nomor Telepon Supplier</label>
                                        <input type="number" className="form-control"
                                            value={input.notel_supplier}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    notel_supplier: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Alamat Supplier</label>
                                        <input type="text" className="form-control"
                                            value={input.alamat_supplier}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    alamat_supplier: e.target.value
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

                {/* Modal Detail Supplier */}
                <div className="modal fade" id="modalDetailSupplier" tabIndex={-1}
                    aria-labelledby="modalDetailBarangLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detail Supplier</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => { hapusKondisi(); hapusInput() }} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {
                                    warningSudahAda ?
                                        <div className="alert alert-danger text-center" role="alert">Nama atau kode supplier sudah terdaftar.</div> :
                                        warningInputKosong ? <div className="alert alert-danger text-center" role="alert">Mohon lengkapi informasi dibawah ini</div> : ""
                                }

                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nama Supplier</label>
                                        <input value={input.nama_supplier} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    nama_supplier: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Kode Supplier</label>
                                        <input value={input.kode_supplier} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    kode_supplier: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nomor Telepon Supplier</label>
                                        <input value={input.notel_supplier} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    notel_supplier: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Alamat Supplier</label>
                                        <input value={input.alamat_supplier} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    alamat_supplier: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => { setUpdateSupplier(true); cekDataUpdate() }}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        </THEME>
    )
}
export default Supplier