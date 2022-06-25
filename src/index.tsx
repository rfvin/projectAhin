import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import inventaris from './halaman/inventaris';
import THEME from "./theme/theme";
import Login from './halaman/login';
import Admin from './halaman/admin'
import Laporan from "./halaman/laporan";
import Inventaris from "./halaman/inventaris";
import Transaksi from "./halaman/transaksi";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <Laporan/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
