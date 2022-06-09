import React from "react";
import '../index.css'

const masuk = () => {
    return (
        
       <section className="container vh-100 d-flex justify-content-center align-items-center">
           <div className="container-fluid">
           <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                    <div className="d-flex justify-content-start">Password Salah</div></div>
                        
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-sm-6">
                        <p className="title-masuk">Masuk</p>    
                    </div>
                    <div className="col-sm-6">
                        <input  type="text" placeholder="Password" />
                        
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-sm-8"></div>
                    <div className="col-sm-4">
                    <div className="d-flex justify-content-end"><button className="tombolmasuk ">Masuk</button></div></div>
                        
                </div>
           </div>
       </section>
        
    )
}

export default masuk