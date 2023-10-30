import { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";



function AddTask({userId, projectId}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [formData, setFormData] = useState({
        task_name: '',
        description: ''
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    console.log(userId, projectId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.task_name) {
            try {
                let response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}/task`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-Type': 'application/json',
                    },
                    })
                    // Check if the response is ok (status code 200-299)
                    if (!response.ok) {
                        let errorResponse = await response.json();
                        setError(errorResponse.error);
                        setMessage(""); // Clear any success message
                        return;
                    }


                    setFormData({
                        project_name : ""
                    })
                    // Reload the page
                    window.location.reload();
                    setMessage("Create Task Successfully!");
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        }else{
            return setError("Name are required!");
        }

    };

    return (
        <>
            <Button onPress={onOpen}>Add Task</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Create Task</ModalHeader>
                            <ModalBody>
                                <div>
                                        {error ? <div className='alert-error text-red-600'>{error}</div> : null}
                                        {message ? <div className='alert-message text-green-600'>{message}</div> : null}
                                        <div>
                                        <label>Task name:</label>
                                        <input
                                            className='border-2 rounded-md'
                                            type="text"
                                            name="task_name"
                                            value={formData.task_name}
                                            onChange={handleChange}
                                        />
                                        </div>
                                        <div>
                                        <label>Task description:</label>
                                        <input
                                            className='border-2 rounded-md'
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                        </div>
                                        {/* <button className='border-2 bg-gray-200' type="submit">Add project</button> */}

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                                <Button color="primary" type="submit">
                                    <button className='w-full h-full' type="submit" onClick={onClose}>Add task</button>
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddTask;
