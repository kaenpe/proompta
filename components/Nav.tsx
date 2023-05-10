"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
	const userLoggedIn = true;
	const [providers, setProviders] = useState(null);
	const [toggleDrop, setToggleDrop] = useState(false);

	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};
		setProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="Proompta Logo"
					width={30}
					height={30}
					className="object-contain"
				></Image>
				<p className="logo_text">Proompta</p>
			</Link>
			{/*desktop nav*/}
			<div className="sm:flex hidden">
				{userLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Prompt
						</Link>
						<button className="outline_btn" onClick={signOut}>
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src="../assets/images/logo.svg"
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
							Object.values(providers).map((provider) => (
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
				{userLoggedIn ? (
					<div className="flex">
						<Image
							src="/assets/images/logo.svg"
							width={37}
							height={37}
							className="rounded-full"
							alt="profile"
							onClick={() => setToggleDrop((prev) => !prev)}
						></Image>
						{toggleDrop && (
							<div className="dropdown">
								<Link
									href="/profile"
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
							Object.values(providers).map((provider) => (
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
