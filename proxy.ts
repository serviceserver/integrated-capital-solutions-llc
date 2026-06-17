import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    const maintenanceHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>503 - Service Temporarily Unavailable</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { font-size: 16px; }
      body {
        font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        background-color: #0a1628;
        color: #ffffff;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
      }
      .container {
        max-width: 32rem;
        width: 100%;
        text-align: center;
      }
      .status-code {
        font-size: 4rem;
        font-weight: 900;
        color: #c8922a;
        line-height: 1;
        margin-bottom: 1.5rem;
      }
      h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 1rem;
      }
      .divider {
        width: 4rem;
        height: 0.25rem;
        background-color: #c8922a;
        margin: 0 auto 1.5rem;
      }
      p {
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.75;
        margin-bottom: 0.75rem;
      }
      .contact {
        font-size: 0.875rem;
      }
      .contact a {
        color: #c8922a;
        text-decoration: none;
      }
      .contact a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="status-code">503</div>
      <h1>Service Temporarily Unavailable</h1>
      <div class="divider"></div>
      <p>We are currently performing scheduled maintenance to improve our services. We will be back online shortly.</p>
      <p class="contact">
        Please check back in a few minutes. If you need immediate assistance, kindly contact us at 
        <a href="mailto:info@integratedcapitalsolutionsllc.com">info@integratedcapitalsolutionsllc.com</a>
      </p>
    </div>
  </body>
</html>`

    return new NextResponse(maintenanceHtml, {
      status: 503,
      headers: {
        'Content-Type': 'text/html',
        'Retry-After': '3600',
      },
    })
  }

  const session = await auth()
  const { nextUrl } = request
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isLoginPage = nextUrl.pathname === '/admin/login'
  const isApiAuth = nextUrl.pathname.startsWith('/api/auth')

  if (isLoginPage) return NextResponse.next()

  if (isAdminRoute) {
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/data|_next/image).*)'],
}
