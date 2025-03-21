"use client";
import { useSessionContext } from "@/context/SessionProvider";
import React, { useEffect } from "react";
import CardPortfolio from "./CardPortfolio";
import { Progress } from "@heroui/react";

const Account = () => {
    const { usersTemplates, refreshTemplates } = useSessionContext();
    
    // Optional: Refresh on component mount to ensure latest data
    useEffect(() => {
        refreshTemplates();
    }, []);

    return (
        <main className="h-screen flex flex-col items-center mt-24">
            <h1 className="text-3xl font-bold mb-4">Mes portfolios </h1>

			<div className="w-1/2 flex flex-col items-center gap-2 mb-8">

			<p className="text-center text-sm text-gray-500">
				Portfolios créés :{" "}
			{usersTemplates.length} / 3

			</p>

			<Progress value={usersTemplates.length/3 *100} />
			</div>

            <div className="grid grid-cols-3 gap-4">
                {usersTemplates && usersTemplates.length > 0 ? (
                    usersTemplates.map((template) => (
                        <CardPortfolio
                            key={template.id}
                            template={template}
                        />
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">Aucun portfolio disponible</p>
                )}
            </div>
        </main>
    );
};

export default Account;