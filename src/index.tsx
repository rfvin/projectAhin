import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./halaman/login";
import RouterPath from "./Router/router";
import { Route } from "react-router";
import Daftar from "./halaman/daftar";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <RouterPath/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
