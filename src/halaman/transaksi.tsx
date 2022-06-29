import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Theme/theme.css'
import '../index.css'
import THEME from "../Theme/theme";

const Transaksi = () => {
    return (
        <THEME title={"Transaksi"} subtitle={"Hitung total pembelian barang"}>
            <>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row justify-content-between">
                            <div className="col-4 d-flex align-items-center">
                                <span>Menampilkan "Jumlah" Barang</span><br />
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
                                    <th scope="col-1">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>

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