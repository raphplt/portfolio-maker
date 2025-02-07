import React, { useEffect, useRef } from "react";
import { useZoom } from "@/Contexts/ZoomContext";

interface ZoomWrapperProps {
	children: React.ReactNode;
}

const ZoomWrapper: React.FC<ZoomWrapperProps> = ({ children }) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const { zoom, setZoom, fullScreen, setFullScreen } = useZoom();

	useEffect(() => {
		const handleWheelGlobal = (e: WheelEvent) => {
			if (
				e.ctrlKey &&
				editorRef.current &&
				editorRef.current.contains(e.target as Node)
			) {
				e.preventDefault();
				const delta = e.deltaY > 0 ? -0.1 : 0.1;
				setZoom((prev: number) => {
					const newZoom = prev + delta;
					return Math.min(Math.max(newZoom, 0.5), 2);
				});
			}
		};

		window.addEventListener("wheel", handleWheelGlobal, { passive: false });
		return () => {
			window.removeEventListener("wheel", handleWheelGlobal);
		};
	}, [setZoom]);

	const exitFullScreen = () => {
		setZoom(1);
		setFullScreen((prev: boolean) => !prev);
	};

	return (
		<div
			ref={editorRef}
			style={{
				transform: `scale(${zoom})`,
				transformOrigin: "top center",
				...(fullScreen && {
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					zIndex: 9999,
					background: "#000",
					overflow: "auto",
				}),
			}}
		>
			{children}
			<button
				style={{
					display: fullScreen ? "block" : "none",
					position: "absolute",
					bottom: "4px",
					right: "4px",
					zIndex: 20,
				}}
				onClick={exitFullScreen}
			>
				{fullScreen ? "Quitter le plein écran" : "Plein écran"}
			</button>
		</div>
	);
};

export default ZoomWrapper;
