import RoomProvider from "@/components/roomProvider";
import { auth } from "@clerk/nextjs/server"

async function DocLayout({
  children, 
  params,
}: {
  children: React.ReactNode; 
  params: { id: string };
}) {
    auth.protect();

    const { id } = await params;

  return (
    <RoomProvider roomId={id}>{children}</RoomProvider>
  )
}
export default DocLayout