import React, {useState} from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Tenant from "./pages/tenant";
import Plans from "./pages/plan";

export default function App() {
    const [jwt, setJWT] = useState("")
    const pageCallback = (jwt) => setJWT(jwt)

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={
                    <Auth callback={pageCallback}/>
                } />
                <Route path="/home" element= {
                    <Home jwt={jwt}/>
                } />
                <Route path="/tenant" element={
                    <Tenant jwt={jwt} />
                } />
                <Route path="/plans" element={
                    <Plans jwt={jwt} />
                } />
                <Route path="/subscription-failed" element={
                    <>
                        Ohh no, why? . . .
                        <button onClick={() => window.location.href="/"}>back home</button>
                    </>
                } />
                <Route path="/subscription-success" element={
                    <>
                        Thanks for subscribe!
                        <button onClick={() =>  window.location.href="/"}>back home</button>
                    </>
                } />
                <Route path="*" element={<>Page Not Found</>} />
            </Routes>
        </BrowserRouter>
    )
}