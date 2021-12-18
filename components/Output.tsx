import React from 'react'
import { useRecoilState } from 'recoil'
import { result } from '../atom/resultAtom'

const Output = () => {

    const [apiResult, setApiResult] = useRecoilState<any>(result)

    return (
        <div className='min-w-full p-5 flex flex-col items-center justify-center'>

            {
                apiResult?.status === 'ok' && (
                    <>
                        <h1 className='text-xl text-yellow-300 font-bold font-serif'>{apiResult?.title}</h1>
                        {
                            apiResult?.link && (
                                <a href={apiResult?.link}>
                                    <button className='text-xl text-gray-900 bg-yellow-600 font-bold p-5 rounded-2xl my-8 font-serif'>

                                        Download Now

                                    </button>
                                </a>
                            )
                        }
                    </>
                )
            }

            {
                (apiResult?.status !== 'ok' && apiResult?.status !== undefined) && (
                    <>
                        <h1 className='text-xl text-yellow-300 font-bold font-serif'>
                            {(apiResult?.msg).toString().toUpperCase()}.{" "}Try to reloading the page and download again.....
                        </h1>
                        <button className='text-xl text-gray-900 bg-yellow-600 font-bold p-5 rounded-2xl my-8 font-serif' onClick={() => location.reload()}>

                            Refresh Now

                        </button>
                    </>
                )
            }



        </div>
    )
}

export default Output
