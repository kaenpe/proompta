import Feed from "@components/Feed";
import React from "react";

const Home = () => {
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
			<Feed></Feed>
		</section>
	);
};

export default Home;
