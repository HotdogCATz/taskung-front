import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SetStatus from '../tasks/setStatus';
import Status from '../status';

function UserTask({ userId, projectId, task }) {

    const [projectData, setProjectData] = useState(null);

    const router = useRouter();
    // console.log("project in project detail", projectData);
    useEffect(() => {
        if (userId && projectId) {
            // Fetch user data based on the user ID
            fetch(`http://localhost:8080/user/${userId}/project/${projectId}`)
                .then(response => response.json())
                .then(data => setProjectData(data.project_data))
                .catch(error => console.error('Error:', error));
        }
    }, [router.query]);

    if (!projectData) {
        return <div className='text-second-black'>Loading...</div>;
    }

    return (
        <div className='mt-1 mb-1 bg-gray-600 rounded-md overflow-hidden h-[72px]'>
            <div className='flex justify-between items-center px-2 pb-2'>
                <Link href={`/user/${userId}/project/${projectId}`}>
                    <div className='flex mt-2'>
                        <Status status={task.status} />
                        <div className='pl-2 my-auto'>
                            <p className='text-white text-sm'>{
                                (task.task_name).length > 20 ?
                                    <p>{task.task_name.substring(0, 15)}...</p> : <p>{task.task_name}</p>}</p>
                            <div className='text-[12px] font-light'>
                                <p className='font-extralight text-white/80'>In project: </p>
                                <p>{projectData.project_name.substring(0, 20)}...</p>
                            </div>

                        </div>
                    </div>
                </Link>

                <div className='mt-2'>
                    <SetStatus userId={userId} projectId={projectId} task={task} />
                </div>
            </div>
            <div className='ml-6'>
            </div>
        </div>
    );
}
export default UserTask;