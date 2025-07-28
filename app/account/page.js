import React from 'react'
import { auth } from '../lib/auth';
export const metadata = {
  title:"Guest"
}
export default async function Page() {
  const session = await auth();
  return (
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
    Hello, {session.user.name}</h2>
  )
}
