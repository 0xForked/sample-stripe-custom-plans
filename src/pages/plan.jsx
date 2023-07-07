import React from "react";
import {useNavigate} from "react-router-dom";

export default function Plans(props){
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!props.pricingTableId || !props.publishableKey || !props.tenantId)  {
            navigate("/")
        }
    }, [props, navigate])

    return (
        <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-auto">
                <stripe-pricing-table
                    pricing-table-id={props.pricingTableId}
                    publishable-key={props.publishableKey}
                    client-reference-id={props.tenantId}
                    class="w-[1000px]"
                ></stripe-pricing-table>
            </div>
        </section>
    )
}