import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12"/>
      <h1 className="font-bold">Commencez par créer un nouveau document</h1>
    </main>
  );
}
