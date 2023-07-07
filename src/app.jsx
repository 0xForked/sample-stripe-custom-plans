import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Tenant from "./pages/tenant";
import Plans from "./pages/plan";

export default function App() {
    const [tenantId, setTenantId] = useState("")
    const [pricingTableId, setPricingTableId] = useState("")
    const [publishableKey, setPublishableKey] = useState("")

    const pageCallback = (tenantId, pricingTableId, publishableKey) => {
        setTenantId(tenantId)
        setPricingTableId(pricingTableId)
        setPublishableKey(publishableKey)
    }

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={
                    <Auth callback={pageCallback}/>
                } />
                <Route path="/home" element= {
                    <Home tenantId={tenantId} callback={pageCallback}/>
                } />
                <Route path="/tenant" element={
                    <Tenant tenantId={tenantId}/>
                } />
                <Route path="/plans" element={
                    <Plans
                        tenantId={tenantId}
                        pricingTableId={pricingTableId}
                        publishableKey={publishableKey}
                    />
                } />
                <Route path="*" element={<>Page Not Found</>} />
            </Routes>
        </BrowserRouter>
    )
}