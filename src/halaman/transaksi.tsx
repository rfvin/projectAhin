import React, { SetStateAction, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Theme/theme.css'
import '../index.css'
import THEME from "../Theme/theme";
import Inventaris from "./inventaris";
import { collection, addDoc, getDocs, doc,query,setDoc,where } from "firebase/firestore";
import { db } from "../firebase";
import { resolve } from "path";

const Transaksi = () => {

    const inventarisCollectionRef = collection(db, 'Inventaris')
    const transaksiCollectionRef = collection (db, 'transaksi')
    const riwayatPembelianCollectionRef = collection(db,'riwayat_pembelian')
    const daftarPiutangCollectionRef = collection (db,'daftar_piutang')
    
    const [inventaris, setInventaris] = useState<Array<object>>([])
    const [cart, setCart] = useState<Array<object>>([])
    const [total,setTotal] = useState<number>(0)
    const [totalManual,setTotalManual] = useState<number>(0)
    const [isInputManual, setIsInputManual] = useState<boolean>(false)

    //filter
    const [filter,setFilter] = useState("")
    const [isFilter,setIsFilter] = useState(false)

    //State Belum lunas
    interface BelumLunasProps{
        nama_pembeli:string,
        keterangan:string
    }

    const [belumLunas,setBelumLunas] = useState<BelumLunasProps>({
        'nama_pembeli' : '',
        'keterangan' : '',
    })


    const getInventaris = () => {
        new Promise(resolve => {
            resolve(
                getDocs(inventarisCollectionRef).then(res => {
                    setInventaris(res.docs.map(doc => {
                        return [doc.data(), doc.id]
                    }))
                })
            )
        })
    }

    const searchInventaris = async () => {
        setIsFilter(true)
        const query_inventaris = query(inventarisCollectionRef,where("kode_barang","==" ,filter))
        const querySnapshot = await getDocs(query_inventaris)
        let search_result:any = []
            querySnapshot.forEach((doc) =>{
                search_result =     [...search_result,[doc.data,doc.id]]
            });
            setInventaris(search_result)
    }

    const removeSearch = () => {
        let filter_input = document.getElementById('filter_input')
        setFilter("")
        setIsFilter(false)
        getInventaris()
        // @ts-ignore
        filter_input.value = ""
    }

    const addToCart = (obj:any) => {
        obj.jumlah_beli = 1 
        obj.tanggal_transaksi = new Date().toISOString()
        obj.total_harga = Number(obj.harga_barang)
        var exists = cart.some((e:any)=> e.id === obj.id)
        if(!exists) {
            setCart([...cart,obj])
            setTotal(total + Number(obj.harga_barang))
        }else{
            setCart([...cart.filter(function(el:any){
                return el.id != obj.id;
            })])
            setTotal(total+Number(obj.harga_barang))
        }
    } 
    const checkIfItemInCart = (item:any)=>{
        return cart.some((e:any)=> e.id === item.id)
    }

    const editItemOnCartWhenCheckout =(item:any,value:string) =>{
        let cartExist: any = cart
        for (let i = 0; i < cartExist.length; i++) {
            if (cartExist[i].id === item.id) {
                let tmp = total - (Number(cartExist[i].jumlah_beli) * Number(cartExist[i].harga_barang))
                if (value.length != 0 && value != undefined && value !== "0" && value) {
                    cartExist[i].jumlah_beli = value;
                    cartExist[i].total_harga = Number(cartExist[i].harga_barang) * Number(value)
                    tmp += Number(cartExist[i].harga_barang) * Number(value)
                    console.log(tmp)
                } else {
                    cartExist[i].jumlah_beli = 1;
                    cartExist[i].total_harga = Number(cartExist[i].harga_barang)
                    tmp += Number(cartExist[i].harga_barang)
                }
                setTotal(tmp)
                break
            }
        }
        setCart(cartExist)
    }

    const deleteItemOnCartWhenCheckout = (item:any) => {
        let selected: any = cart.filter(function (el: any) {
            return el.id === item.id;
        })[0]
        setTotal(Number(total) - Number(selected.jumlah_beli * selected.harga_barang))

        setCart([...cart.filter(function (el: any) {
            return el.id != item.id;
        })])
    }

    const addTransaction = (status:string) => {
        const collection_id_generated = new Date().toISOString() + '#' + Math.random().toString(36).replace(/[^a-z]+/g,'')

        if(cart.length>0){
            setDoc(doc(db,'transaksi',`${collection_id_generated}`),{
                doc_id: collection_id_generated
            }).then(() => {
                cart.map((item:any) => {
                    new Promise(resolve =>{
                        resolve(
                            setDoc(doc(db,`transaksi/${collection_id_generated}/item`,`doc#${item.id}`),{
                                item
                            }).then(()=>{
                                setDoc(doc(db,`transaksi/${collection_id_generated}/total_harga`,`doc#${collection_id_generated}`),{
                                    total_harga_transaksi:status === 'lunasManual'? Number(totalManual) : Number(total)
                                })  
                            })
                        )
                    })
                })

                if(status == 'lunas' || status === 'lunasManual') {
                    new Promise(resolve => {
                        resolve(
                            addDoc(riwayatPembelianCollectionRef, {
                                kode_transaksi : collection_id_generated,
                                nama_pembeli : '',
                                total_harga_transaksi : status === 'lunasManual' ? Number(totalManual) : Number(total)
                            }).then(()=> {
                                window.location.reload()
                            })
                        )
                    })
                }

                if(status == 'belumLunas') {
                    new Promise(resolve => {
                        resolve(
                            addDoc(daftarPiutangCollectionRef, {
                                kode_transaksi : collection_id_generated,
                                nama_pembeli : belumLunas.nama_pembeli,
                                total_harga_transaksi : Number(total)
                            }).then(()=> {
                                window.location.reload()
                            })
                        )
                    })
                }

            })
        }
    }
    

    useEffect(() => {
        getInventaris()
    }, [])

    return (
        <THEME title={"Transaksi"} subtitle={"Hitung total pembelian barang"}>
            <>
            <div className="row mt-5">
                    <div className="col-12">
                        <div className="row justify-content-between">
                            <div className="col-4">
                                <span>Menampilkan {inventaris.length} barang</span> <br/>
                            </div>
                            <div className="col-4 d-flex">
                                <input id="filter_input" className="form-control form-control-lg" type="text"
                                       placeholder="Cari berdasarkan kode barang"
                                       aria-label=".form-control-lg example"
                                       onChange={(e) => {
                                           setFilter(e.target.value)
                                       }}
                                       defaultValue={filter}
                                />
                                <button onClick={() => {
                                    searchInventaris()
                                }} className="btn btn-primary text-white "><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        {
                            isFilter &&
                            <div className="row mt-3">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    Menampilkan hasil pencarian untuk kode barang
                                    <strong className="ms-2">{filter}</strong>
                                    <button
                                        onClick={() => {
                                            removeSearch()
                                        }}
                                        type="button" className="btn-close" data-bs-dismiss="alert"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                        }

                        {/* Table menampilkan Data */}
                        <div className="row mt-3">
                            <div className="col-12">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nama Barang</th>
                                        <th scope="col">Kode Barang</th>
                                        <th scope="col">Harga Barang</th>
                                        <th scope="col">Sisa</th>
                                        <th scope="col">Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        inventaris.length > 0 && inventaris.map((data: any, idx) => {
                                            data[0].id = data[1]
                                            return (
                                                <tr key={data[0].id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{data[0].nama_barang}</td>
                                                    <td>{data[0].kode_barang}</td>
                                                    <td>{data[0].harga_barang}</td>
                                                    <td>{data[0].jumlah_barang}</td>
                                                    <td><input className="checkbox" type="checkbox" checked={checkIfItemInCart(data[0])}
                                                               onChange={() => {
                                                                   addToCart(data[0])
                                                               }}/></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 justify-content-center">
                        <button className="btn btn-primary center" type="button" data-bs-toggle="modal"
                                data-bs-target="#modalCheckout">Bayar
                        </button>
                    </div>
                </div>

                {/* Modal Checkout */}

                <div className="modal fade" id="modalCheckout" tabIndex={-1} aria-labelledby="modalCheckoutLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title text-white" id="#exampleModalLabel">Bayar</h5>
                                <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Nama Barang</th>
                                                <th>Kode Barang</th>
                                                <th>Harga Barang</th>
                                                <th>Stok Barang</th>
                                                <th>Jumlah Barang</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.length > 0 ?
                                                    cart.map((item:any)=> {
                                                        return( 
                                                            <tr key={item.id}>
                                                                <td>{item.nama_barang}</td>
                                                                <td>{item.kode_barang}</td>
                                                                <td>{item.harga_barang}</td>
                                                                <td>{item.jumlah_barang}</td>
                                                                <td>
                                                                    <input type="text" 
                                                                    placeholder={"Default 1 Item"}
                                                                    onChange={(e) => {
                                                                        editItemOnCartWhenCheckout(item,e.target.value)
                                                                    }} className ="form-control"/>
                                                                </td>
                                                                <td className="text-center pointer" >
                                                                    <i className="bi bi-trash" onClick={() =>{
                                                                        deleteItemOnCartWhenCheckout(item)
                                                                    }}></i>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                :
                                                <tr>
                                                    <td colSpan={6}><span>Belum Ada Item Terpilih, Silahkan Pilih Item!</span></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-body" id="myGroup">
                                <div className="row">
                                    <div className="col-7">
                                        <h3>Total Harga : Rp. {total}</h3>
                                    </div>
                                    <div className="col-5">
                                        <div className="row">
                                            <div className="col-6 d-flex">
                                                <button type="button" className="btn btn-success" data-parent="#myGroup"
                                                data-bs-toggle ="collapse"
                                                data-bs-target="#konfirmasiLunas">
                                                    Lunas
                                                </button>
                                            </div>
                                            <div className="col-6 d-flex">
                                                <button type="button" className="btn btn-success button-xs" data-parent="#myGroup"
                                                data-bs-toggle ="collapse"
                                                data-bs-target="#inputManual">
                                                    Input Manual
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row mt-1">
                                        <div className="col-6 d-flex">
                                        <button type="button" className="btn btn-danger" data-parent="#myGroup"
                                                data-bs-toggle ="collapse"
                                                data-bs-target="#belumLunas">
                                                    Belum Lunas
                                                </button>
                                        </div>
                                        <div className="col-6 d-flex">
                                            <button type="button" className="btn btn-danger">
                                                Hapus Semua
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 p-5 accordion-group">
                                    {/* Konfirmasi Lunas */}
                                    <div className="collapse" id="konfirmasiLunas">
                                        <div className="card card-body ">
                                            <h2>Konfirmasi Lunas ?</h2>
                                            <h5>Pembelian akan dianggap telah dibayar lunas</h5>
                                            <div className="col text-end">
                                                <button type="button" className="btn btn-primary me-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#konfirmasiHapus"> Batal
                                                </button>
                                                <button type="button" className="btn btn-light" onClick={()=>{
                                                    addTransaction("lunas")
                                                }}>Lunas</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Input Manual */}
                                    <div className="collapse" id="inputManual">
                                        <div className="card card-body">
                                            <h1>Input Manual?</h1>
                                            <h5>Input Nominal Pembayaran Secara Manual</h5>
                                        </div>
                                            
                                            <form onSubmit={(event) =>{
                                                event.preventDefault()
                                                setIsInputManual(true)
                                                addTransaction('lunasManual')
                                                  
                                            }}>
                                                <div className="form-group">
                                                    <input type="number" required={true} className="form-control"
                                                    defaultValue={Number(total)}
                                                    onChange={(e:SetStateAction<any>) => {
                                                        setTotalManual(e.target.value)
                                                    }}
                                                    />
                                                </div>

                                                <div className="col text-end mt-3">
                                                    <button className="btn btn-primary me-2"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target= "#inputManual" onClick={() =>{
                                                            setIsInputManual(false)
                                                        }}>Batal</button>

                                                    <button type="submit" className="btn btn-primary">Simpan</button>
                                                </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Belum Lunas */}
                                <div className="collapse" id="belumLunas">
                                    <div className="card card-body">
                                        <h5>Masukkan nama pembeli untuk disimpan ke daftar piutang.</h5>

                                        <form onSubmit={(event) => {
                                            event.preventDefault()
                                            addTransaction("belumLunas")
                                        }}>

                                            <div className="form-group">
                                                <input type="text" required={true} className="form-control"
                                                    onChange={(e:SetStateAction<any>) => {
                                                        setBelumLunas((prev:BelumLunasProps) => ({
                                                            ...prev,
                                                            nama_pembeli:e.target.value 
                                                        }))
                                                    }}
                                                    placeholder="Nama Pembeli"
                                                     />
                                            </div>
                                            <div className="form-group mt-3">
                                                <input required={true} className="form-control"
                                                    onChange={(e:SetStateAction<any>) => {
                                                        setBelumLunas((prev:BelumLunasProps) => ({
                                                            ...prev,
                                                            keterangan:e.target.value 
                                                        }))
                                                    }}
                                                    placeholder="Keterangan"
                                                />
                                            </div>
                                            <div className="col text-end mt-3">
                                                <button className="btn btn-primary me-2"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#belumLunas">
                                                        Batal
                                                </button>
                                                <button className="btn btn-primary">
                                                    Simpan
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </THEME>
    )

}

export default Transaksi;