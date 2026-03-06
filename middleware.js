import { next } from '@vercel/edge';

export const config = {
  matcher: ['/((?!api|_next|password\\.html|favicon\\.ico|.*\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)).*)'],
};

export default function middleware(request) {
  const cookies = request.headers.get('cookie') || '';
  const hasAuth = cookies.split(';').some(c => c.trim().startsWith('kokorogo_auth='));

  if (hasAuth) {
    return next();
  }

  // Redirect to password page
  const url = new URL('/password.html', request.url);
  return Response.redirect(url.toString(), 307);
}
