import React,{FC,useEffect,useState} from "react";
import {collection,collectionGroup,getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import moment from "moment";
import Transaksi from "../transaksi";

const RiwayatPembelian : FC = () =>{
    const riwayatPembelianRef = collection(db , 'riwayat_pembelian');
    const[dataRiwayat,setDataRiwayat] = useState<any>([])
    const[itemTransaksi,setItemTransaksi] = useState<any>()
    const[transaksi,setTransaksi] = useState<any>()

    // Date Filter Storing State
    interface dateProps{
        date_from:string,
        date_to:string
    }

    const [dateFilter,setDateFilter] = useState<dateProps>({'date_from' : '' , 'date_to' : ''})
    const [isFilter,setIsFilter] = useState<boolean>(false)

    const getRiwayatPembelian = async() => {
        //coding dibawah function yang sifatnya async menunggu dijalnkan setelah function selesai
        await getDocs(riwayatPembelianRef)
            .then(res=>{
                //data ada didalam res.doc.map
                setDataRiwayat([...res.docs.map(doc => doc.data())])
            })
    }




    return(
        <div className="row">
            <div className="col-5 d-flex mt-5">
                <span className="mt-1">
                    <b>Lihat Berdasarkan</b></span>
                    <button className="btn bg-white text-dark ms-5"> Semua </button>
                    <button className="btn btn-primary"> Berdasarkan Tanggal </button>
            </div>
            <div className="col-7 d-flex mt-5">
                <div className="form-group ms-2">
                    <label htmlFor="">Dari Tanggal : </label>
                    <input type="datetime-local" className="ms-3 form-input" id="date_from" 
                        onChange={(e) => {
                            setDateFilter((prev:dateProps) => ({
                                ...prev,
                                date_from:e.target.value
                            }))
                        }}
                    />
                </div>
                <div className="form-group ms-2">
                        <label htmlFor=""> Ke Tanggal :</label>
                        <input type="datetime-local" id="date_to" defaultValue={dateFilter.date_to} className="ms-3 form-input"
                            onChange={(e) => {
                                setDateFilter((prev:dateProps) => ({
                                    ...prev,
                                    date_to : e.target.value
                                }))
                            }}
                        />
                </div> 
                <div className="form-group">
                    <button className="btn btn-primary ms-2" style={{marginTop:-2}} onClick={() => {
                        // filterByDate()
                    }}>
                        Apply Filter
                    </button>
                </div>
            </div>
            {
                isFilter &&
                <div className="col-12">
                    <div className="alert alert-info mt-3 alert-dismissable fade show" role="alert">
                        Menampilkan hasil dari Tanggal
                        <b> {moment(dateFilter.date_from).format('MMMM Do YYYY')} to </b>
                        <b>{moment(dateFilter.date_to).format('MMMM Do YYYY')}</b>

                        {/* <button className="btn-close " onClick={() => {clearFilterByDate()}} type="button" data-bs-dismiss="alert" aria-label="Close"></button> */}
                    </div>
                </div>
            }
        </div>
    )

}

export default RiwayatPembelian;