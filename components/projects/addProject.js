import { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";



function AddProject({userId}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [formData, setFormData] = useState({
        project_name: ''
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.project_name) {
            try {
                let response = await fetch(`http://localhost:8080/user/${userId}/project`, {
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
                    setMessage("Create Project Successfully!");
            } catch (error) {
                setError(error.toString()); // Convert error object to string
            }
        }else{
            return setError("All fields are required!");
        }

    };

    return (
        <>
            <Button onPress={onOpen}>Add Project</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Create Project</ModalHeader>
                            <ModalBody>
                                <div>
                                        {error ? <div className='alert-error text-red-600'>{error}</div> : null}
                                        {message ? <div className='alert-message text-green-600'>{message}</div> : null}
                                        <div>
                                        <label>Project name:</label>
                                        <input
                                            className='border-2 rounded-md'
                                            type="text"
                                            name="project_name"
                                            value={formData.project_name}
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
                                    Add project
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

export default AddProject;
