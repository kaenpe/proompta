"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders]: any = useState(null);

	useEffect(() => {
		const pullProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		pullProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-4 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="Proompta Logo"
					width={30}
					height={30}
					className="object-contain bg-clip-text hover:bg-rose-900"
				></Image>
				<p className="logo_text text-sm">Proompta</p>
			</Link>
			{/*desktop nav*/}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5 items-center ">
						<Link href="/prompt" className="btn btn-sm">
							<button>Create Prompt</button>
						</Link>
						<button
							className="btn btn-outline btn-sm"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
						<Link href={`profile?id=${session?.user.id}`}>
							<Image
								src={session?.user.image as string}
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
							></Image>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => (
								<button
									className="btn"
									key={provider.name}
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="dropdown dropdown-left">
						<Image
							src={session?.user.image as string}
							width={37}
							height={37}
							className="rounded-full"
							tabIndex={0}
							alt="profile"
							// onClick={() => setToggleDrop((prev) => !prev)}
						></Image>

						<div
							className="dropdown-content menu p-2 mr-4 shadow bg-base-100 rounded-box w-52"
							tabIndex={0}
						>
							<Link href={`profile`} className="btn btn-sm m-2">
								My Profile
							</Link>
							<Link href="/create-prompt" className="btn btn-sm m-2">
								Write a prompt
							</Link>
							<button className="btn btn-sm m-2">Sign Out</button>
						</div>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => (
								<button
									className="btn"
									key={provider.name}
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
