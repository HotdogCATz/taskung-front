import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function SubtaskDetails({ userId, projectId, taskId}) {
    const [subtasks, setSubtasks] = useState([]);

    useEffect(() => {
        const fetchSubtasks = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}/task/${taskId}/subtask`);
                const data = await response.json();
                setSubtasks(data.sub_task_data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSubtasks();
    }, [taskId, userId]);

    return (
        <div className={subtasks.length != 0 ? '':'hidden'}>
            <h4 className='bg-amber-400'>subtask :</h4>
            <ul>
                {subtasks.map((subtask, index) => (
                    <li key={index}>
                        <h4 className='bg-amber-200 ml-2'>subtask name: {subtask.task_name}, subtask id: {subtask.ID}</h4>
                        <h4 className='bg-amber-100 ml-2'>status: {subtask.status}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default SubtaskDetails