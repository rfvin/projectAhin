import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../Theme/theme.css'
import '../../index.css'
import THEME from "../../Theme/theme";


const Inventaris = () => {
    //Konten
    return(

        <THEME title={"Inventaris"} subtitle={"Lihat,Edit dan Kelola Barang pada Toko"}>
            <>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row justify-content-between">
                            <div className="col-4 d-flex align-items-center">
                                <span>Menampilkan "Jumlah" Barang </span><br/>
                            </div>
                            <div className="col-4 d-flex">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Cari berdasarkan Kode Barang"
                                       aria-label=""
                                />
                                <button className="btn btn-primary text-white ms-2"><i className="bi-search"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </THEME>


    )

}

export default Inventaris