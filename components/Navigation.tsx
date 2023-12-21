import { Link, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import React from 'react';

export default function Navigation() {
    return (
        <Navbar position="static" classNames={{ content: ['w-full'] }}>
            <NavbarContent className="gap-4" justify="center">
                <NavbarItem isActive>
                    <Link href="/" className='text-3xl'>
                        Game
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/new-team" className='text-3xl'>
                        New Team
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/dashboard" className='text-3xl'>
                        Dashboard
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
