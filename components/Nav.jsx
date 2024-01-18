'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession,
getProviders} from 'next-auth/react' //The getProviders() method returns the list of providers currently configured for sign in.
import RouteTest from './RouteTest'

const Nav = () => {
    //const isUserLoggedIn = true

    const {data: session} = useSession() //这里能取到session是因为之前使用<Provider>包裹了layout,
    //否则提示: Error: [next-auth]: `useSession` must be wrapped in a <SessionProvider />
    
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(()=>{
        const setUpProviders = async()=>{
            const response = await getProviders();
            setProviders(response)
        }
        
        setUpProviders();
    },[])

    //console.log(providers)
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className='flex gap-2 flex-center'>
            <Image src="/assets/images/logo.svg"
                alt="Propaganda Logo"
                width={30}
                height={30}
                className='object-contain'
            />
            <p className='logo_text'> Propaganda</p>
        </Link>
        
        {/* <RouteTest/> */}
        
        {/* 创建帖子的按钮 */}
        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='
                    black_btn'>
                        Create Post
                    </Link>
                    <button type='button' onClick=
                    {signOut} className='outline_btn'>
                        Sign Out
                    </button>
                    
                    <Link href="/profile">
                        <Image src={session?.user.image}
                        alt="profile"
                        width={37}
                        height={37}
                        className='rounded-full'
                        />
                    </Link>

                </div>
            ): (
                <>
                {providers && 
                    //此处是遍历出所有的providers!!!(有多少种登录方式)
                    Object.values(providers).map((provider)=> 
                    (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={()=> signIn(provider.id)}
                            className='black_btn'
                        >
                            {session?.check}
                        Sign In   {provider.name}
                        </button> 
                    ))}
                </>
            )}
        </div>

          {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user ? (  
                <div className='flex'>                  
                        <Image src = {session?.user.image}
                        alt="profile"
                        width={37}
                        height={37}
                        className='rounded-full cursor-pointer'
                        onClick={()=> setToggleDropdown((prev)=> !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                Create Prompt
                                </Link>
                                
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                My Profile
                                </Link>
                                <button
                                    type='button'
                                    onClick={()=>{
                                        setToggleDropdown(false)
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >   
                
                                    {session?.check}
                                    Sign Out
                                </button>

                            </div>
                        )}
                </div>
            ): (
                <>
                {providers && 
                    Object.values(providers).map((provider)=> 
                    (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={()=> signIn(provider.id)}
                            className='black_btn'
                        >
                        Sign In   
                        </button>
                    ))}
                </>
            )}
        </div>


    </nav>
  )
}

export default Nav