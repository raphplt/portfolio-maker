"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastProvider} from "@heroui/toast";


interface Props {
	children: React.ReactNode;
}

const NextAuthProvider = ({ children }: Props) => {
	return <SessionProvider>

		{children}
		</SessionProvider>;
};

export default NextAuthProvider;
