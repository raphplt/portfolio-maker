"use client"
import { Avatar } from '@heroui/react';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react'

type UserAvatarProps = {
    width?: number;
    height?: number;
}

const UserAvatar = (
    { width = 32, height = 32 }: UserAvatarProps
) => {
    const { data: session, status } = useSession();

    if (status === "loading" || !session) {
        return null;
    }


  return (
    <>
    {session.user.avatar ? (
        <Avatar
        radius="full"
        size="lg"
        src={session.user.avatar}
        alt="Photo de profil"
        style={{ width, height }}

        />
    ) : (
        <Avatar
        radius="full"
        size="lg"
        icon={<User 
        
        style={{ width, height }}
        />}
        />
    )}
    </>
  )
}

export default UserAvatar