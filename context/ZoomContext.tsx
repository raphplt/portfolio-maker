"use client";
import React, { createContext, useContext, useState } from "react";

interface ZoomContextProps {
	zoom: number;
	setZoom: React.Dispatch<React.SetStateAction<number>>;
	fullScreen: boolean;
	setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZoomContext = createContext<ZoomContextProps | undefined>(undefined);

export const ZoomProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [zoom, setZoom] = useState<number>(1);
	const [fullScreen, setFullScreen] = useState(false);

	return (
		<ZoomContext.Provider value={{ zoom, setZoom, fullScreen, setFullScreen }}>
			{children}
		</ZoomContext.Provider>
	);
};

export const useZoom = () => {
	const context = useContext(ZoomContext);
	if (!context) {
		throw new Error("useZoom must be used within a ZoomProvider");
	}
	return context;
};
