import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@nextui-org/react";


function DeleteUserFromProject({ deleteUserId, projectId }) {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/project/${projectId}/user/${deleteUserId}`, {
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
                Kick User
            </Button>

            {error ? <div className='alert-error'>{error}</div> : null}
            {message ? <div className='alert-message'>{message}</div> : null}
        </div>
    );
}

export default DeleteUserFromProject;