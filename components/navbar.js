import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
// import { AcmeLogo } from '/images/logo.png';
import Image from "next/image";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-gray-800"
        >
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
            <NavbarContent className="sm:hidden" justify="end">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            {/* <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="warning" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent> */}

            <NavbarMenu className="bg-gray-800">
                <NavbarMenuItem>
                    <p>pro</p>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}