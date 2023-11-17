import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Listbox, ListboxItem } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

import Image from 'next/image';

import User from '../users/user';


function AddTask({ userId, project }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        task_name: '',
        description: ''
    });
    const [userTaskId, setUserTaskId] = useState()
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSave = async (setUserId) => {
        setUserTaskId(setUserId);
        console.log("userTaskIdId:", userTaskId);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // console.log("e", e);
        // console.log("form:", formData);
    };

    // console.log(userId, projectId);
    // console.log("user id", userId, "project:", project);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.task_name) {
            try {
                let response = await fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/user/${userId}/project/${project.ID}/task`, {
                    method: 'POST',
                    body: JSON.stringify({
                        task_name: formData.task_name,
                        description: formData.description,
                        user_task_id: parseInt(userTaskId, 10)
                    }),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-Type': 'application/json',
                    },
                })
                // console.log("user id:", userId, "project id:", project.ID);
                // Check if the response is ok (status code 200-299)
                if (!response.ok) {
                    let errorResponse = await response.json();
                    setError(errorResponse.error);
                    setMessage(""); // Clear any success message
                    return;
                }


                setFormData({
                    project_name: ""
                })
                // Reload the page
                window.location.reload();
                setMessage("Create Task Successfully!");
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        } else {
            return setError("Name are required!");
        }

    };

    return (
        <>
            {/* <Button color='primary' onPress={onOpen}>Add Task</Button> */}
            <div className='flex'>
                <a className='cursor-pointer' onClick={onOpen}>
                    <div className=''>
                        <Image
                            src="/icons/Add.svg"
                            width={60}
                            height={60}
                            alt="Picture of the author"
                        />
                    </div>
                </a>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <ModalHeader className="text-second-black flex flex-col gap-1">Create Task</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <div>
                                            <label className='text-second-black mr-2'>Task name:</label>
                                            <input
                                                className='text-gray-500 px-2 border-2 rounded-md'
                                                type="text"
                                                name="task_name"
                                                value={formData.task_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className='text-second-black mr-2'>description:</label>
                                            <textarea
                                                rows="4" cols="39"
                                                className='text-gray-500 px-2 border-2 rounded-md'
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {/* <button className='border-2 bg-gray-200' type="submit">Add project</button> */}

                                    </div>
                                    <Popover placement="top">
                                        <PopoverTrigger onClose>
                                            <Button
                                                className={""}
                                                endContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                </svg>
                                                }>
                                                {userTaskId == null ? <div>Assign to User</div> :
                                                    <div>
                                                        {project.Users.map((user, index) => (
                                                            <div key={index}>
                                                                {user.ID == userTaskId ?
                                                                    <div className='flex items-stretch'>
                                                                        <p className='self-center mr-2'>Assign to:</p>
                                                                        <Avatar size='sm' src={user.Avatar} />
                                                                        <p className='ml-2 text-[12px] font-light self-center'>{user.username}</p>
                                                                    </div> :
                                                                    <div></div>}
                                                            </div>
                                                        ))}
                                                    </div>}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent >
                                            <Listbox
                                                aria-label="Actions"
                                                onAction={(key) => handleSave(key)}
                                            >
                                                {userTaskId == null ?
                                                    <ListboxItem >
                                                    </ListboxItem> :
                                                    <ListboxItem key={null}>
                                                        <div className="flex item-stretch my-1 text-second-black text-center border-1 border-main-black rounded-md h-[50px]">
                                                            <p className='self-center mx-auto'>Remove Assign</p>
                                                        </div>
                                                    </ListboxItem>}
                                                {project.Users.sort((a, b) => a.ID - b.ID).map((user, index) => (
                                                    <ListboxItem key={user.ID}>
                                                        <div key={index} className="my-1 text-second-black">
                                                            <User users={user} project={project} subUser={true} showDeleteBtn={false} />
                                                        </div>
                                                    </ListboxItem>

                                                ))}
                                            </Listbox>
                                        </PopoverContent>




                                    </Popover>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit" onPress={onClose}>
                                        Add task
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}

export default AddTask;
