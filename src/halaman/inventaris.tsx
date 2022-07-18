import React, { FC, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import THEME from "../Theme/theme";
import '../index.css';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import '../Theme/theme.css';

const Inventaris: FC = () => {
    const inventarisCollectionRef = collection(db, 'Inventaris')
    const [inventaris, setInventaris] = useState<Array<object>>([])
    const [toast, setToast] = useState<string>("")
    const [inventarisInput, setInventarisInput] = useState<object | any>({
        'nama_barang': '',
        'jumlah_barang': '',
        'harga_barang': '',
        'kode_barang': '',
        'satuan_barang': '',
        'nama_supplier': '',
        'merek_barang': '',
        'id': ''
    })

    // Filter
    const [filter, setFilter] = useState("")
    const [isFilter, setIsFilter] = useState(false)

    const searchInventaris = async () => {
        setIsFilter(true)
        const query_inventaris = query(inventarisCollectionRef, where("nama_barang", ">=", filter))
        const querySnapshot = await getDocs(query_inventaris)
        let search_result: any = []
        querySnapshot.forEach((doc) => {
            search_result = [...search_result, [doc.data(), doc.id]]
        });
        setInventaris(search_result)
    }

    const removeSearch = () => {
        let filter_input = document.getElementById('filter_input')
        setFilter("")
        setIsFilter(false)
        getInventaris()
        // @ts-ignore
        filter_input.value = ""
    }

    const successAdd = () => {
        setToast("success")
        setTimeout(() => {
            setToast("")
        }, 3000);
        setTimeout(() => {
            setToast("")
        }, 3000);
    }

    const successUpdate = () => {
        setToast("update")
        setTimeout(() => {
            setToast("")
        }, 3000);
        setTimeout(() => {
            setToast("")
        }, 3000);
    }

    const successDelete = () => {
        setToast("delete")
        setTimeout(() => {
            setToast("")
        }, 3000);
        setTimeout(() => {
            setToast("")
        }, 3000);
    }

    const clearInput = () => {
        setInventarisInput((prev: object) => ({
            ...prev,
            'nama_barang': '',
            'jumlah_barang': '',
            'harga_barang': '',
            'kode_barang': '',
            'satuan_barang': '',
            'nama_supplier': '',
            'merek_barang': '',
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
                        successAdd()
                   
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
                        successDelete()
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
            'satuan_barang': obj.satuan_barang,
            'nama_supplier': obj.nama_supplier,
            'merek_barang': obj.merek_barang,
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
                                <span>Menampilkan {inventaris.length} barang</span><br />
                            </div>
                            <div className="col-4 d-flex">
                                <input type="text" className="form-control form-control-lg text-uppercase"
                                    placeholder="Cari Barang..."
                                    aria-label=""
                                    onChange={(e) => {
                                        setFilter(e.target.value)
                                    }}
                                    defaultValue={filter}
                                />
                                <button onClick={() => {
                                    searchInventaris()
                                }}
                                    className="btn btn-primary ms-2">Cari</button>
                            </div>
                        </div>
                        {
                            isFilter &&
                            <div className="row mt-3">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    Rekomendasi hasil pencarian untuk barang
                                    <strong className="ms-1">{filter}</strong>
                                    <button
                                        onClick={() => {
                                            removeSearch()
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
                                            <th scope="col-1">No.</th>
                                            <th scope="col-3">Nama Barang</th>
                                            <th scope="col-3">Kode Barang</th>
                                            <th scope="col-2">Harga</th>
                                            <th scope="col-2">Jumlah Barang</th>
                                            <th scope="col-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            inventaris.length > 0 && inventaris.map((data: any, idx) => {
                                                data[0].id = data[1]
                                                return (
                                                    <tr key={data[0].id}>
                                                        <td><b>{idx + 1}.</b></td>
                                                        <td>{data[0].nama_barang}</td>
                                                        <td>{data[0].kode_barang}</td>
                                                        <td>Rp. {data[0].harga_barang},-</td>
                                                        <td>{data[0].jumlah_barang + " " + data[0].satuan_barang}</td>
                                                        <td><a href="#!" onClick={() => { seeDetailInventaris(data[0]) }} data-bs-toggle="modal"
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
                    <div className="col-12 justify-content-center">
                        <button className="btn-primary center" data-bs-toggle="modal" data-bs-target="#modalTambahBarang">Tambah Barang</button>
                    </div>
                </div>

                {/* Modal Tambah Barang */}
                <div className="modal fade" id="modalTambahBarang" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Barang</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Nama Barang</label>
                                        <input maxLength={25} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    nama_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Kode Barang</label>
                                        <input maxLength={8} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    kode_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Merek Barang</label>
                                        <input maxLength={10} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    merek_barang: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Nama Supplier</label>
                                        <input maxLength={20} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    nama_supplier: e.target.value
                                                }))
                                            }} />
                                    </div>

                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Harga</label>
                                        <div className="input-group">
                                            <span className="input-group-text" id="inputGroupPrepend2">Rp.</span>
                                            <input min={1} onInput={(e) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.slice(0, 10)} type="number" className="form-control"
                                                onChange={(e) =>
                                                    setInventarisInput((prev: object) => ({
                                                        ...prev,
                                                        harga_barang: e.target.value
                                                        
                                                    }))
                                                } />
                                        </div>

                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">Jumlah Barang</label>
                                        <input min={1} onInput={(e) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.slice(0, 10)} type="number" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    jumlah_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-2">
                                        <label className="form-label">Satuan</label>
                                        <input maxLength={5} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    jumlah_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button disabled={!setInventarisInput} className="btn btn-primary" onClick={() => { addInventaris() }}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Detail Barang */}
                <div className="modal fade" id="modalDetailBarang" tabIndex={-1}
                    aria-labelledby="modalDetailBarangLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detail Barang</h5>
                                <button className="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Nama Barang</label>
                                        <input maxLength={25} value={inventarisInput.nama_barang} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    nama_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Kode Barang</label>
                                        <input maxLength={8} value={inventarisInput.kode_barang} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    kode_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Merek Barang</label>
                                        <input maxLength={10} value={inventarisInput.merek_barang} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    merek_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Nama Supplier</label>
                                        <input maxLength={20} value={inventarisInput.nama_supplier} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    nama_supplier: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <label htmlFor="" className="form-label">Harga</label>
                                        <div className="input-group">
                                            <span className="input-group-text" id="inputGroupPrepend2">Rp.</span>
                                            <input min={1} value={inventarisInput.harga_barang} type="number" className="form-control"
                                                onChange={(e) => {
                                                    setInventarisInput((prev: object) => ({
                                                        ...prev,
                                                        harga_barang: e.target.value
                                                    }))
                                                }} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">Jumlah Barang</label>
                                        <input min={1} value={inventarisInput.jumlah_barang} type="number" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    jumlah_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col-2">
                                        <label className="form-label">Satuan</label>
                                        <input maxLength={5} value={inventarisInput.satuan_barang} type="text" className="form-control"
                                            onChange={(e) => {
                                                setInventarisInput((prev: object) => ({
                                                    ...prev,
                                                    satuan_barang: e.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-bs-toggle="collapse" data-bs-target="#konfirmasiHapus">Hapus</button>
                                <button className="btn btn-primary" onClick={() => { editInventaris() }}>Simpan</button>
                            </div>
                            <div className="row">
                                <div className="col-12 p-5">
                                    <div className="collapse" id="konfirmasiHapus">
                                        <div className="card card-body text-white" style={{background:"red"}}>
                                            Data yang sudah dihapus tidak dapat dikembalikan!

                                            <div className="col text-end mt-5">
                                                <button type="button" className="btn btn-primary me-2"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#konfirmasiHapus">Batal
                                                </button>
                                                <button type="button" className="btn btn-light" style={{color:"red"}} onClick={() => {deleteInventaris()}}>Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        </THEME>
    )
}

export default Inventaris