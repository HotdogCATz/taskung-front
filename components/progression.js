import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Progress } from "@nextui-org/react";

export default function Progression({ projectId, userId }) {
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

    const allProgress = tasks.length
    const completedProgress = tasks.filter(task => task.status === 'complete').length
    const inProgressProgress = tasks.filter(task => task.status === 'in-progress').length
    const inQueuedProgress = tasks.filter(task => task.status === 'in-queue').length

    const projectProgress = (completedProgress / allProgress) * 100

    return (
        <>
            <div className='bg-gray-700 rounded-md h-[120px]'>
                <div className='bg-gray-800 mb-2 rounded-md'>
                    <p className='text-center'>Project Progression</p>
                </div>
                <div className='flex justify-center w-full'>
                    <div className='px-6 w-full'>
                        <Progress
                            radius="sm"
                            classNames={{
                                base: "max-w-md mx-auto",
                                track: "drop-shadow-md border border-default",
                                indicator: "mx-auto h-[10px] bg-gradient-to-r from-[#7EB4E3] to-[#65BF7C]",
                                label: "tracking-wider text-sm font-light text-white/80",
                                value: "text-white/80 text-sm font-light",
                            }}
                            label={<div className=''>Progression</div>}
                            value={projectProgress >= 0 ? projectProgress : 0}
                            showValueLabel={true}
                        />
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='flex justify-between mt-2 text-[12px] font-extralight lg:w-8/12'>
                        <div className='flex my-1 mx-1'>
                            <div className='w-[18px] h-[18px] bg-gray-500 rounded-md mr-2'></div>
                            <p>in-queue: {inQueuedProgress}</p>
                        </div>
                        <div className='flex my-1 mx-1'>
                            <div className='w-[18px] h-[18px] bg-amber-600 rounded-md mr-2'></div>
                            <p>in-progress: {inProgressProgress}</p>
                        </div>
                        <div className='flex my-1 mx-1'>
                            <div className='w-[18px] h-[18px] bg-green-600 rounded-md mr-2'></div>
                            <p>complete: {completedProgress}</p>
                        </div>
                    </div>
                </div>

                {/* <div>
                <p>all: {tasks.length}</p>
                <p>complete: {tasks.filter(task => task.status === 'complete').length}</p>
                <p>in-progress: {tasks.filter(task => task.status === 'in-progress').length}</p>
                <p>in-queue: {tasks.filter(task => task.status === 'in-queue').length}</p>
            </div> */}
            </div>

        </>

    )
}
