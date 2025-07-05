'use client'

import { useOthers, useSelf } from "@liveblocks/react/suspense"

function Avatars() {
    const others = useOthers();
    const self = useSelf();

    const all = [self, ...others];
  
    return (
    <div className="flex gap-2 items-center">
        <p className="font-light text-sm">Utilisateurs éditant cette page</p>

        <div className="flex -space-x-5">

        </div>
    </div>
  )
}
export default Avatars