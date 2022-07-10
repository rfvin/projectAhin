import React,{FC} from "react";
import {collection,getDocs,doc,deleteDoc,addDoc} from "firebase/firestore";
import {db} from "../../firebase";
import moment from "moment";
import Transaksi from "../transaksi";

const DaftarPiutang : FC = () =>{
    const daftarPiutangRef = collection(db,'daftar_piutang')
    
    
    return(
        <div className="row">
            
        </div>
    )

}

export default DaftarPiutang;