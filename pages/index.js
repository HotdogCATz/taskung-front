import Image from 'next/image'
import { Inter } from 'next/font/google'

import Register from '../components/auth/register'
import Login from '../components/auth/login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>
        <Register/>
        <Login/>
      </main>
    </>
  )
}
