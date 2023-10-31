import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function EditProject({ userId, projectId, project }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        updateProjectName: project.project_name
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (formData.updateProjectName) {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}`, {
                    method: 'PUT',
                    headers: {
                        Accept: "application/json', text/plain, */*",
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        project_name: formData.updateProjectName,
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
                updateProjectName: project.project_name
            })
            setMessage("Update Project Successfully!");
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
            <Button className='w-[125px]' onPress={onOpen}>Edit Project</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSave}>
                                <ModalHeader className="flex flex-col gap-1">Edit Project</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <div>
                                            <label>Project name:</label>
                                            <input
                                                className='text-gray-500 px-2 border-2 rounded-md'
                                                type="text"
                                                name="updateProjectName"
                                                value={formData.updateProjectName}
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
