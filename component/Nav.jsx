'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

function Nav() {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            try {
                const response = await getProviders();
                setProviders(response);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        setUpProviders();
    }, []);

    const renderProviders = () =>
        providers &&
        Object.values(providers).map((provider) => (
            <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
            >
                Sign In with {provider.name}
            </button>
        ));

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={'/'} className="flex gap-2 flex-center">
                <Image
                    className="object-contain"
                    width={100}
                    height={100}
                    alt="Promptopia logo"
                    src={'/assets/images/bible.jpg'}
                />
                <p className="logo_text">Bible Verses</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={'/create-prompt'} className="black_btn">
                            Create Verses
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src={session?.user?.image || '/assets/images/default-profile.png'}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    renderProviders()
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user?.image || '/assets/images/default-profile.png'}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href={'/profile'}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={'/create-prompt'}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Verses
                                </Link>
                                <button
                                    className="mt-5 w-full black_btn"
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    renderProviders()
                )}
            </div>
        </nav>
    );
}

export default Nav;
