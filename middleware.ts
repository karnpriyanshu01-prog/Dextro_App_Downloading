import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Protects everything under /admin except /admin/login. Anyone without a
// valid Supabase session is redirected to the login page. Authorization
// beyond "is logged in" (i.e. what an authenticated user can read/write)
// is enforced server-side by RLS policies in supabase/schema.sql — this
// middleware only gatekeeps access to the admin UI itself.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  // Never redirect away from the login page itself — this is the one rule
  // that guarantees a loop can't originate here.
  if (isLoginPage) return response

  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // If the auth check itself fails (network hiccup, etc.), treat the
    // visitor as unauthenticated rather than throwing — fail closed, but
    // don't crash the request.
  }

  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
