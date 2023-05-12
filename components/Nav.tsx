"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { TProviderProps } from "@types";

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders]: any = useState(null);
	const [toggleDrop, setToggleDrop] = useState(false);

	useEffect(() => {
		const pullProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		pullProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
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
					<div className="flex gap-3 md:gap-5 ">
						<Link href="/prompt" className="black_btn">
							<button>Create Prompt</button>
						</Link>
						<button className="outline_btn" onClick={() => signOut()}>
							Sign Out
						</button>
						<Link href={`profile`}>
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
									className="black_btn"
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
					<div className="flex">
						<Image
							src={session?.user.image as string}
							width={37}
							height={37}
							className="rounded-full"
							alt="profile"
							onClick={() => setToggleDrop((prev) => !prev)}
						></Image>
						{toggleDrop && (
							<div className="dropdown">
								<Link
									href={`profile`}
									className="dropdown_link"
									onClick={() => setToggleDrop(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDrop(false)}
								>
									Write a prompt
								</Link>
								<button
									className="w-full black_btn"
									onClick={() => {
										setToggleDrop(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => (
								<button
									className="black_btn"
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
