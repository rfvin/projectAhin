import React, {FC} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../Theme/theme.css'
import '../../index.css'
import THEME from "../../Theme/theme";


const laporan = () => {
    //Konten
    <THEME title={"Laporan"} subtitle={"Lihat hasil penjualan, riwayat pembelian, dan daftar piutang"}>
        <div className="row">
            <div className="col-12 text-end border-bottom p-3">
                <button className="ms-2">Hasil Penjualan</button>
                <button className="ms-2">Riwayat Pembelian</button>
                <button className="ms-2">Daftar Piutang</button>
            </div>
        </div>
    </THEME>
}
export default laporan