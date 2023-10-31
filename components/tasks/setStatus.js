import { useState } from 'react';
import {Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem} from "@nextui-org/react";
function SetStatus({userId, projectId, task}) {
    // console.log("task", task);
    const [updateStatus, setUpdateStatus] = useState(task.status);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleSave = async (updateStatus) => {
        // e.preventDefault();
        // console.log("status", updateStatus);
        if (updateStatus) {
            try {
            const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}/task/${task.ID}`, {
                method: 'PUT',
                headers: {
                    Accept: "application/json', text/plain, */*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: updateStatus,
                    // Include any other fields you want to edit
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
            setUpdateStatus(task.status)
            setMessage("Update Task Successfully!");
            // Reload the page
            window.location.reload();
        }else{
            return setError("Name are required!");
        }
    };

    return (
        <>
            {/* {error ? <div className='alert-error text-red-600'>{error}</div> : null} */}
            {/* {message ? <div className='alert-message text-green-600'>{message}</div> : null} */}
            {/* <Button onPress={onOpen}>Edit Task</Button> */}
            <Popover placement="right-start">
                <PopoverTrigger>
                    <Button
                        className={updateStatus === 'in-queue' ? '' :
                        updateStatus === 'in-progress' ? 'bg-amber-400' :
                        updateStatus === 'complete' ? 'bg-green-400' : ''}
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
                                <div className='my-auto mr-2 w-[15px] h-[15px] bg-gray-400'></div>
                                <p className='ml-2 text-second-black'>In-queue</p>
                            </div>
                        </ListboxItem>
                        <ListboxItem key="in-progress">
                            <div className='flex'>
                                <div className='my-auto mr-2 w-[15px] h-[15px] bg-orange-400'></div>
                                <p className='ml-2 text-second-black'>In-progress</p>
                            </div>
                        </ListboxItem>
                        <ListboxItem key="complete">
                            <div className='flex'>
                                <div className='my-auto mr-2 w-[15px] h-[15px] bg-green-400'></div>
                                <p className='ml-2 text-second-black'>Complete</p>
                            </div>
                        </ListboxItem>
                    </Listbox>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default SetStatus;
