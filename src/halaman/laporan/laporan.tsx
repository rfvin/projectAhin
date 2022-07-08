import React, { FC ,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../Theme/theme'
import THEME from "../../Theme/theme";
import HasilPenjualan from './hasil_penjualan';
import DaftarPiutang from './daftar_piutang';
import RiwayatPembelian from './riwayat_pembelian';

const Laporan = () => {

    const [buttonActive,setButtonActive] = useState<string>("Hasil Penjualan")

    const ComponentWillBeMount = () => {
        switch (buttonActive){
            case "Hasil Penjualan" :
                return <HasilPenjualan/>
            case "Riwayat Pembelian" : 
                return <RiwayatPembelian/> 
            case "Daftar Piutang" :
                return <DaftarPiutang/>
            default : 
                return<HasilPenjualan/>
        }
    }

    return (
        <THEME title={"Laporan"} subtitle={"Lihat hasil penjualan, riwayat pembelian, dan daftar piutang"}>
            <>
                <div className="row">
                    <div className='col-12 text-end border-bottom p-2'>
                        
                    
                    </div>
                </div>
            </>
        </THEME>
    )

}
export default Laporan