import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";



function AddSubTask({ userId, projectId, taskId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    // console.log(userId, projectId, taskId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.task_name) {
            try {
                let response = await fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/user/${userId}/project/${projectId}/task/${taskId}/subtask`, {
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
                    project_name: ""
                })
                // Reload the page
                window.location.reload();
                setMessage("Create SubTask Successfully!");
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        } else {
            return setError("Name are required!");
        }

    };

    return (
        <>
            <Button color='success' variant='bordered' onPress={onOpen} className='w-full'>Add Subtask</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <ModalHeader className=" text-second-black flex flex-col gap-1">Create Subtask</ModalHeader>
                                <ModalBody>
                                    <div>
                                        {/* {error ? <div className='alert-error text-red-600'>{error}</div> : null}
                                        {message ? <div className='alert-message text-green-600'>{message}</div> : null} */}
                                        <div>
                                            <label className='text-second-black mr-2'>Subtask name:</label>
                                            <input
                                                className='text-gray-500 px-2 border-2 rounded-md'
                                                type="text"
                                                name="task_name"
                                                value={formData.task_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className='text-second-black mr-2'>Subtask description:</label>
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
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit" onPress={onClose}>
                                        Add Sub task
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

export default AddSubTask;
