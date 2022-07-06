import React, { FC, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import THEME from "../Theme/theme";
import '../index.css';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../firebase"
import { clear } from "console";
import { resolve } from "path";

const Inventaris: FC = () => {
    const inventarisCollectionRef = collection(db, 'Inventaris')
    const [inventaris, setInventaris] = useState<Array<object>>([])
    const [toast, settoast] = useState<string>("")
    const [inventarisInput, setInventarisInput] = useState<object | any>({
        'nama_barang': '',
        'jumlah_barang': '',
        'harga_barang': '',
        'kode_barang': '',
        'id': ''
    })

    const successAdd = () => {
        settoast("success"),
            setTimeout(() => {
                settoast("")
            }, 3000);
    }

    const successUpdate = () => {
        settoast("update"),
            setTimeout(() => {
                settoast("")
            }, 3000);
    }

    const successDelete = () => {
        settoast("delete"),
            setTimeout(() => {
                settoast("")
            }, 3000);
    }

    const clearInput = () => {
        setInventarisInput((prev: object) => ({
            ...prev,
            'nama_barang': '',
            'jumlah_barang': '',
            'harga_barang': '',
            'kode_barang': '',
            'id': ''
        }))
    }

    const getInventaris = () => {
        new Promise(resolve => {
            resolve(
                getDocs(inventarisCollectionRef).then(res => {
                    setInventaris(res.docs.map(doc => {
                        return [doc.data(), doc.id]
                    }))
                })
            )
        })
    }

    const addInventaris = () => {
        new Promise(resolve => {
            resolve(
                addDoc(inventarisCollectionRef, inventarisInput)
                    .then((res) => {
                        clearInput()
                        getInventaris()
                        successAdd()
                    })
                    .catch(err => console.log(err))
            )
        })
    }

    const editInventaris = () => {
        const InventarisCollection = doc(db, 'Inventaris', inventarisInput.id)
        new Promise(resolve => {
            resolve(
                updateDoc(InventarisCollection, inventarisInput)
                    .then(() => {
                        clearInput()
                        getInventaris()
                        successUpdate()
                    })
                    .catch(err => { console.log(err) })
            )
        })
    }

    const deleteInventaris = () => {
        const InventarisCollection = doc(db, 'Inventaris', inventarisInput.id)
        new Promise(resolve => {
            resolve(
                deleteDoc(InventarisCollection)
                    .then(() => {
                        clearInput()
                        getInventaris()
                        successUpdate()
                    })
            )
        })
    }

    const seeDetailInventaris = (obj: any) => {
        setInventarisInput((prev: object) => ({
            ...prev,
            'id': obj.id,
            'nama_barang': obj.nama_barang,
            'jumlah_barang': obj.jumlah_barang,
            'harga_barang': obj.harga_barang,
            'kode_barang': obj.kode_barang,
        }))
    }

    useEffect(() => {
        getInventaris()
    }, [])

    return (
        <THEME toast={toast} title={"Inventaris"} subtitle={"Lihat, edit, dan kelola barang pada toko."}>
            <>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row justify-content-between">
                            <div className="col-4 d-flex align-items-center">
                                <span>Menampilkan {inventaris.length} Barang </span><br />
                            </div>
                            <div className="col-4 d-flex">
                                <input type="text" className="form-control form-control-lg"
                                    placeholder="Cari Barang..."
                                    aria-label=""
                                />
                                <button className="btn btn-primary ms-2">Cari</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabel Menampilkan Data */}
                <div className="row mt-3">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col-1">No</th>
                                    <th scope="col-3">Nama Barang</th>
                                    <th scope="col-3">Kode Barang</th>
                                    <th scope="col-2">Harga</th>
                                    <th scope="col-2">Sisa</th>
                                    <th scope="col-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inventaris.length > 0 && inventaris.map((data: any, idx) => {
                                        data[0].id = data[1]
                                        return (
                                            <tr key={data[0].id}>
                                                <td>{idx + 1}</td>
                                                <td>{data[0].nama_barang}</td>
                                                <td>{data[0].kode_barang}</td>
                                                <td>{data[0].harga_barang}</td>
                                                <td>{data[0].jumlah_barang}</td>
                                                <td><a href="#!" onClick={() => { seeDetailInventaris(data[0]) }} data-bs-toggle="modal"
                                                    data-bs-target="#modalDetailBarang">Lihat Detail</a></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 justify-content-center">
                        <a href="" data-bs-toggle="modal" data-bs-target='#exampleModal' className="btn btn-primary center">
                            Tambah Barang ...</a>
                    </div>
                </div>

                {/* Modal Tambah Barang */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelled="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header theme-bg-blue text-white">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Barang</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-5">
                                        <label htmlFor="" className="form-label">Nama Barang</label>
                                        <input type="text" className="form-control" placeholder={"Nama Barang"}
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    nama_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="" className="form-label">Kode Barang</label>
                                        <input type="text" className="form-control" placeholder={"Kode"}
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    kode_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="" className="form-label">Merek</label>
                                        <input type="text" className="form-control" placeholder={"Merek"}
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    merek_barang: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <label htmlFor="" className="form-label">Nama Supplier</label>
                                        <input type="text" className="form-control" placeholder={"Nama Supplier"}
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    nama_supplier: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="" className="form-label">Harga</label>
                                        <input type="number" className="form-control" placeholder={"Harga"}
                                            onChange={(e) =>
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    harga_barang: e.target.value
                                                }))
                                            } />
                                    </div>
                                </div>
                                <div className="row mt-4 justify-content-between">
                                    <div className="col-6 d-flex">
                                        <span>Jumlah Barang</span>
                                        <input type="number" className="form-control" placeholder={"Jumlah Barang"}
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    jumlah_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal"> Close </button>
                            <button className="btn btn-primary" onClick={() => { addInventaris() }}>Save</button>
                        </div>
                    </div>

                </div>
            </>
        </THEME>
    )
}

export default Inventaris