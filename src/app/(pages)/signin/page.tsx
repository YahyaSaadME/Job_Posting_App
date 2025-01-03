/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import SignIn from '@/app/components/auth/SignIn';
import { useSession } from 'next-auth/react';

const page =  () => {
  const {data : session} = useSession()
console.log("session is" , session)

  return ( <SignIn/> )
}

export default page


