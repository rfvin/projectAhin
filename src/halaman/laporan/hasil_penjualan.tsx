import { Firestore } from "firebase/firestore";
import React, {FC,useEffect,useRef,useState} from "react";
import {collection,getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import moment from "moment";

const HasilPenjualan: FC =() => {
    const transactionCollectionRef = collection(db,'transaksi')
    const [total,setTotal] = useState(0)
    const [terjual,setTerjual] = useState(0)
    const pendapatan:any = useRef(0)
    const soldRef:any = useRef(0)

    //Date Filter Store State

    interface dateProps{
        date_from:string,
        date_to:string
    }

    const [dateFilter,setDateFilter] = useState<dateProps>({'date_from' : '' , date_to : '' })
    const [isFilter, setIsFilter] = useState<boolean>(false)

    const getDataTransaction = async() => {
        await getDocs(transactionCollectionRef)
        .then(res => {
            pendapatan.current = 0
            soldRef.current = 0
                    let transaction_id = res.docs.map(doc => doc.id)
                    transaction_id.map(async(trans_id:any) => {
                        let refHarga = collection(db,"transaksi", `${trans_id}`,'total_harga')
                        let refItem = collection(db,"transaksi",`${trans_id}`,'item')
                        getDocs(refHarga)
                            .then((res) => {
                                pendapatan.current += Number(res.docs.map(doc => doc.data().total_harga_transaksi))
                                setTotal(pendapatan.current)
                            })


                        getDocs(refItem)
                            .then((res)=>{
                                res.docs.map(doc =>{
                                    soldRef.current += Number(doc.data().item.jumlah_beli)
                                })
                                setTerjual(soldRef.current)
                            })
                    })
        })
    }


    return(
        <div className="row">
            <div className="col-5 d-flex mt-5">
                <span className="mt-1">
                    <b>Lihat Berdasarkan</b>
                    <button className="btn bg-white text-dark ms-5"> Semua </button>
                    <button className="btn btn-primary"> Berdasarkan Tanggal </button>
                </span>
            </div>
        </div>

    )
    

}
export default HasilPenjualan