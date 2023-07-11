import React from "react";
import {getValidationAccess, HttpCode} from "../api/rest";
import {useNavigate} from "react-router-dom";

export default function Auth(props) {
    const [jwt, setJWT] = React.useState("")
    const [isProceed, setIsProceed] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [formMessage, setFormMessage] = React.useState("")
    const [buttonText, setButtonText] = React.useState("")
    const navigate = useNavigate()

    React.useEffect(() => {
        setJWT("")
        setIsError(false)
        setIsProceed(false)
        setFormMessage("Enter your access token (JWT) . . .")
        setButtonText("Validate Access")
    }, [])

    function doValidate() {
        if (jwt === "") {
            setIsError(true)
            setFormMessage("Access Token (JWT) is required.")
            return
        }

        setIsProceed(true)
        setButtonText("Please wait...")

        getValidationAccess(jwt)
            .then((response) => {
                response.json().then(resp => {
                    if (resp.error && resp.code === HttpCode.StatusBadRequest && resp.data?.type === "redirect") {
                        alert(`${resp.data?.type}: ${resp.data?.redirect_reason}`)
                        // eslint-disable-next-line default-case
                        switch (resp.data?.redirect_path) {
                            case "/tenant-detail-form":
                                props.callback(jwt)
                                navigate("/tenant")
                                break
                            case "/tenant-plans":
                                props.callback(jwt)
                                navigate("/plans")
                                break
                        }
                    }

                    if (!resp.error && resp.code === HttpCode.StatusOK) {
                        props.callback(jwt)
                        navigate("/home")
                    }
                })
            })
            .catch((error) => {
                error.response.json().then(errorData => {
                    console.log('Error data:', errorData);
                });
            })
            .finally(() => {
                setIsError(false)
                setFormMessage("Enter your access token (JWT) . . .")
                setIsProceed(false)
                setButtonText("Validate Access")
             })
    }

    return (<>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">You Access Token</label>
                                <input type="text" name="tenant_id" id="tenant_id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" placeholder="access token . . . " required value={jwt} onChange={ e => setJWT(e.currentTarget.value)}/>
                                <p className={`text-sm text-muted-foreground ${isError ? "text-red-500" : "text-gray-500"}`}>{formMessage}</p>
                            </div>
                            <button type="submit" className="flex justify-center items-center w-full text-white bg-blue-600 disabled:bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={doValidate} disabled={isProceed}>
                                {isProceed ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-spin mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
                                    : <></>}
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>)
}