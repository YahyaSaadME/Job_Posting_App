import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



// Load the admin email IDs from the environment variable
const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];

export function middleware(request: NextRequest) {

  // Simulate fetching the user's email from a cookie or header (replace this with your logic)


  // if(!session){
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }
  // const userEmail = session?.user?.email

  // // Check if the request is for an admin route
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   if (!userEmail || !adminEmails.includes(userEmail)) {
  //     return NextResponse.redirect(new URL('/signin', request.url));
  //   }
  // }

 
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/blogs']
};
