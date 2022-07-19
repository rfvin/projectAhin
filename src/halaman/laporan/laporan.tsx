import React, { FC ,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../Theme/theme'
import THEME from "../../Theme/theme";
import HasilPenjualan from './hasil_penjualan';
import DaftarPiutang from './daftar_piutang';
import RiwayatPenjualan from './riwayat_penjualan';

const Laporan = () => {

    const [buttonActive,setButtonActive] = useState<string>("Hasil Penjualan")

    const ComponentWillBeMount = () => {
        switch (buttonActive){
            case "Hasil Penjualan" :
                return <HasilPenjualan/>
            case "Riwayat Pembelian" : 
                return <RiwayatPenjualan/> 
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
                        <button onClick={() => {setButtonActive("Hasil Penjualan")}} className={`btn ${buttonActive === 'Hasil Penjualan' ? 'btn-dark' : 'btn-primary'} ms-2`}>Hasil Penjualan</button>
                        <button onClick={() => {setButtonActive("Riwayat Pembelian")}} className={`btn ${buttonActive === 'Riwayat Pembelian' ? 'btn-dark' : 'btn-primary'} ms-2`}>Riwayat Pembelian</button>
                        <button onClick={() => {setButtonActive("Daftar Piutang")}} className={`btn ${buttonActive === 'Daftar Piutang' ? 'btn-dark' : 'btn-primary'} ms-2`}>Daftar Piutang</button>
                    </div>
                    <div className="col-12">
                        {
                            <ComponentWillBeMount/>
                        }
                    </div>
                </div>
            </>
        </THEME>
    )

}
export default Laporan