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
        await getDocs(riwayatPembelianRef)
            .then(res=>{
                setDataRiwayat([...res.docs.map(doc => doc.data())])
            })
    }

    



    return(
        <div className="row">
            <div className="col-5 d-flex mt-5">
                <span className="mt-1">
                    <b>Lihat Berdasarkan</b>
                </span>
            </div>
        </div>
    )

}

export default RiwayatPembelian;