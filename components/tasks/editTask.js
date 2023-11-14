import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function EditTask({ userId, projectId, task }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // console.log("task", task);
    const [formData, setFormData] = useState({
        updateTaskName: task.task_name,
        updateStatus: task.status,
        updateDescription: task.description,
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (formData.updateTaskName) {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}/task/${task.ID}`, {
                    method: 'PUT',
                    headers: {
                        Accept: "application/json', text/plain, */*",
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        task_name: formData.updateTaskName,
                        status: formData.updateStatus,
                        description: formData.updateDescription
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
            setFormData({
                updateTaskName: task.task_name,
                updateStatus: task.status,
                updateDescription: task.description,
            })
            setMessage("Update Task Successfully!");
            // Reload the page
            window.location.reload();
        } else {
            return setError("Name are required!");
        }
    };

    return (
        <>
            {/* {error ? <div className='alert-error text-red-600'>{error}</div> : null}
            {message ? <div className='alert-message text-green-600'>{message}</div> : null} */}
            <Button onPress={onOpen}>Edit Task</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSave}>
                                <ModalHeader className="text-second-black flex flex-col gap-1">Edit Task</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <div>
                                            <label className='text-second-black mr-2'>Task name:</label>
                                            <input
                                                className='px-2 text-gray-500 border-2 rounded-md'
                                                type="text"
                                                name="updateTaskName"
                                                value={formData.updateTaskName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Task description:</label>
                                            <textarea
                                                rows="4" cols="50"
                                                className='px-2 text-gray-500 border-2 rounded-md'
                                                type="text"
                                                name="updateDescription"
                                                value={formData.updateDescription}
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
                                        Confirm
                                        {/* <button className='w-full h-full' type="submit" onClick={onClose}>Add project</button> */}
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

export default EditTask;
