'use client'

import {
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense"
import LoadingSpinner from "./loadingSpinner";
import LiveCursorProvider from "./liveCursorProvider";

function RoomProvider({roomId, children}: {roomId: string; children: React.ReactNode;}) {
  return (
    <RoomProviderWrapper 
        id={roomId} 
        initialPresence={{
            cursor: null
        }}
    >
        <ClientSideSuspense fallback={<LoadingSpinner />}>
            <LiveCursorProvider>{children}</LiveCursorProvider>  
        </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}
export default RoomProvider