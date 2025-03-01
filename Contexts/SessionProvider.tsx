"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useSession, signOut } from "next-auth/react";
import { TemplateData } from "@/app/portfolios/new/[id]/helper";
import { api_url } from "@/utils/fetch";


interface SessionContextProps {
	user: {
		email: string;
		accessToken: string;
	} | null;
	loading: boolean;
	signOut: () => void;
	usersTemplates: TemplateData[];
	setUsersTemplates: React.Dispatch<React.SetStateAction<TemplateData[]>>;
	
}

const SessionContext = createContext<SessionContextProps | undefined>(
	undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<SessionContextProps["user"]>(null);
	const loading = status === "loading";
	const [usersTemplates, setUsersTemplates] = useState<TemplateData[]>([]);
	
	useEffect(() => {
		if (session) {
			setUser({
				email: session.user?.email || "",
				accessToken: session.accessToken || "",
			});
		}
	}, [session]);

useEffect(() => {
	if (session?.user?.id) {
		fetch(
			api_url + "/users-templates/user/" + session.user.id)
			.then((response) => response.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setUsersTemplates(data);
				} else {
					console.error("Expected an array but got:", data);
					setUsersTemplates([]);
				}
			})
			.catch((error) => {
				console.error("Error fetching user templates:", error);
				setUsersTemplates([]);
			});
	}
}, [session]);

	const handleSignOut = () => {
		signOut();
		setUser(null);
	};

	return (
		<SessionContext.Provider value={{ user, loading, signOut: handleSignOut, usersTemplates, setUsersTemplates }}>
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
