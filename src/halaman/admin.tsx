import React, { FC } from 'react'
import THEME from "../Theme/theme";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from 'react';

const Admin: FC = () => {
    const AdminCollectionRef = collection(db, 'admin')
    const [admin, setNamaAdmin] = useState()

    // const namaAdmin = async () => {
    //     const namaAdmin = await getDocs()
    // }

    return (
        <THEME title={"Admin"} subtitle={"Ubah Data Toko"}>
            <div className="row">
                <div className="col-12 mt-5">
                    <p>Halo, </p>
                    <p>
                        <a data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            Ganti Password
                        </a>
                    </p>
                </div>
            </div>
        </THEME>

    )

}

export default Admin