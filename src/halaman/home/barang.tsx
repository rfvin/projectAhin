import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import THEME from "../../Theme/theme";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../index.css';

const Barang: FC = () => {
    const Supplier = collection(db, 'supplier')
    const Barang_Supplier = collection(db, 'supplier_barang')
    const [inProcess, setInProcess] = useState<boolean>(false)

    // load daftar barang supplier
    const [barangSupplier, setBarangSupplier] = useState<Array<object>>([])

    // load supplier di dropdown modal tambah barang
    const [daftarSupplier, setDaftarSupplier] = useState<any>()

    // simpan id supplier
    const [supplier, setSupplier] = useState<any>()

    interface InputProps {
        supplier_id: ''
        nama_barang: string
        kode_barang: string
    }

    const [input, setInput] = useState<InputProps>({
        supplier_id: '',
        nama_barang: '',
        kode_barang: '',
    })

    // Filter
    const [filter, setFilter] = useState("")
    const [isFilter, setIsFilter] = useState(false)

    const cariData = async () => {
        setIsFilter(true)
        const query_data = query(Barang_Supplier, where("nama_barang", ">=", filter))
        const snapshot = await getDocs(query_data)
        let search_result: any = []
        snapshot.forEach((doc) => {
            search_result = [...search_result, [doc.data(), doc.id]]
        });
        setBarangSupplier(search_result)
    }

    const hapusCari = () => {
        setFilter("")
        setIsFilter(false)
        getData()
    }

    const hapusInput = () => {
        setInput((prev: InputProps) => ({
            ...prev,
            nama_barang: '',
            kode_barang: ''
        }))
    }

    // Validasi
    const [warningSudahAda, setWarningSudahAda] = useState<boolean>(false)
    const [warningInputKosong, setWarningInputKosong] = useState<boolean>(false)
    const [tambahBarang, setTambahBarang] = useState<boolean>(false)
    const [updateBarang, setUpdateBarang] = useState<boolean>(false)

    const cekData = async () => {
        setInProcess(true)
        const cek = await getDocs(Barang_Supplier)

        const sudahAda = cek.docs.find((doc: any) => doc.data().kode_barang.toLowerCase() === input.kode_barang.toLowerCase() || doc.data().nama_barang.toLowerCase() === input.nama_barang.toLowerCase())
        const inputKosong = input.nama_barang === '' || input.kode_barang === ''

        if (sudahAda) { setWarningSudahAda(true); setInProcess(false) }
        else if (inputKosong) { setWarningInputKosong(true); setInProcess(false) }
        else { tambahData(); setTambahBarang(true) }
    }

    // CRU data
    const getData = () => {
        getDocs(Barang_Supplier).then(res => {
            setBarangSupplier(res.docs.map(doc => {
                return [doc.data(), doc.id]
            }))
        })
    }

    // untuk dropdown modal tambah barang supplier
    const getSupplier = () => {
        getDocs(Supplier).then(res => {
            console.log(res.docs.map(doc => { return [doc.data(), doc.id] }))
            setDaftarSupplier(res.docs.map(doc => {
                return [doc.data(), doc.id]
            }))
        })
    }

    // untuk ambil data supplier di modal tambah barang supplier
    const getSupplierData = async (supplierID: string) => {
        const query_data = query(Supplier, where("id", "==", supplierID))
        const snapshot = await getDocs(query_data)
        setSupplier(snapshot.docs.map(() => {
            setInput((prev: any) => ({
                ...prev,
                supplier_id: supplierID}))
        }))

    }

    const tambahData = () => {
        addDoc(Barang_Supplier, input)
            .then((res) => {
                updateDoc(res, { id: res.id })
                hapusInput()
                setInProcess(false)
                setTambahBarang(false)
            })
    }

    const hapusKondisi = () => {
        setWarningSudahAda(false)
        setWarningInputKosong(false)
        setTambahBarang(false)
        setUpdateBarang(false)
    }

    // const updateBarangSupplier = () => {
    //     const update = doc(db, 'supplier_barang', InputBarang.supplier_id)
    //     updateDoc(update, InputBarang)
    //         .then(() => {
    //             clearInput()
    //             getData()
    //             successUpdate()
    //         })
    // }

    const detailData = (obj: any) => {
        setInput((prev: InputProps) => ({
            ...prev,
            supplier_id: obj.supplier_id,
            nama_barang: obj.nama_barang,
            kode_barang: obj.kode_barang,
        }))
    }

    useEffect(() => {
        getData()
        getSupplier()
        setWarningSudahAda(false)
        setWarningInputKosong(false)
    }, [])

    return (
        <THEME title={"Home"} subtitle={"Kelola supplier, barang dan pembeli."}>
            <>
                <div className="row">
                    <div className="row justify-content-end">
                        <div className="col-4 d-flex">
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Cari Barang..."
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

                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <Link to="/supplier"><button className="btn">Supplier</button> </Link>
                            </div>

                            <div className="col-4 d-flex align-items-center justify-content-center topHomeNavActive">
                                <Link to="/barang"><button className="btn">Barang</button></Link>
                            </div>

                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <Link to="/customer">  <button className="btn">Pembeli</button></Link>
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

                        {/* Filter supplier  */}
                        {/* <div className="row mt-3">
                            <div className="col-12 align-items-center justify-content-center d-flex">
                                <div>Supplier:
                                    <select name="" id="" className="ms-3">
                                        <option value="">Pilih supplier</option>
                                        {
                                            daftarSupplier && daftarSupplier.docs.map((item: any) => {
                                                return (
                                                    <option key={item[1]} value={item[1]}>{item[0].name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>


                            </div>
                        </div> */}

                        {/* Tabel Menampilkan Data */}
                        <div className="row mt-3">
                            <div className="col-12 table-wrapper">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Barang</th>
                                            <th>Kode Barang</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            barangSupplier.length > 0 && barangSupplier.map((data: any, idx) => {
                                                data[0].id = data[1]
                                                return (
                                                    <tr key={data[0].id}>
                                                        <td><b>{idx + 1}.</b></td>
                                                        <td>{data[0].nama_barang}</td>
                                                        <td>{data[0].kode_barang}</td>
                                                        <td><a href="" onClick={() => { detailData(data[0]) }} data-bs-toggle="modal"
                                                            data-bs-target="#modalDetailBarang">Lihat Detail</a></td>
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
                        <button className="btn-primary center" data-bs-toggle="modal" data-bs-target="#modalTambahBarang">Tambah Barang</button>
                    </div>
                </div>

                {/* Modal Tambah Barang */}
                <div className="modal fade" id="modalTambahBarang" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Barang Supplier</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => { hapusInput(); hapusKondisi() }} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {
                                    warningSudahAda ?
                                        <div className="alert alert-danger text-center" role="alert">Nama atau kode barang sudah terdaftar.</div> :
                                        warningInputKosong ? <div className="alert alert-danger text-center" role="alert">Mohon lengkapi informasi dibawah ini.</div> :
                                            tambahBarang ? <div className="alert alert-primary text-center" role="alert">Barang telah ditambahkan.</div> : ""

                                }
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Supplier</label>
                                        <select className="form-control" onChange={(e) => { getSupplierData(e.target.value) }}>
                                            <option value="" hidden>Pilih supplier</option>
                                            {
                                                daftarSupplier && daftarSupplier.map((item: any, idx: string) => {
                                                    return (
                                                        <option key={item[1]} value={item[1]}>{item[0].nama_supplier}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nama Barang</label>
                                        <input type="text" className="form-control"
                                            value={input.nama_barang}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    nama_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Kode Barang</label>
                                        <input type="text" className="form-control"
                                            value={input.kode_barang}
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    kode_barang: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => { cekData() }}>
                                    {inProcess ? <div><span className="spinner-border spinner-border-sm me-2"></span>Memproses...</div> : "Simpan"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Modal Detail Barang */}
                <div className="modal fade" id="modalDetailBarang" tabIndex={-1}
                    aria-labelledby="modalDetailBarangLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detail Barang Supplier</h5>
                                <button className="btn-close btn-close-white" type="button" data-bs-dismiss="modal" onClick={() => { hapusKondisi(); hapusInput() }} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {
                                    warningSudahAda ?
                                        <div className="alert alert-danger text-center" role="alert">Nama atau kode barang sudah terdaftar.</div> :
                                        warningInputKosong ? <div className="alert alert-danger text-center" role="alert">Mohon lengkapi informasi dibawah ini</div> : ""
                                }
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Supplier</label>
                                        <select className="form-control">
                                            <option value={input.supplier_id} hidden>Pilih supplier</option>
                                            {
                                                daftarSupplier && daftarSupplier.map((item: any, idx: string) => {
                                                    return (
                                                        <option key={item[1]} value={item[1]}>{item[0].nama_supplier}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Nama Barang</label>
                                        <input value={input.nama_barang} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    nama_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Kode Barang</label>
                                        <input value={input.kode_barang} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInput((prev: InputProps) => ({
                                                    ...prev,
                                                    kode_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => { cekData() }}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        </THEME>
    )
}

export default Barang