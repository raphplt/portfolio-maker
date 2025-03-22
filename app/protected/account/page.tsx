"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Avatar,
  Link,
  Button,
} from "@heroui/react";

const Account = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="p-8">
        <Card>
          <CardBody>
            <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
            <p>Vous devez être connecté pour voir cette page.</p>
          </CardBody>
        </Card>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Mon compte</h1>
      
      <Card>
        <CardHeader className="flex gap-5">
          <div className="flex gap-5">
            {session.user.avatar ? (
              <Avatar
                radius="full"
                size="lg"
                src={session.user.avatar}
                alt="Photo de profil"
              />
            ) : (
              <Avatar
                radius="full"
                size="lg"
                icon={<Icon icon="mdi:account-circle" width={24} />}
              />
            )}
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold">
                {session.user.firstName} {session.user.lastName}
              </h2>
            
            </div>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:email" className="text-default-500" width={20} />
              <span>{session.user.email}</span>
            </div>

            {session.user.githubUsername && (
              <div className="flex items-center gap-2">
                <Icon icon="mdi:github" className="text-default-500" width={20} />
                <Link
                  href={`https://github.com/${session.user.githubUsername}`}
                  isExternal
                  color="primary"
                >
                  {session.user.githubUsername}
                </Link>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Icon icon="mdi:calendar" className="text-default-500" width={20} />
              <span>Membre depuis le {formatDate(session?.user?.createdAt ?? '')}</span>
            </div>

            <Divider />

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Actions</h3>
              <div className="flex gap-2">
                <Button
                  color="primary"
                  startContent={<Icon icon="mdi:pencil" width={20} />}
                >
                  Modifier le profil
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  startContent={<Icon icon="mdi:delete" width={20} />}
                >
                  Supprimer le compte
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default Account;