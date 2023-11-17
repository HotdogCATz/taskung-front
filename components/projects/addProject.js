import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import Image from 'next/image'

function AddProject({ userId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                let response = await fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/user/${userId}/project`, {
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
                setMessage("Create Project Successfully!");
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
            <div className='flex'>
                <div className='mr-4'>
                    <Image
                        src="/images/create_pj.png"
                        width={150}
                        height={62}
                        alt="Picture of the author"
                    />
                </div>
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
                                <ModalHeader className="flex flex-col gap-1 text-second-black">Create Project</ModalHeader>
                                <ModalBody>
                                    <div>
                                        {error ? <div className='alert-error text-red-600'>{error}</div> : null}
                                        {message ? <div className='alert-message text-green-600'>{message}</div> : null}
                                        <div className='h-[100px]'>
                                            <label className='text-second-black mr-2'>Project name:</label>
                                            <input
                                                className='text-gray-500 px-2 border-2 rounded-md h-[40px]'
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
                                    <Button className='w-1/2' color="danger" variant="bordered" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button className='w-1/2' color="primary" type="submit" onPress={onClose}>
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
