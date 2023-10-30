import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SubtaskDetails from '/components/subtasks/subtaskDetails';

function TaskDetails({ projectId, userId }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}/project/${projectId}/task`);
                const data = await response.json();
                setTasks(data.task_data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTasks();
    }, [projectId, userId]);

    return (
        <div className={tasks.length != 0 ? '':'hidden'}>
            <h2 className='bg-sky-400 ml-2'>Tasks:</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <h3 className='bg-sky-200 ml-4'>task name: {task.task_name}, task id: {task.ID}</h3>
                        <h3 className='bg-sky-100 ml-4'>status: {task.status}</h3>
                        <div className='ml-6'>
                            <SubtaskDetails userId={userId} projectId={projectId} taskId={task.ID}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TaskDetails;