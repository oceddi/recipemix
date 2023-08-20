"use client";

import { useState, useEffect } from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react"
import { BuiltInProviderType } from 'next-auth/providers/index';
import { CustomButton } from '.';

export default function AccessDenied() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
  
    setupProviders();
  }, [])

  return (
    <div className="flex  justify-center my-10">
      <div className="flex flex-col gap-10 items-center">
        <div>
          <h1 className="font-semibold text-2xl">Access Denied</h1>
        </div>
        <div>
          {providers && 
            Object.values(providers).map((provider) => (
              <CustomButton
                title="Sign In"
                btnType="button"
                containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                handleClick={() => signIn(provider.id)}
                key={provider.name}
              />
            ))}
        </div>
        <div>
          You must be signed in to view this page
        </div>
      </div>
    </div>
  )
}