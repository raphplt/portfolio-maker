"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useSession, signOut } from "next-auth/react";

interface SessionContextProps {
	user: {
		email: string;
		accessToken: string;
	} | null;
	loading: boolean;
	signOut: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
	undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<SessionContextProps["user"]>(null);
	const loading = status === "loading";

	useEffect(() => {
		if (session) {
			setUser({
				email: session.user?.email || "",
				accessToken: session.accessToken || "",
			});
		}
	}, [session]);

	const handleSignOut = () => {
		signOut();
		setUser(null);
	};

	return (
		<SessionContext.Provider value={{ user, loading, signOut: handleSignOut }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSessionContext = () => {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSessionContext must be used within a SessionProvider");
	}
	return context;
};
