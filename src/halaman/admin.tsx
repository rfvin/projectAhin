import React, {FC} from 'react'
import THEME from "../Theme/theme";


const Admin: FC = ()=>{
    return (
        <THEME title={"Admin"} subtitle={"Ubah Data Toko"}>
            <div className="row">
                <div className="col-12 mt-5">
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