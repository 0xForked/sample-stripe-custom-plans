import React from "react";
import {useNavigate} from "react-router-dom";
import {getPlans, HttpCode} from "../api/rest";

export default function Plans(props){
    const navigate = useNavigate()
    const [isPageLoading, setIsPageLoading] = React.useState(false)
    const [isYearly, setIsYearly] = React.useState(false)
    const [plans, setPlans] = React.useState([])

    React.useEffect(() => {
        setIsPageLoading(true)
        setPlans([])

        // setTimeout(() => {
        //     setIsPageLoading(false)
        // }, 1000)
        // if (!props.jwt)  {
        //     navigate("/")
        // }
        //

        getPlans(props.jwt)
            .then((response) => {
                response.json().then(resp => {
                    if (resp.error) {
                        alert(`Error: ${resp.data}`)
                        return
                    }
                    setPlans(resp.data)
                })
            })
            .catch((error) => {
                error.response.json().then(errorData => {
                    alert(`Error data: ${errorData}`);
                });
            })
            .finally(() => {
                setIsPageLoading(false)
            })
    }, [props, navigate])

    const pickPlan = (stripeProductId) => {
        let stripePricingId = ""
        plans.forEach((plan) => {
            if (plan?.stripe_product_id === stripeProductId) {
                plan?.prices.forEach((price) => {
                    const isYear = (isYearly && price?.recurring_interval === "year")
                    const isMonth = (!isYearly && price?.recurring_interval === "month")
                    if (isYear || isMonth) {
                        stripePricingId = price?.stripe_price_id;
                    }
                });
            }
        });
        console.log(stripeProductId, stripePricingId)
    }

    return (
        <section className="dark:bg-gray-900">
            {isPageLoading
                ? <div className="text-center mt-40">Loading please wait . . .</div>
                : <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Please select a plan
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Here at SkilledIn, we offer a variety of plans to suit your needs.
                    </p>

                    <div className="flex items-center justify-center mt-8">
                        <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">Monthly</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isYearly}
                                onChange={e => setIsYearly(e.currentTarget.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Yearly (save 18%)</span>
                    </div>

                </div>
                <div className="flex">
                    {plans.map((plan, index) =>
                        <div key={index} className="flex flex-col p-6 mx-auto max-w-lg w-2/4 text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <h3 className="mb-4 text-2xl font-semibold capitalize">{plan?.name}</h3>
                        <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400 capitalize">{plan.description}</p>

                        {/*  pricing  */}
                        {plan.prices.map((price, index) => isYearly
                            ? price?.recurring_interval === "year" &&<div className={`justify-center items-baseline my-8`} key={index}>
                                <span className="font-extrabold">{price?.currency.toUpperCase()} </span>
                                <span className="mx-2 text-5xl font-extrabold">{price?.price}</span>
                                <span className="text-gray-500 dark:text-gray-400">/{price?.recurring_interval}</span>
                            </div>
                            : price?.recurring_interval === "month" && <div className={`justify-center items-baseline my-8`} key={index}>
                                <span className="font-extrabold">{price?.currency.toUpperCase()} </span>
                                <span className="mx-2 text-5xl font-extrabold">{price?.price}</span>
                                <span className="text-gray-500 dark:text-gray-400">/{price?.recurring_interval}</span>
                            </div>
                        )}

                        <ul className="mb-8 space-y-4 text-left">
                            {/* features */}
                            {plan.features.map((feature, index) =>
                                <li key={index} className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            )}
                        </ul>

                        <button className="mt-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-blue-900" onClick={() => pickPlan(plan?.stripe_product_id)}>Start for Free</button>
                        <p className="text-center mt-2 text-sm text-gray-500">30 days free trial</p>
                    </div>)}
                </div>
            </div>}
        </section>
    )
}