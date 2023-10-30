import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>
        <h1 className='text-6xl'>hello how can you come to this page? :/</h1>
      </main>
    </>
  )
}
