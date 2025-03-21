"use client";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TemplateData, templateDefaultData } from "./[id]/helper";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionProvider";

const New = () => {
    const [templates, setTemplates] = useState<string[]>([]);
    const router = useRouter();
    const { data: session } = useSession();
    const { refreshTemplates, usersTemplates } = useSessionContext();
    const { onOpen: onOpenMaxModal, onClose: onCloseMaxModal, isOpen: isMaxModalOpen } = useDisclosure();
    const { onOpen: onOpenExistingModal, onClose: onCloseExistingModal, isOpen: isExistingModalOpen } = useDisclosure();

    useEffect(() => {
        fetch("/api/portfolios")
            .then((response) => response.json())
            .then((data) => setTemplates(data));
    }, []);

    const onTemplateClick = async (template: string) => {
        for (const userTemplate of usersTemplates) {
            if (userTemplate.templateName === template) {
                onOpenExistingModal();
                return;
            }
        }

        if (!session) {
            router.push("/auth/signin");
            return;
        }

        if (usersTemplates.length >= 3) {
            onOpenMaxModal();
            return;
        }

        const defaultConfig = templateDefaultData;
        if (!defaultConfig) {
            console.error("Aucune configuration définie pour ce template");
            return;
        }

        const userId = session?.user.id;
        const templateData = {
            ...defaultConfig,
            templateName: template,
            templateTitle: "Nouveau portfolio " + template,
            userId,
        };

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_NEST_API_URL + "/users-templates",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(templateData),
                }
            );
            if (!response.ok) {
                throw new Error("Erreur lors de la sauvegarde du template");
            }
            const savedTemplate: TemplateData = await response.json();

            await refreshTemplates();

            router.push(`/portfolios/edit/${savedTemplate.id}`);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <main className="min-h-screen pt-28 bg-gradient-to-r from-deep-violet to-dark-cyan flex flex-col items-center p-8 space-y-8">
            <Button
                as={Link}
                href="/"
                color="primary"
                variant="ghost"
                size="sm"
                radius="sm"
            >
                <Icon icon="bx:bx-arrow-back" width={24} />
                Retour
            </Button>

            <h1 className="pt-8 pb-4 text-3xl font-bold text-white text-center">
                Étape 1 : Choisissez un template
            </h1>

            <div className="gap-8 w-full max-w-7xl flex flex-wrap justify-center">
                {templates.map((template, index) => (
                    <button key={index} onClick={() => onTemplateClick(template)}>
                        <Card
                            key={index}
                            isHoverable
                            className="bg-transparent overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                        >
                            <CardHeader className="bg-earthy-gold text-white p-3 text-center font-semibold">
                                {template}
                            </CardHeader>
                            <CardBody className="p-0">
                                <Image
                                    src={`/templates/${template}.png`}
                                    width={500}
                                    height={500}
                                    alt={template}
                                    className="w-full h-56 object-cover"
                                />
                            </CardBody>
                        </Card>
                    </button>
                ))}
            </div>

            {/* Modale si maximum atteint */}
            <Modal isOpen={isMaxModalOpen} onClose={onCloseMaxModal}>
                <ModalContent>
                    <ModalHeader>
                        <h2 className="text-xl font-bold">Maximum atteint</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-default-700">
                            Vous avez atteint la limite de 3 portfolios
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button as={Link} href="/protected/portfolios" color="primary">
                            Voir mes portfolios
                        </Button>
                        <Button onPress={onCloseMaxModal} color="secondary">
                            Fermer
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modale si portfolio existant */}
            <Modal isOpen={isExistingModalOpen} onClose={onCloseExistingModal}>
                <ModalContent>
                    <ModalHeader>
                        <h2 className="text-xl font-bold">Portfolio existant</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-default-700">
                            Vous avez déjà un portfolio de ce type
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button as={Link} href="/protected/portfolios" color="primary">
                            Voir mes portfolios
                        </Button>
                        <Button onPress={onCloseExistingModal} color="secondary">
                            Fermer
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </main>
    );
};

export default New;