// Pas de 'use client' ici
import Document from "@/components/document";

export default function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}
