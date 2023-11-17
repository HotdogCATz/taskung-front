import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from "react";
import Image from 'next/image'
import Head from 'next/head';

import { Accordion, AccordionItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";


import AddProject from '/components/projects/addProject';
import UserTask from '@/components/users/userTask';
import User from '@/components/users/user';

function App() {

    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const { user_id } = router.query;

        if (user_id) {
            // Fetch user data based on the user ID
            fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/user/${user_id}`)
                .then(response => response.json())
                .then(data => setUserData(data.user_data))
                .catch(error => console.error('Error:', error));
        }
    }, [router.query]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Head>
                <title>Taskung - Home</title>
                <meta
                    name="Taskung"
                    key="desc"
                />
            </Head>
            <div className='flex justify-around items-stretch bg-gray-800 h-[64px]'>
                <div className="invisible self-center">
                    <Button as={Link} color="default" href={`/user/${userData.ID}`} variant="flat">
                        <p className="text-white">Back</p>
                    </Button>
                </div>
                <div className="self-center">
                    <Image
                        className='mx-auto'
                        src={'/images/logo.png'}
                        alt="Picture of the author"
                        // sizes="100vw"
                        // style={{
                        //     width: '80%',
                        //     height: 'auto',
                        // }}
                        width={90}
                        height={30}
                    />
                </div>
                <div className="self-center">
                    <Button as={Link} color="danger" href={`/`} variant="ghost">
                        <p className="text-white">Logout</p>
                    </Button>
                </div>
            </div>
            <div className='md:w-1/2 mx-auto'>
                <div>
                    <div>
                        <User users={userData} project={userData.Projects} />
                    </div>
                    <h2 className='text-center text-xl my-4'>My Home</h2>
                    <div className='bg-gray-300 rounded-md overflow-hidden mx-2'>
                        <Accordion defaultExpandedKeys={["1"]} className=''>
                            <AccordionItem key="2" aria-label="Accordion 2" title="My Task">
                                <div className=''>
                                    {userData.UserTask.sort((a, b) => a.ID - b.ID).map((task, index) => (
                                        <div className='' key={index}>
                                            {task.status === "complete" ? <div></div> : <UserTask userId={userData.ID} projectId={task.project_id} taskId={task.ID} task={task} />}
                                        </div>
                                    ))}
                                </div>
                            </AccordionItem>
                            {/* <AccordionItem key="3" aria-label="Accordion 3" title={<p className='text-lg text-red-500'>Overdue</p>}>
                        </AccordionItem> */}
                        </Accordion>
                    </div>

                </div>

                <div>
                    <p><h2 className='text-center text-xl my-4'>My Projects</h2></p>
                    <div className='grid grid-cols-3 pb-4'>
                        {userData.Projects.map((project, index) => (
                            <div>
                                <div className='w-[80px] h-[80px] bg-[#DDE7FF] mt-4 mx-auto border-2 border-slate-300 rounded-md drop-shadow-sm' key={index}>
                                    <Link href={`/user/${userData.ID}/project/${project.ID}`}>
                                        <p className="mt-2 font-bold text-center text-5xl text-main-black">
                                            {project.project_name.substring(0, 1).toUpperCase()}
                                        </p>
                                    </Link>
                                </div>
                                <div className='text-center'>
                                    {(project.project_name).length >= 10 ?
                                        <p>{project.project_name.substring(0, 10)}...</p>
                                        : <p>{project.project_name}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-[20px] mt-14 mb-14'></div>
                <div className='sticky z-10'>
                    <div className='fixed bottom-4 right-4 md:right-64'>
                        <AddProject userId={userData.ID} />
                        <p className=' text-end text-[12px] font-light pt-1 drop-shadow-md'>Create Project</p>
                    </div>
                </div>
                {/* <div className='md:relative'>
                    <div className='absolute bottom-4 right-4 md:top-0'>
                        <AddProject userId={userData.ID} />
                    </div>
                </div> */}

            </div>

        </div>
    );
}

export default App;
