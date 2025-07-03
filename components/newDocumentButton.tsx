'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button"
import { useTransition } from "react";

function NewDocumentButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleCreateNewDocument = () => {
        startTransition(async () => {
            const {docId} = await createNewDocument();
            router.push(`/doc/${docId}`)
        })
    };

  return (
    <Button onClick={handleCreateNewDocument} disabled={!isPending}>
        {isPending ? "Création..." : "Nouveau document"}
    </Button>
  )
}
export default NewDocumentButton