import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SubtaskDetails from '/components/subtasks/subtaskDetails';
import AddSubTask from '../subtasks/addSubTask';
import DeleteTask from './deleteTask';
import SetStatus from './setStatus';
import EditTask from './editTask';
import Task from './task';

function TaskDetails({ projectId, userId }) {
    const [tasks, setTasks] = useState([]);
    // console.log("task detail:", user);
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
        <div className={tasks.length != 0 ? '' : 'hidden'}>
            <p className='mt-2 rounded-md overflow-hidden pl-4 pt-1 h-[35px] bg-gray-600 text-white'>IN-QUEUE</p>
            {tasks.sort((a, b) => a.ID - b.ID).map((task, index) => (
                <div key={index}>
                    {task.status === 'in-queue' ?
                        <Task userId={userId} projectId={projectId} taskId={task.ID} task={task} />
                        :
                        <div></div>
                    }
                </div>

            ))}
            <p className='mt-6 rounded-md overflow-hidden pl-4 pt-1 h-[35px] bg-amber-600 text-white'>IN-PROGRESS</p>
            {tasks.sort((a, b) => a.ID - b.ID).map((task, index) => (
                <div key={index}>
                    {task.status === 'in-progress' ?
                        <Task userId={userId} projectId={projectId} taskId={task.ID} task={task} />
                        :
                        <div></div>
                    }
                </div>
            ))}
            <p className='mt-6 rounded-md overflow-hidden pl-4 pt-1 h-[35px] bg-green-600 text-white'>COMPLETE</p>
            {tasks.sort((a, b) => a.ID - b.ID).map((task, index) => (
                <div key={index}>
                    {task.status === 'complete' ?
                        <Task userId={userId} projectId={projectId} taskId={task.ID} task={task} />
                        :
                        <div></div>
                    }
                </div>
            ))}
        </div>
    );
}
export default TaskDetails;