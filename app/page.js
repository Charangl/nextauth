import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { useSession } from "next-auth/react"

export default async function Home() {
const session = await getServerSession(authOptions)
console.log(session, "session in page")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {JSON.stringify(session)}
    </main>
  )
}
