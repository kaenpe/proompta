import Nav from "@components/Nav";
import Provider from "@utils/Provider";
import QueryProvider from "@utils/QueryProvider";
import "@styles/globals.css";
import { Session } from "next-auth";

export const metadata = {
	title: "Proompta",
	description: "Prompting with style.",
};

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session;
}) {
	return (
		<html lang="en">
			<body>
				<Provider session={session}>
					<QueryProvider>
						<div className="main">
							<div className="gradient"></div>
						</div>
						<main className="app">
							<Nav></Nav>
							{children}
						</main>
					</QueryProvider>
				</Provider>
			</body>
		</html>
	);
}
