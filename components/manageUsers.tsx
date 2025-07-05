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
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";


function ManageUsers() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setInviteEmail] = useState("");
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();


    const handleInvite = async (e: FormEvent) => {
        e.preventDefault();

        const roomId = pathname.split("/").pop();

        if (!roomId) {
            return;
        }

        startTransition(async () => {
            const success = await inviteUserToDocument(roomId, email);

            if (success) {
                setIsOpen(false);
                setInviteEmail("");
                toast.success("Utilisateur invité avec succès");
            } else {
                toast.error("Erreur lors de l'invitation de l'utilisateur");
            }
        })

    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger>Inviter</DialogTrigger>
        </Button>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Inviter un utilisateur pour collaborer</DialogTitle>
            <DialogDescription>
                Entrez l'email de l'utilisateur que vous souhaitez inviter
            </DialogDescription>
            </DialogHeader>

            <form className="flex gap-2 " onSubmit={handleInvite}>
                <Input
                    type="email"
                    placeholder="Email de l'utilisateur"
                    className="w-full"
                    value={email}
                    onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Button type="submit" disabled={!email || isPending}>
                    {isPending ? "Envoi..." : "Inviter"}
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}
export default ManageUsers