import React, { FC } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Theme/theme.css'
import '../index.css'
import THEME from "../Theme/theme";


const Laporan = () => {
    //Konten

    return (
        <THEME title={"Laporan"} subtitle={"Lihat hasil penjualan, riwayat pembelian, dan daftar piutang"}>
            <>
                <div className="row mt-5">
                    <div className='col-12 border-bottom p-2'>
                        <div className='row justify-content-between'>
                            <div className="col-4 d-flex align-items-center">
                                <span className='hint'>Menampilkan hasil penjualan</span><br />
                            </div>
                            <div className="col-8 d-flex justify-content-end">
                                <button className="btn btn-primary ms-2">Hasil Penjualan</button>
                                <button className="btn btn-primary ms-2">Riwayat Pembelian</button>
                                <button className="btn btn-primary ms-2">Daftar Piutang</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </THEME>
    )

}
export default Laporan