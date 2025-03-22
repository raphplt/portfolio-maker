import { api_url } from '@/utils/fetch';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import axios from 'axios';
import { Pencil, Trash } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Actions = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session, update } = useSession();
    const router = useRouter();
  
    const handleDeleteAccount = async () => {
      try {
        if (session?.user.id) {
          await axios.delete(`${api_url}/users/${session.user.id}`, 
            {
                headers: {
                Authorization: `Bearer ${session.accessToken}`,
                },
            }
          );
          signOut();
          router.push("/");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erreur lors de la suppression du compte :", error.message);
        }
      }
    }

    return (
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Actions</h3>
        <div className="flex gap-2">
          <Button
            color="primary"
            startContent={<Pencil size={20} />}
          >
            Modifier le profil
          </Button>
          <Button
            color="danger"
            variant="light"
            startContent={<Trash size={20} />}
            onPress={onOpen}
          >
            Supprimer le compte
          </Button>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>


          <ModalHeader>Confirmation de suppression</ModalHeader>
          <ModalBody>
            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleDeleteAccount}>
              Oui, supprimer
            </Button>
            <Button onPress={onClose}>Annuler</Button>
          </ModalFooter>
            </ModalContent>
        </Modal>
      </div>
    )
}

export default Actions