"use client"
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/route'
import { useSession } from "next-auth/react"

export default function Home() {
const { data } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {JSON.stringify(data)}
    </main>
  )
}
