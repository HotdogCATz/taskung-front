import React from "react";
import { User } from "@nextui-org/react";

import DeleteUserFromProject from "../projects/deleteUserFromProject";

export default function App({ users, project, subUser, showDeleteBtn = true }) {
    const user = users
    return (
        <>
            {subUser ?
                <div className="border-1 border-second-black p-1 pl-4 rounded-lg">
                    <User
                        name={<div className="text-lg">{user.username}</div>}
                        description={
                            <div className="">
                                <div>
                                    <p>user ID: {user.ID}</p>
                                </div>


                            </div>}
                        avatarProps={{
                            src: `${user.Avatar}`
                        }}
                    />
                    {showDeleteBtn ?
                        <div className="relative w-full">
                            <div className="absolute right-2 md:right-8">
                                <div className="-mt-11">
                                    <DeleteUserFromProject deleteUserId={user.ID} projectId={project.ID} />
                                </div>
                            </div>
                        </div> : <div></div>}

                </div> :
                <div className="bg-second-black p-1 pl-4 rounded-lg">
                    <User
                        name={<div className="text-lg">{user.username}</div>}
                        description={
                            <div>
                                <p>user ID: {user.ID}</p>
                            </div>}
                        avatarProps={{
                            className: "w-[50px] h-[50px]",
                            src: `${user.Avatar}`
                        }}
                    />
                </div>
            }
        </>
    );
}
