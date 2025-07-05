'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument, removeUserFromDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";


function ManageUsers() {
    const { user } = useUser();
    const room = useRoom();
    const isOwner = useOwner();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    );

    const handleDelete = (userId: string) => {
        startTransition(async () => {
            if (!user) return;

            const { success } = await removeUserFromDocument(room.id, userId);

            if (success) {
                toast.success(`Utilisateur ${userId} supprimé avec succès`);
            } else {
                toast.error(`Erreur lors de la suppression de l'utilisateur ${userId}`);
            }
        })
    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger>Utilisateurs ({usersInRoom?.docs.length})</DialogTrigger>
        </Button>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Utilisateurs ayant accès au document</DialogTitle>
            <DialogDescription>
                Liste des utilisateurs ayant accès à ce document. Vous pouvez inviter de nouveaux utilisateurs ou supprimer des utilisateurs existants.
            </DialogDescription>
            </DialogHeader>

            <hr className="my-2" />

            <div className="flex flex-col space-y-2">
                {usersInRoom?.docs.map((doc) => (
                    <div key={doc.data().userId} className="flex items-center justify-between mb-2">
                        <p className="font-light">
                            {doc.data().userId === user?.emailAddresses[0].toString() 
                            ? `Vous (${doc.data().userId})`
                            : doc.data().userId}
                        </p>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="capitalize">{doc.data().role}</Button>
                        
                            {isOwner && 
                                doc.data().userId !== user?.emailAddresses[0].toString() && (
                                <Button 
                                    variant="destructive" 
                                    onClick={() => handleDelete(doc.data().userId)}
                                    disabled={isPending}
                                    size="sm"
                                >
                                    {isPending ? "Suppression..." : "X"}
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </DialogContent>
    </Dialog>
  )
}
export default ManageUsers