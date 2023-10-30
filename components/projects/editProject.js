import { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";



function EditProject({project_name, userId, projectId}) {
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

    const [editedProjectName, setEditedProjectName] = useState(project_name);
    const handleSave = async (e) => {
        e.preventDefault();
        if (formData.project_name) {
            try {
            setEditedProjectName(formData.project_name)
            const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}`, {
                method: 'PUT',
                headers: {
                    Accept: "application/json', text/plain, */*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_name: formData.project_name,
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
                project_name : ""
            })
            // Reload the page
            window.location.reload();
            setMessage("Update Project Successfully!");
        }else{
            return setError("Name are required!");
        }
    };

    return (
        <>
            <Button onPress={onOpen}>Edit Project</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <form onSubmit={handleSave}>
                            <ModalHeader className="flex flex-col gap-1">Edit Project</ModalHeader>
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

export default EditProject;
