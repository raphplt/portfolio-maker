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
		githubAccessToken?: string;
	} | null;
	loading: boolean;
	signOut: () => void;
	usersTemplates: TemplateData[];
	setUsersTemplates: React.Dispatch<React.SetStateAction<TemplateData[]>>;
	refreshTemplates: () => Promise<void>;
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
				githubAccessToken: session.githubAccessToken || "",
			});
		}
	}, [session]);

	// Fonction pour récupérer les templates de l'utilisateur
	const fetchUserTemplates = async () => {
		if (session?.user?.id) {
			try {
				const response = await fetch(
					api_url + "/users-templates/user/" + session.user.id
				);
				const data = await response.json();

				if (Array.isArray(data)) {
					setUsersTemplates(data);
				} else {
					console.error("Expected an array but got:", data);
					setUsersTemplates([]);
				}
			} catch (error) {
				console.error("Error fetching user templates:", error);
				setUsersTemplates([]);
			}
		}
	};

	// Fonction pour rafraîchir les templates
	const refreshTemplates = async () => {
		await fetchUserTemplates();
	};

	useEffect(() => {
		fetchUserTemplates();
	}, [session]);

	const handleSignOut = () => {
		signOut();
		setUser(null);
	};

	return (
		<SessionContext.Provider
			value={{
				user,
				loading,
				signOut: handleSignOut,
				usersTemplates,
				setUsersTemplates,
				refreshTemplates,
			}}
		>
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