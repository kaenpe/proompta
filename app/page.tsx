import Feed from "@components/Feed";
import React from "react";
const getPrompts = async () => {
	const data = await fetch("http://proompta.vercel.app/api/prompts", {
		next: { revalidate: 3 },
	}).then((res) => res.json());
	return data;
};

const Home = async () => {
	const data = await getPrompts();
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Prompt it.
				<br className="max-md:hidden" />
				<span className="red_gradient text-center">Share it.</span>
			</h1>
			<p className="desc text-center">
				Proompta is an open source AI app that serves as a place to share
				creative prompts with other curious proompters.
			</p>
			<Feed prompts={data}></Feed>
		</section>
	);
};

export default Home;
