import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from "react";

import Register from '../components/auth/register'
import Login from '../components/auth/login'
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [selected, setSelected] = React.useState("login");

  return (
    <>
      <main>
        <div className='mt-14'>
          <Image
            className='mx-auto'
            src={'/images/logo.png'}
            alt="Picture of the author"
            sizes="100vw"
            style={{
              width: '80%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
        </div>
        <div className="mt-4 flex flex-col w-full">
          <Card className="mx-auto max-w-full w-[340px] h-[400px] bg-second-black">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
                  <Login/>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <Register/>
                </Tab>
              </Tabs>
            </CardBody>
        </Card>
      </div>
      <div className='flex justify-center align-center'>
            <div className='absolute bottom-4'>
              <p className='text-center text-white text-sm font-extralight'>Mini-Project by Wutichai</p>
            </div>
      </div>
      </main>
    </>
  )
}
