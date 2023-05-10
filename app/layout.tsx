import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
	title: "Proompta",
	description: "Prompting with style.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient"></div>
					</div>
					<main className="app">
						<Nav></Nav>
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}
