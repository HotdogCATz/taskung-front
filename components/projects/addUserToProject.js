import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";



function AddUserToProject({ userId, projectId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        inviteId: ''
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userId, projectId, formData.inviteId);
        if (formData.inviteId) {
            try {
                let response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}/user/${formData.inviteId}`, {
                    method: 'POST',
                    body: JSON.stringify({
                    }),
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
                    console.log(errorResponse.error);
                    return;
                }


                setFormData({
                    inviteId: ""
                })
                setMessage("add new user to project successfully!");
                // Reload the page
                window.location.reload();
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        } else {
            return setError("All fields are required!");
        }

    };

    return (
        <>
            {error ? <div className='alert-error text-red-600'>{error}</div> : null}
            {message ? <div className='alert-message text-green-600'>{message}</div> : null}
            <Button color='primary' onPress={onOpen}>Add User to Project</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1">Add User to Project</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <div>
                                            <label>User ID:</label>
                                            <input
                                                className='text-gray-500 px-2 border-2 rounded-md'
                                                type="text"
                                                name="inviteId"
                                                value={formData.inviteId}
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
                                        Add User
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

export default AddUserToProject;
