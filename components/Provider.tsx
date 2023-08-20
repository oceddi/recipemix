"use client";

import { SessionProvider } from 'next-auth/react';

import type { Session } from "next-auth";

const Provider = ({
  children,
  session
  } : { children: React.ReactNode, session?: Session }
  ) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider