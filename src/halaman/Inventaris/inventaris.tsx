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
                {/*Tabel Menampilkan Data*/}
                <div className="row mt-3">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Barang</th>
                                <th scope="col">Kode Barang</th>
                                <th scope="col">Jumlah Barang</th>
                                <th scope="col">Harga Barang</th>
                                <th scope="col">Merek Barang</th>
                                <th scope="col">Nama Supplier</th>
                                <th scope="col">Aksi</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <a href="">Tambah Barang...</a>
                    </div>
                </div>
            </>
        </THEME>


    )

}

export default Inventaris