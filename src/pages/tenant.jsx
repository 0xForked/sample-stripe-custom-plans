import React from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {HttpCode, postTenantDetail} from "../api/rest";

const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    headquarter: yup.string().required(),
    sector: yup.string().required(),
    size: yup.string().required(),
    website_url: yup.string().url().required(),
    linkedin_url: yup.string().url().required(),
    twitter_url: yup.string().url().required(),
    facebook_url: yup.string().url().required(),
    instagram_url: yup.string().url().required(),
    github_url: yup.string().url().required(),
}).required();

export default function Tenant(props) {
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const [isProceed, setIsProceed] = React.useState(false)
    const [buttonText, setButtonText] = React.useState("")

    const navigate = useNavigate()

    React.useEffect(() => {
        setIsProceed(false)
        setButtonText("Make changes")
        if (!props.tenantId)  {
            navigate("/")
        }
    }, [props, navigate])

    const onSubmit = (data) => {
        setIsProceed(true)
        setButtonText("Please wait . . .")

        postTenantDetail(props.tenantId, data)
            .then((response) => {
                response.json().then(resp => {
                    if (resp.error) {
                        alert(`${resp.data?.type}: ${resp.data?.redirect_reason}`)
                       return
                    }

                    if (!resp.error && resp.code === HttpCode.StatusCreated) {
                        navigate("/home")
                    }
                })
            })
            .catch((error) => {
                error.response.json().then(errorData => {
                    alert(`Error data: ${errorData}`);
                });
            })
            .finally(() => {
                setIsProceed(false)
                setButtonText("Make changes")
            })
    };

   return (
       <section className="bg-gray-50 dark:bg-gray-900">
           <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
               <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 w-2/4">
                   <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Update Tenant Data
                       </h3>
                   </div>
                   <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="grid gap-4 mb-4 sm:grid-cols-2">
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organization name" required {...register('name')}/>
                               {errors?.name && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.name?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Headquarter</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City, Country" required {...register('headquarter')}/>
                               {errors?.headquarter && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.headquarter?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IT, Medical, ..." required {...register('sector')} />
                               {errors?.sector && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.sector?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                               <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("size")}>
                                   <option selected="">Select company size</option>
                                   <option value="0-10">0-10</option>
                                   <option value="11-25">11-25</option>
                                   <option value="26-50">26-50</option>
                                   <option value="51-100">51-100</option>
                                   <option value=">100">More than 100</option>
                               </select>
                               {errors?.size && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.size?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://lorem.com" required {...register('website_url')}/>
                               {errors?.website_url && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.website_url?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LinkedIn URL</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://linkedin.com/in/lorem" required {...register('linkedin_url')} />
                               {errors?.linkedin_url && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.linkedin_url?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter URL</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://twitter.com/lorem" required {...register('twitter_url')}/>
                               {errors?.twitter_url && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.twitter_url?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook URL</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://facebook.com/lorem" required {...register('facebook_url')}/>
                               {errors?.facebook_url && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.facebook_url?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram URL</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://instagram.com/lorem" required {...register('instagram_url')}/>
                               {errors?.instagram_url && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.instagram_url?.message}
                               </p>}
                           </div>
                           <div>
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub URL</label>
                               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://github.com/lorem" required {...register('github_url')}/>
                               {errors?.github_url && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.github_url?.message}
                               </p>}
                           </div>
                           <div className="sm:col-span-2">
                               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                               <textarea rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here" {...register('description')}></textarea>
                               {errors?.description && <p className={`text-sm text-muted-foreground text-red-500`}>
                                   {errors?.description?.message}
                               </p>}
                           </div>
                       </div>
                       <button type="submit" className="text-white inline-flex items-center bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right" disabled={isProceed}>
                           {isProceed
                               ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-spin mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
                               : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/></svg>}
                           {buttonText}
                       </button>
                   </form>
               </div>
           </div>
       </section>
   )
}