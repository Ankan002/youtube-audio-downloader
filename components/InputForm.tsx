import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { result } from '../atom/resultAtom'
import { globalLoading } from '../atom/loadingAtom'

//Dummy Response
// duration: 201.97877632641
// link: "https://cdn02.ytjar.xyz/get.php/7/49/xTuBmbZZ-ag.mp3?cid=MTczLjI0OS4xMC4yMjJ8TkF8REU%3D&h=936uYomHFIxBQAjLF69PYQ&s=1639845123&n=Dil-Ibadat-Unplugged-Cover-Adnan-Ahmad-Tum-Mile-KK-Emraan-Hashmi"
// msg: "success"
// progress: 0
// status: "ok"
// title: "Dil Ibadat - Unplugged Cover | Adnan Ahmad | Tum Mile | KK | Emraan Hashmi"

const InputForm = () => {

    const [currentLink, setCurrentLink] = useState<string | null>('')
    const [previousLink, setPreviousLink] = useState<string | null>('')
    const [loading, setLoading] = useRecoilState(globalLoading)
    const [apiResult, setApiResult] = useRecoilState(result)

    const onGetLinkClick = async () => {
        if (loading) return
        if (currentLink === '') return
        if (currentLink === previousLink) return

        setPreviousLink(currentLink)

        const firstArrayChunck: Array<string> = currentLink.split('/')

        if (!firstArrayChunck[3]) return

        const metaDataArrayChunk: Array<string> = firstArrayChunck[3].split('&')

        if (!metaDataArrayChunk[0]) return

        const idArrayChunk: Array<string> = metaDataArrayChunk[0].split('=')

        if (!idArrayChunk[1]) return

        const id: string = idArrayChunk[1]

        setLoading(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": process.env.NEXT_PUBLIC_HOST,
                "x-rapidapi-key": process.env.NEXT_PUBLIC_KEY
            }
        })

        const data = await response.json()

        setApiResult(data)

        setLoading(false)

        setCurrentLink('')
    }

    return (
        <div className='min-w-full m-10 px-10 flex flex-col items-center'>
            <input
                className="shadow appearance-none border border-gray-900 rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 h-12 text-lg font-serif" id="username"
                type="text"
                placeholder="YouTube Link"
                onChange={(e) => setCurrentLink(e.target.value)}
            />
            <button
                className='text-gray-900 my-5 bg-gray-400 p-3 rounded-lg font-bold text-lg font-serif'
                onClick={onGetLinkClick}
            >
                Get Download Link
            </button>
        </div>
    )
}

export default InputForm
