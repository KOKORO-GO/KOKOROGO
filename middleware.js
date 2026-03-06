import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next|password\\.html|favicon\\.ico|.*\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)).*)'],
};

export default function middleware(request) {
  const authCookie = request.cookies.get('kokorogo_auth');

  if (authCookie?.value === '1') {
    return NextResponse.next();
  }

  // Redirect to password page
  const url = request.nextUrl.clone();
  url.pathname = '/password.html';
  return NextResponse.redirect(url);
}
