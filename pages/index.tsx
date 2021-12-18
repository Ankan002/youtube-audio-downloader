import Head from 'next/head'
import InputForm from '../components/InputForm'
import Loading from '../components/Loading'
import { useRecoilState } from 'recoil'
import {globalLoading} from '../atom/loadingAtom'
import Output from '../components/Output'

export default function Home() {

  const[loading, setLoading] = useRecoilState(globalLoading)

  return (
    <div className="flex flex-col min-h-screen items-center bg-black">
      <Head>
        <title>YAudio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex-grow min-w-full flex flex-col items-center'>
        <h1 className="mt-3 text-3xl font-bold tracking-widest text-[#D5D5D5] font-serif">YAudio</h1>
        <InputForm />
        
        {
          loading ? (
            <Loading />
          ) : (
            <Output />
          )
        }
      </div>

      <div className='h-40 flex flex-col items-start justify-center'>
        <button className='text-black bg-yellow-600 font-extrabold text-xl p-3 rounded-2xl hover:text-yellow-600 hover:bg-black font-serif'>
          <a href='https://www.buymeacoffee.com/ankan002'>
            ☕Buy Me A Coffee
          </a>
        </button>
      </div>
    </div>
  )
}
