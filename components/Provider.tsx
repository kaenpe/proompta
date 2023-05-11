"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const Provider = ({
	children,
	session,
}: {
	session: Session;
	children: React.ReactNode;
}) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
