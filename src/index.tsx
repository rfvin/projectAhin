import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import inventaris from './halaman/Inventaris/inventaris';
import THEME from "./Theme/theme";
import Login from './halaman/Login/masuk';
import Admin from './halaman/Admin/admin'
import Laporan from "./halaman/Laporan/laporan";
import Inventaris from "./halaman/Inventaris/inventaris";
import Transaksi from "./halaman/Transaksi/transaksi";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <Transaksi/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
