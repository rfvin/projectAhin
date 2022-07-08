import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Theme/theme.css'
import '../index.css'
import THEME from "../Theme/theme";
import Inventaris from "./inventaris";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const Transaksi = () => {
    const inventarisCollectionRef = collection(db, 'Inventaris')
    const [inventaris, setInventaris] = useState<Array<object>>([])
    const [toast, setToast] = useState<string>("")
    const [inventarisInput, setInventarisInput] = useState<object | any>({
        'nama_barang': '',
        'jumlah_barang': '',
        'harga_barang': '',
        'kode_barang': '',
        'id': ''
    })

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

    useEffect(() => {
        getInventaris()
    }, [])

    return (
        <THEME title={"Transaksi"} subtitle={"Hitung total pembelian barang"}>
            <>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row justify-content-between">
                            <div className="col-4 d-flex align-items-center">
                                <span>Menampilkan {inventaris.length} barang</span><br />
                            </div>
                            <div className="col-4 d-flex">
                                <input type="text" className="form-control"
                                    placeholder="Cari Barang..."
                                    aria-label=""
                                />
                                <button className="btn btn-primary ms-2">Cari</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Tabel Menampilkan Data*/}
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
                                                <td>Rp.{data[0].harga_barang},-</td>
                                                <td>{data[0].jumlah_barang} pcs</td>
                                                <td><a href="#!" onClick={() => {  }} data-bs-toggle="modal"
                                                    data-bs-target="#modalDetailBarang">Beli</a></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 justify-content-center">
                        <button className="btn btn-primary center" type="button"> Bayar
                        </button>
                    </div>
                </div>
            </>
        </THEME>
    )

}

export default Transaksi;