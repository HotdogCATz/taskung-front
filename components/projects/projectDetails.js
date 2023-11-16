// components/projects/ProjectDetails.js

import { useRouter } from 'next/router';
import TaskDetails from '/components/tasks/taskDetails';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Accordion, AccordionItem } from "@nextui-org/react";


// import EditProject from './editProject'
import DeleteProject from './deleteProject';
// import DeleteUserFromProject from './deleteUserFromProject';
// import AddUserToProject from './addUserToProject';
import AddTask from '../tasks/addTask'

import Navbar from '../navbar';
import Progression from '../progression';

function ProjectDetails() {
    const [projectData, setProjectData] = useState(null);
    const [userId, setUserId] = useState(null)
    const [projectId, setProjectId] = useState(null)

    const router = useRouter();
    // console.log("project in project detail", projectData);
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
    // console.log("project data:", projectData);
    // console.log("user in project data:", projectData.Users);
    if (!projectData) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Navbar projectData={projectData} />
            <div className='md:w-1/2 mx-auto'>
                <Link href={`/user/${userId}`}>
                    <div className='mt-4 mb-2 border-1 border-gray-600 bg-gray-800 overflow-hidden rounded-md'>
                        <p className='text-xl text-center'>{projectData.project_name}</p>
                    </div>
                </Link>
                <div className='px-2 py-1'>
                    <p className='text-md font-light'>Project Name: {projectData.project_name}</p>
                    <p className='text-md font-light'>Project ID: {projectId}</p>
                </div>
                <div className='my-4 mt-2'>
                    <Progression userId={userId} projectId={projectData.ID} />
                </div>

                <div className='flex justify-center mt-4'>
                    <div className=''>
                        <DeleteProject userId={userId} projectId={projectId} project={projectData} />
                    </div>
                </div>
                <p className='rounded-md overflow-hidden pl-4 pt-1 mb-2 mt-4 text-lg font-bold h-[35px] text-sky-800 bg-sky-400'>Tasks:</p>

                <div className='px-2'>
                    <TaskDetails projectId={projectId} userId={userId} />
                </div>
                <div className='w-full h-[20px] mt-14 mb-14'></div>
                <div className='sticky z-10'>
                    <div className='fixed bottom-4 right-4'>
                        <AddTask userId={userId} project={projectData} />
                        <p className='text-center text-sm font-light pt-1 drop-shadow-md'>Add Task</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProjectDetails;
