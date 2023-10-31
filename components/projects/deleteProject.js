import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@nextui-org/react";

import EditProject from './editProject';

function DeleteProject({ userId, projectId, project }) {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                let errorResponse = await response.json();
                setError(errorResponse.error);
                setMessage(""); // Clear any success message
                return;
            }

            setMessage("Project deleted successfully!");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* <button className='border-2' onClick={handleDelete}>Delete Project</button> */}

            <div className='text-center'>
                {error ? <div className='alert-error'>{error}</div> : null}
                {message ? <div className='alert-message w-full'>
                    <Link href={`/user/${userId}`}>
                        <div className='my-4 text-green-400'>
                            {message}
                        </div>
                        <Button className='w-[200px]' color="primary">
                            Back to home
                        </Button>
                    </Link>

                </div> :
                    <div className='flex'>
                        <div className=''>
                            <EditProject userId={userId} projectId={projectId} project={project} />
                        </div>
                        <div className='ml-4'>
                            <Button className='w-[125px]' onPress={handleDelete} color="danger">
                                Delete Project
                            </Button>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}

export default DeleteProject;