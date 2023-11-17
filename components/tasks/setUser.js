import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Avatar } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

import User from '../users/user';


function SetUser({ userId, projectId, task }) {

    const [projectData, setProjectData] = useState(null);

    const router = useRouter();
    // console.log("project in project detail", projectData);
    useEffect(() => {

        if (userId && projectId) {
            // Fetch user data based on the user ID
            fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/user/${userId}/project/${projectId}`)
                .then(response => response.json())
                .then(data => setProjectData(data.project_data))
                .catch(error => console.error('Error:', error));
        }
    }, [router.query]);
    // console.log("userId:", userId, "projectId:", projectId);
    // console.log("taskId:", task.ID, "userTaskId:", task.user_task_id);
    // console.log("project data:", projectData);
    if (!projectData) {
        return <div className='flex text-white text-sm font-light'>
            <CircularProgress size="sm" aria-label="Loading..." />
            <div className='ml-2 flex item-stretch'>
                <p className='self-center'>Loading...</p>
            </div>
        </div>;
    }

    const handleSave = async (userTaskId) => {

        try {
            console.log("user task id", userTaskId);
            console.log(typeof userTaskId);

            // Convert userTaskId to an integer
            const taskIdAsInt = parseInt(userTaskId, 10);
            console.log(typeof taskIdAsInt);
            const response = await fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/user/${userId}/project/${projectId}/task/${task.ID}`, {
                method: 'PUT',
                headers: {
                    Accept: "application/json', text/plain, */*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_task_id: taskIdAsInt,
                    // Include any other fields you want to edit
                }),
            });
            // console.log("userId:", userId, "projectId:", projectId);
            // console.log("taskId:", task.ID, "userTaskId:", task.user_task_id);
            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                let errorResponse = await response.json();
                return;
            }

        } catch (error) {
            console.error('Error:', error);
        }
        // Reload the page
        window.location.reload();
    };

    return (
        <>
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <Button
                        className='w-full'
                        endContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        }>{task.user_task_id == 0 ?
                            <div>
                                <p>Assign to User</p>
                            </div> :
                            <div>
                                {projectData.Users.map((user, index) => (
                                    <div key={index}>
                                        {user.ID == task.user_task_id ?
                                            <div className='flex items-stretch'>
                                                <p className='self-center mr-2'>Assign to:</p>
                                                <Avatar size='sm' src={user.Avatar} />
                                                <p className='ml-2 text-[12px] font-light self-center'>{user.username}</p>
                                            </div> :
                                            <div></div>}
                                    </div>
                                ))}
                            </div>
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent >
                    <Listbox
                        aria-label="Actions"
                        onAction={(key) => handleSave(key)}
                    >
                        {projectData.Users.sort((a, b) => a.ID - b.ID).map((user, index) => (
                            <ListboxItem key={user.ID}>
                                <div key={index} className="my-1 text-second-black">
                                    <User users={user} project={projectData} subUser={true} showDeleteBtn={false} />
                                </div>
                            </ListboxItem>

                        ))}
                    </Listbox>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default SetUser;
