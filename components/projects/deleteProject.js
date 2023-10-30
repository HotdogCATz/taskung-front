import { useState } from 'react';
import Link from 'next/link';


function DeleteProject({ user_id, project_id }) {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${user_id}/project/${project_id}`, {
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
            <button className='border-2' onClick={handleDelete}>Delete Project</button>

            {error ? <div className='alert-error'>{error}</div> : null}
            {message ? <div className='alert-message'>
                {message}
                <Link href={`/user/${user_id}`}>
                        <span className="border-2">
                            Back to home
                        </span>
                </Link>
            </div> : null}
        </div>
    );
}

export default DeleteProject;