import { useState } from 'react';
import Link from 'next/link';
import {Button} from "@nextui-org/react";


function DeleteUserFromProject({ deleteUserId, projectId }) {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/project/${projectId}/user/${deleteUserId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                let errorResponse = await response.json();
                setError(errorResponse.error);
                setMessage(""); // Clear any success message
                return;
            }

            setMessage("User deleted successfully!");
            // Reload the page
            window.
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
        
    };

    return (
        <div>
            {/* <button className='border-2' onClick={handleDelete}>Delete Project</button> */}
            <Button onPress={handleDelete} color="danger">
                Delete User
            </Button>

            {error ? <div className='alert-error'>{error}</div> : null}
            {message ? <div className='alert-message'>{message}</div> : null}
        </div>
    );
}

export default DeleteUserFromProject;