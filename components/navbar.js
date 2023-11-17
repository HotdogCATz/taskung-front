import React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
// import { AcmeLogo } from '/images/logo.png';
import Image from "next/image";

import AddUserToProject from "./projects/addUserToProject";
import DeleteUserFromProject from "./projects/deleteUserFromProject";

import User from "./users/user";

export default function App({ projectData }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const project = projectData
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    const [usersInProject, setUsersInProject] = useState([]);

    // console.log("project data: ", project);
    useEffect(() => {
        const { user_id } = router.query;

        if (user_id) {
            // Fetch user data based on the user ID
            fetch(`https://still-eyrie-42544-e8f9820887ed.herokuapp.com/user/${user_id}`)
                .then(response => response.json())
                .then(data => setUserData(data.user_data))
                .catch(error => console.error('Error:', error));
        }
    }, [router.query]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-gray-800"
        >
            <NavbarContent justify="start">
                <NavbarItem>
                    <Button as={Link} color="default" href={`/user/${userData.ID}`} variant="flat">
                        <p className="text-white">Back</p>
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="" justify="center">
                <NavbarBrand>
                    <div className="">
                        <Image
                            className='mx-auto'
                            src={'/images/logo.png'}
                            alt="Picture of the author"
                            // sizes="100vw"
                            // style={{
                            //     width: '80%',
                            //     height: 'auto',
                            // }}
                            width={90}
                            height={30}
                        />
                    </div>

                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="" justify="end">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarMenu className="bg-gray-800/80">
                <NavbarMenuItem>
                    <div className='md:w-1/2 mx-auto'>
                        <div className="mt-2 mb-4">
                            <User users={userData} project={project} />

                        </div>
                        <div className="mb-2">
                            <AddUserToProject userId={userData.ID} projectId={project.ID} />
                        </div>
                        <div className="">
                            <div className="mt-4 mb-2 flex items-stretch bg-gray-700 h-[30px] rounded-md">
                                <p className="self-center mx-auto text-white text-sm font-light">Current User in Project</p>
                            </div>
                            {project.Users.length <= 1 ?
                                <div>
                                    <p className="text-center">No Co-Worker in Project</p>
                                </div> :
                                project.Users.sort((a, b) => a.ID - b.ID).map((user, index) => (
                                    <div key={index} className="my-1">
                                        {user.ID == userData.ID ? "" : <User users={user} project={project} subUser={true} />}
                                    </div>
                                ))
                            }

                        </div>
                    </div>


                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}