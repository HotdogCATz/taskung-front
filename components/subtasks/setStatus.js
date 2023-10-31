import { useState } from 'react';
import React from "react";

import { Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

function SetStatus({ userId, projectId, taskId, subTask }) {
    const [updateStatus, setUpdateStatus] = useState(subTask.status);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSave = async (updateStatus) => {
        if (updateStatus) {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}/task/${taskId}/${subTask.ID}`, {
                    method: 'PUT',
                    headers: {
                        Accept: "application/json', text/plain, */*",
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: updateStatus,
                    }),
                });
                const data = await response.json();

                // Check if the response is ok (status code 200-299)
                if (!response.ok) {
                    let errorResponse = await response.json();
                    setError(errorResponse.error);
                    setMessage(""); // Clear any success message
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
            }
            setUpdateStatus(subTask.status)
            setMessage("Update Task Successfully!");
            // Reload the page
            window.location.reload();
        } else {
            return setError("Name are required!");
        }
    };

    return (
        <>
            <Popover placement="right-start">
                <PopoverTrigger>
                    <Button
                        className={updateStatus === 'in-queue' ? 'text-white border-2 border-gray-400 bg-transparent' :
                            updateStatus === 'in-progress' ? 'text-white border-2 border-amber-400 bg-transparent' :
                                updateStatus === 'complete' ? 'text-white border-2 border-green-400 bg-transparent' : ''}
                        endContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        }>{updateStatus} </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Listbox
                        aria-label="Actions"
                        onAction={(key) => handleSave(key)}
                    >
                        <ListboxItem key="in-queue">
                            <div className='flex'>
                                <div className='my-auto w-[10px] h-[10px] bg-gray-400'></div>
                                <p className='text-second-black ml-2'>In-queue</p>
                            </div>
                        </ListboxItem>
                        <ListboxItem key="in-progress">
                            <div className='flex'>
                                <div className='my-auto w-[10px] h-[10px] bg-orange-400'></div>
                                <p className='text-second-black ml-2'>In-progress</p>
                            </div>
                        </ListboxItem>
                        <ListboxItem key="complete">
                            <div className='flex'>
                                <div className='my-auto w-[10px] h-[10px] bg-green-400'></div>
                                <p className='text-second-black ml-2'>Complete</p>
                            </div>
                        </ListboxItem>
                    </Listbox>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default SetStatus;
