import React from "react";
import {useNavigate} from "react-router-dom";
import {getTenantDetail, HttpCode, postManageBilling} from "../api/rest";

export default function Home(props) {
    const navigate = useNavigate()
    const [isProceed, setIsProceed] = React.useState(false)
    const [tenant, setTenantData] = React.useState(null)
    const [isProceedManageBilling, setIsProceedManageBilling] = React.useState(false)
    const [manageBillingButtonText, setManageBillingButtonText] = React.useState("Manage Subscription")

    React.useEffect(() => {
        if (!props.jwt)  {
            navigate("/")
        }

        setIsProceed(true)

        getTenantDetail(props.jwt)
            .then((response) => {
                response.json().then(resp => {
                    if (resp.error && resp.code === HttpCode.StatusBadRequest && resp.data?.type === "redirect") {
                        alert(`${resp.data?.type}: ${resp.data?.redirect_reason}`)
                        // eslint-disable-next-line default-case
                        switch (resp.data?.redirect_path) {
                            case "/tenant-plans":
                                props.callback(
                                    props.tenantId,
                                    resp.data?.stripe_pricing_table_key,
                                    resp.data?.stripe_publishable_key)
                                navigate("/plans")
                                break
                        }
                    }
                    setTenantData(resp.data)
                })
            })
            .catch((error) => {
                error.response.json().then(errorData => {
                    console.log('Error data:', errorData);
                });
            })
            .finally(() => {
                setIsProceed(false)
            })
    }, [props, navigate])

    const requestManageBilling = () => {
        setIsProceedManageBilling(true)
        setManageBillingButtonText("Please wait . . .")
        postManageBilling(props.jwt)
            .then((response) => {
                response.json().then(resp => {
                    if (resp.error && resp.code === HttpCode.StatusBadRequest) {
                        console.log(`error sob ${resp.data}`)
                    }

                    if (!resp.error && resp.code === HttpCode.StatusOK) {
                        console.log(resp.data)
                        window.location.href = resp?.data?.url
                    }
                })
            })
            .catch((error) => {
                error.response.json().then(errorData => {
                    console.log('Error data:', errorData);
                });
            })
            .finally(() => {
                setIsProceedManageBilling(false)
                setManageBillingButtonText("Manage Subscription")
            })
    }

    return (
        <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-auto">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {isProceed
                        ? <div className="text-center">Loading please wait . . .</div>
                        : <div className="flex flex-col items-center pb-10 mt-8">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" alt="skilledin"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{tenant?.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{tenant?.description}</span>
                        <div className="flex mt-4 space-x-3 md:mt-6">
                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg disabled:bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={requestManageBilling} disabled={isProceedManageBilling}>
                                {manageBillingButtonText}
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </section>
    )
}