"use client";

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from "react";
import {
	TemplateData,
	templateDefaultData,
	TemplateDataKey,
	MenusType,
} from "@/app/portfolios/new/[id]/helper";

interface FormContextType {
    templateData: TemplateData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChange: (field: TemplateDataKey, value: string | boolean | Array<any>) => void;
    handleSave: () => void;
    setTemplateData: React.Dispatch<React.SetStateAction<TemplateData>>;
    menuSelected: MenusType;
    setMenuSelected: React.Dispatch<React.SetStateAction<MenusType>>;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
	const [templateData, setTemplateData] =
		useState<TemplateData>(templateDefaultData);
	const [menuSelected, setMenuSelected] = useState<MenusType>("infos");
	const [isEditing, setIsEditing] = useState(false);

	const handleChange = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(field: TemplateDataKey, value: string | boolean | Array<any>) => {
			setTemplateData((prev) => {
				const keys = field.split(".");
				const newData = { ...prev };
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				let current: any = newData;
				keys.forEach((key, index) => {
					if (index === keys.length - 1) {
						current[key] = value;
					} else {
						current[key] = { ...current[key] };
						current = current[key];
					}
				});
				return newData;
			});
		},
		[]
	);
	const handleSave = useCallback(() => {
		console.log("Données sauvegardées :", templateData);
	}, [templateData]);

	return (
		<FormContext.Provider
			value={{
				templateData,
				handleChange,
				handleSave,
				setTemplateData,
				menuSelected,
				setMenuSelected,
				isEditing,
				setIsEditing,
			
			}}
		>
			{children}
		</FormContext.Provider>
	);
};

export const useFormContext = (): FormContextType => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormContext must be used within a FormProvider");
	}
	return context;
};
