import React, { FC, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import THEME from "../../Theme/theme";
import { Link,useLocation } from "react-router-dom";
import '../../index.css';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Supplier: FC = () =>{
    const [toast, setToast] = useState<string>("")

    // Filter
    const [filter, setFilter] = useState("")
    const [isFilter, setIsFilter] = useState(false)

    

    return(
        <THEME toast={toast} title={"Inventaris"} subtitle={"Lihat, edit, dan kelola barang pada toko."}>
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
                                //searchInventaris()
                                }}
                                    className="btn btn-primary ms-2">Cari</button>
                        </div>
                    </div>
                </div>
                <div className="row noscroll" style={{maxHeight:'100vh'}}>
                    <div className="col-12">
                        
                        <div className="row mt-5 d-flex align-items-center " id="topHomeNav">
                            
                                <div className="col-4 d-flex align-items-center ">
                                <Link to="/inventaris"><button className="btn">Barang</button></Link>
                                </div>
                            
                            
                                <div className="col-4 d-flex align-items-center topHomeNavActive">
                                <Link to="/supplier"><button className="btn">Supplier</button> </Link>
                                </div>
                           
                            
                                <div className="col-4 d-flex align-items-center topHomeNavActive">
                                <Link to="/customer">  <button className="btn">Pembeli</button></Link>
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
                                            <th scope="col-1">No.</th>
                                            <th scope="col-3">Nama Barang</th>
                                            <th scope="col-3">Kode Barang</th>
                                            <th scope="col-2">Harga</th>
                                            <th scope="col-2">Jumlah Barang</th>
                                            <th scope="col-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {
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
                                        } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 col-12 justify-content-center">
                        <button className="btn-primary center" data-bs-toggle="modal" data-bs-target="#modalTambahBarang">Tambah Barang</button>
                    </div>
                </div>

            </>
        </THEME>
    )
}
export default Supplier