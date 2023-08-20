"use client";

import Link from 'next/link';
import Image from 'next/image';
import { CustomButton } from '.';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
  
    setupProviders();
  }, [])
  

  return (
    <header className="w-full z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image 
            src="/recipe-book-icon.svg"
            alt="Recipe Mix Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <div className="text-[42px] text-black-100 py-5 px-3">
            RecipeMix
          </div>
        </Link>
        <div className="flex">
          {session?.user ? (
            <div className="flex flex-col relative">
              <div className="flex flex-row">
                <CustomButton 
                  title={session.user.name || ""}
                  btnType="button"
                  containerStyles="main_button rounded-full text-white font-bold"
                  textStyles="px-5 text-white font-bold"
                  leftIcon={session.user.image || ""}
                  handleClick={() => setToggleDropdown((prev) => !prev)}
                />
              </div>
              <div className="flex ">
              {toggleDropdown && (
                <div className="flex dropdown">
                  <CustomButton
                    title="Sign Out"
                    btnType="button"
                    containerStyles="text-primary-blue rounded-full bg-sky-100 min-w-[200px]"
                    handleClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                  />
                </div>
              )}
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar