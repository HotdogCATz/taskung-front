import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from "react";
import Image from 'next/image'


import { Accordion, AccordionItem } from "@nextui-org/react";


import AddProject from '/components/projects/addProject';

import TaskDetails from '/components/tasks/taskDetails';

function User() {

    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const { user_id } = router.query;

        if (user_id) {
            // Fetch user data based on the user ID
            fetch(`http://localhost:8080/user/${user_id}`)
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
            <h2 className='text-center text-xl my-4'>My Home</h2>
            <Accordion defaultExpandedKeys={["1"]} variant="splitted" className=''>
                {/* <AccordionItem key="1" aria-label="Accordion 1" title="My Project" >
                    <div className='grid grid-cols-3 pb-4'>
                        {userData.Projects.sort((a, b) => a.ID - b.ID).map((project, index) => (
                            <div>
                                <div className='w-[80px] h-[80px] bg-[#DDE7FF] mx-auto border-2 border-slate-300 rounded-md drop-shadow-sm' key={index}>
                                    <Link href={`/user/${userData.ID}/project/${project.ID}`}>
                                        <p className="mt-2 text-center text-5xl text-main-black">
                                            {project.project_name.substring(0, 1).toUpperCase()}
                                        </p>
                                    </Link>
                                </div>
                                <p className='text-second-black text-center'>
                                    {(project.project_name).length >= 10 ?
                                        <p>{project.project_name.substring(0, 10)}...</p> 
                                        : <p>{project.project_name}</p>}
                                </p>
                            </div>
                        ))}
                    </div>
                </AccordionItem> */}
                <AccordionItem key="2" aria-label="Accordion 2" title="My Task">
                    {/* {defaultContent} */}
                </AccordionItem>
                <AccordionItem key="3" aria-label="Accordion 3" title={<p className='text-lg text-red-500'>Overdue</p>}>
                    {/* {defaultContent} */}
                </AccordionItem>
            </Accordion>
            <div>
                <p><h2 className='text-center text-xl my-4'>My Project</h2></p>
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
            <div className='absolute bottom-4 right-4'>
                <AddProject userId={userData.ID} />
            </div>
        </div>
    );
}

export default User;
