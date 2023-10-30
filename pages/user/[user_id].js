import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


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
            <h2>User Information</h2>
            <p>
                <span className='bg-lime-400'>username: </span>
                <span className='ml-2'>{userData.username}</span>
                <span className='ml-4 bg-lime-400'>user id: </span>
                <span className='ml-2'>{userData.ID}</span>
            </p>
            <h2 className="bg-red-400">User Projects:</h2>
            <ul>
                {userData.Projects.map((project, index) => (
                <li key={index}>
                    <Link href={`/user/${userData.ID}/project/${project.ID}`}>
                        <span className="ml-2 bg-red-200 ml-2">
                            Project name: {project.project_name}, project id: {project.ID}
                        </span>
                    </Link>
                    <ul className="ml-2">
                    <TaskDetails projectId={project.ID} userId={userData.ID} />
                    </ul>
                </li>
                ))}
            </ul>
            {/* <h2 className='bg-red-400'>user projects:</h2>
            <ul>
                {userData.Projects.map((project, index) => (
                    <li key={index}>
                        <h1 className='ml-2 bg-red-200 ml-2'>project name: {project.project_name}, project id: {project.ID}</h1>
                        <ul className='ml-2'>
                            <TaskDetails projectId={project.ID} userId={userData.ID} />
                        </ul>
                    </li>
                ))}
            </ul> */}
            <AddProject userId={userData.ID}/>
        </div>
    );
}

export default User;
