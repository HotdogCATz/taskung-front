// components/projects/ProjectDetails.js

import { useRouter } from 'next/router';
import TaskDetails from '/components/tasks/taskDetails';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Accordion, AccordionItem } from "@nextui-org/react";


import EditProject from './editProject'
import DeleteProject from './deleteProject';
import DeleteUserFromProject from './deleteUserFromProject';
import AddUserToProject from './addUserToProject';
import AddTask from '../tasks/addTask'

import Navbar from '../navbar';

function ProjectDetails() {
    const [projectData, setProjectData] = useState(null);
    const [userId, setUserId] = useState(null)
    const [projectId, setProjectId] = useState(null)

    const router = useRouter();

    useEffect(() => {
        const { user_id, project_id } = router.query;
        setUserId(user_id);
        setProjectId(project_id);
        if (user_id && project_id) {
            // Fetch user data based on the user ID
            fetch(`http://localhost:8080/user/${user_id}/project/${project_id}`)
                .then(response => response.json())
                .then(data => setProjectData(data.project_data))
                .catch(error => console.error('Error:', error));
        }
    }, [router.query]);

    if (!projectData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <Link href={`/user/${userId}`}>
                <p className='text-xl text-center my-4'>{projectData.project_name}</p>
            </Link>
            <div className='px-2 py-1 border-1 border-gray-600 bg-gray-800 overflow-hidden rounded-md'>
                <p className=''>Project Name: {projectData.project_name}</p>
                <p className=''>
                    Project ID: {projectId}
                </p>
            </div>

            <div className='flex justify-center mt-4'>
                <div className=''>
                    <DeleteProject userId={userId} projectId={projectId} project={projectData} />
                </div>
            </div>
            <p className='rounded-md overflow-hidden pl-4 pt-1 mb-2 mt-4 text-lg font-bold h-[35px] bg-sky-400'>Tasks:</p>

            <div className='px-2'>
                <TaskDetails projectId={projectId} userId={userId} />
            </div>
            <div className='w-full h-[20px] mt-14 mb-14'></div>
            <div className='sticky z-10'>
                <div className='fixed bottom-4 right-4 '>
                    <AddTask userId={userId} projectId={projectId} />
                    <p className='text-center text-sm font-light pt-1 drop-shadow-md'>Add Task</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
