import '@/styles/globals.css'
import { NextUIProvider } from "@nextui-org/react";

// import Layout from '@/components/layout';

// Add Google font : Prompt
import { Prompt } from 'next/font/google'
const prompt = Prompt({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})


export default function App({ Component, pageProps }) {
  return (
    <main className={prompt.className}>
      <NextUIProvider>
        {/* <Layout> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </NextUIProvider>
    </main>
  )
}
