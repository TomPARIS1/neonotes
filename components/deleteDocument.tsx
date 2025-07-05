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
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";


function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();


    const handleDelete = async () => {
        const roomId = pathname.split("/").pop();

        if (!roomId) {
            return;
        }

        startTransition(async () => {
            const success = await deleteDocument(roomId);

            if (success) {
                setIsOpen(false);
                router.replace("/");
                toast.success("Document supprimé avec succès");
            } else {
                toast.error("Erreur lors de la suppression du document");
            }
        })

    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="destructive">
            <DialogTrigger>Supprimer</DialogTrigger>
        </Button>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Etes-vous sûr de vouloir supprimer le document ?</DialogTitle>
            <DialogDescription>
                Cette action supprimera définitivement le document et son contenu et ne peut pas être annulée.
            </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-end gap-2">
                <Button 
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    {isPending ? "Suppression..." : "Supprimer"}
                </Button>
                <DialogClose asChild>
                    <Button 
                        type="button"
                        variant="secondary"
                    >
                        Fermer
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
export default DeleteDocument