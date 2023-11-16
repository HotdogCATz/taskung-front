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
        // console.log(userId, projectId, formData.inviteId);
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
            <Button className='w-full text-blue-200' color='primary' variant='flat' onPress={onOpen} startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            }>Invite User to Project</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit}>
                                <ModalHeader className="text-second-black flex flex-col gap-1">Add User to Project</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <div>
                                            <label className='text-second-black mr-2'>User ID:</label>
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
