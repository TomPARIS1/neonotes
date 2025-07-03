import LiveBlocksProvider from "@/components/liveBlocksProvider"
import { ReactNode } from "react"

function PageLayout({children}: {children: ReactNode}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}
export default PageLayout