import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Accordion, AccordionItem } from "@nextui-org/react";

import EditSubTask from './editSubTask';
import DeleteSubTask from './deleteSubTask';
import SetStatus from './setStatus';
import Status from '../status';

function SubtaskDetails({ userId, projectId, taskId }) {
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
        <div className={subtasks.length != 0 ? '' : 'hidden'}>
            {/* <h4 className='text-amber-400'>subtask :</h4> */}
            <ul>
                {subtasks.sort((a, b) => a.ID - b.ID).map((subtask, index) => (
                    <li key={index}>
                        <div className='mt-2 bg-second-black rounded-md overflow-hidden'>
                            <Accordion selectionMode="multiple" className=''>
                                <AccordionItem
                                    key="1"
                                    aria-label="Accordion 1"
                                    title={
                                        <div className='flex justify-between px-2'>
                                            <div className='flex'>
                                                <Status status={subtask.status} />
                                                <p className='text-white my-auto text-sm'>{
                                                    (subtask.task_name).length > 15 ?
                                                        <p>{subtask.task_name.substring(0, 15)}...</p> : <p>{subtask.task_name}</p>}</p>
                                            </div>
                                            <div>
                                                <SetStatus userId={userId} projectId={projectId} taskId={taskId} subTask={subtask} />
                                            </div>
                                        </div>}
                                >
                                    <div className='bg-zinc-700 rounded-md overflow-hidden'>
                                        <div className='border-gray-500 border-1 rounded-md pd-1 flex text-sm justify-between'>
                                            <div>
                                                <p className='px-4 pt-1 text-gray-400'>Subtask Name: </p>
                                                <p className='px-4 pt-1 text-gray-400'> {subtask.task_name}</p>
                                            </div>
                                            <div>
                                                <p className='px-4 pt-1 text-gray-400'>Subtask ID: {subtask.ID}</p>
                                            </div>
                                        </div>
                                        <p className='px-4 py-4'>
                                            <span className='text-gray-400 text-sm'>Task Description: </span>
                                            <p className='text-gray-200'>{subtask.description}</p>
                                        </p>
                                        <div className='flex py-2 mt-2 border-t-[0.5px] rounded-md border-gray-500 px-4 justify-between'>
                                            <div className='text-gray-400 text-sm'>
                                                <p >Task Status:</p>
                                                <p className='text-gray-300'>{subtask.status}</p>
                                            </div>
                                            <div className='flex'>
                                                <div className='mr-2'>
                                                    <EditSubTask userId={userId} projectId={projectId} taskId={taskId} subTask={subtask} />
                                                </div>
                                                <div>
                                                    <DeleteSubTask userId={userId} projectId={projectId} taskId={taskId} subTaskId={subtask.ID} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default SubtaskDetails