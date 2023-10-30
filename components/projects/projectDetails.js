// components/projects/ProjectDetails.js

import { useRouter } from 'next/router';
import TaskDetails from '/components/tasks/taskDetails';
import { useEffect, useState } from 'react';

import EditProject from './editProject'
import DeleteProject from './deleteProject';
import AddTask from '../tasks/addTask'

function ProjectDetails () {
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

    // if (!user_id || !project_id) {
    //     return (
    //         <div>
    //             <h2>Project Details</h2>
    //             <p>
    //                 User ID: {user_id}, Project ID: {project_id}
    //             </p>
    //             <p>Don't have task yet? Create one!</p>
    //             <p>user in group:</p>
    //             {projectData && projectData.Users && projectData.Users.map((user, index) => (
    //                 <span key={index}> {user.username} </span>
    //             ))}
    //             <AddTask user_id={user_id} project_id={project_id}/>
    //         </div>
    //     );
    // }
    return (
        <div>
            <h2>Project Details</h2>
            <p>
                User ID: {userId}, Project ID: {projectId}
            </p>
            <p>Project name: {projectData.project_name}</p>
            <p>user in group:</p>
            {projectData.Users.map((user, index) => (
                <span key={index}> {user.username} </span>
            ))}
            <div className='ml-4'>
                <EditProject userId={userId} projectId={projectId}/>
                <DeleteProject user_id={userId} project_id={projectId}/>
            </div>
            <TaskDetails project_name={projectData.project_name} projectId={projectId} userId={userId} />
            <AddTask userId={userId} projectId={projectId}/>
        </div>
    );
}

export default ProjectDetails;
