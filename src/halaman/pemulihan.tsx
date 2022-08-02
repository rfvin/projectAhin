import { Link } from "react-router-dom";
import '../index.css'

const Pemulihan = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-item-center d-flex justify-content-center" style={{ marginTop: '15vh' }}>
                    <h1 className="title">Pemulihan</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 align-item-center ">
                    <h5 className="text-center margintop">Silahkan berikan pertanyaan dan jawaban Anda<br />
                        jika Anda lupa password.
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col-12 align-item-center ">
                    <h5 className="text-center margintop">
                        <label htmlFor="" className="text-danger mt-3">Mohon lengkapi informasi pemulihan lupa password. </label>
                    </h5>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <form className="form-inline d-flex justify-content-center">
                    <select className="custom-select custom-select-lg my-1 mr-sm-2" data-width="100%" id="inlineFormCustomSelectPref">
                        <option selected>Pilih pertanyaan pemulihan</option>
                        <option value="1">Siapa nama sahabat terbaikmu?</option>
                        <option value="2">Apa nama binatang peliharaanmu?</option>
                        <option value="3">Apa pelajaran yang paling kamu sukai?</option>
                    </select>
                </form>
                <div className="col-4">
                    <input type="text" className="mt-3 form-control" placeholder="Jawaban" />
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5">Jika sudah, silahkan tekan tombol Daftar dibawah<br />
                    untuk mulai menggunakan aplikasi.
                </h5>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4 center">
                    <button className="mt-2 btn btn-primary"> Daftar </button>
                </div>
            </div>
            <div className="row">
                <h5 className="text-center mt-5">Sudah Daftar?<br />
                    <Link to="/">
                        Masuk
                    </Link>
                </h5>
            </div>
        </div>
    )
}

export default Pemulihan