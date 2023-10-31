import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Accordion, AccordionItem } from "@nextui-org/react";

import SubtaskDetails from '/components/subtasks/subtaskDetails';
import AddSubTask from '../subtasks/addSubTask';
import DeleteTask from './deleteTask';
import SetStatus from './setStatus';
import EditTask from './editTask';
import Status from '../status';

function Task({ userId, projectId, task }) {

    return (
        <div className='mt-2 mb-6 bg-second-black rounded-md overflow-hidden'>
            <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]} className=''>
                <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title={
                        <div className='flex border-b-[0.5px] justify-between px-2 pb-2'>
                            <div className='flex'>
                                <Status status={task.status} />
                                <p className='text-white my-auto text-sm'>{
                                    (task.task_name).length > 20 ?
                                        <p>{task.task_name.substring(0, 20)}...</p> : <p>{task.task_name}</p>}</p>
                            </div>
                            <div>
                                <SetStatus userId={userId} projectId={projectId} task={task} />
                            </div>
                        </div>}
                >
                    <div className='bg-gray-700 rounded-md overflow-hidden'>
                        <Accordion selectionMode="multiple" className=''>
                            <AccordionItem
                                key="1"
                                aria-label="Accordion 1"
                                title={
                                    <div className='flex justify-between px-2 '>
                                        <div className='flex text-white'>
                                            <p className='text-gray-100 my-auto text-sm'>Task Details</p>
                                        </div>
                                    </div>}
                            >
                                <div className=''>
                                    <div className='border-gray-500 border-1 rounded-md pd-1 flex text-sm justify-between'>
                                        <p className='px-4 pt-1 text-gray-400'>Task Name: {task.task_name}</p>
                                        <p className='px-4 pt-1 text-gray-400'>Task ID: {task.ID}</p>
                                    </div>
                                    <p className='px-4 py-4'>
                                        <span className='text-gray-400 text-sm'>Task Description: </span>
                                        <p className='text-gray-200'>{task.description}</p>
                                    </p>

                                    <div className='flex py-2 mt-2 border-t-[0.5px] rounded-md border-gray-500 px-4 justify-between'>
                                        <div className='text-gray-400 text-sm'>
                                            <p >Task Status:</p>
                                            <p className='text-gray-300'>{task.status}</p>
                                        </div>
                                        <div className='flex'>
                                            <div className='mr-2'>
                                                <EditTask userId={userId} projectId={projectId} task={task} />
                                            </div>
                                            <div>
                                                <DeleteTask userId={userId} projectId={projectId} taskId={task.ID} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className='mt-2 bg-gray-700 rounded-md overflow-hidden'>
                        <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]} className=''>
                            <AccordionItem
                                key="1"
                                aria-label="Accordion 1"
                                title={
                                    <div className='flex justify-between px-2 '>
                                        <div className='flex text-white'>
                                            <p className='my-auto text-sm'>Subtask</p>
                                        </div>
                                    </div>}
                            >
                                <div>
                                    <SubtaskDetails userId={userId} projectId={projectId} taskId={task.ID} />
                                    <div className='mt-2'>
                                        <AddSubTask userId={userId} projectId={projectId} taskId={task.ID} />
                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>

                    </div>
                </AccordionItem>

            </Accordion>
            <div className='ml-6'>
            </div>
        </div>
    );
}
export default Task;