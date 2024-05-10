import { NextResponse } from 'next/server'
import {
    AUTH_COOKIE_KEY,
    AUTH_URL_PATHNAME,
    redirectToAuth,
    decrypt,
    verify,
} from './app/_utility/auth'
import { redirectAccordngToRole } from './app/_utility/role'

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth|$).*)'],
}

export default async function middleware(request) {
    const encryptedAuthCookie = request.cookies.get(AUTH_COOKIE_KEY)
    if (encryptedAuthCookie === undefined) {
        return redirectToAuth(request.url)
    }

    let signedSession
    try {
        signedSession = await decrypt(encryptedAuthCookie.value)
    } catch (error) {
        const response = redirectToAuth(request.url)
        response.cookies.set(AUTH_COOKIE_KEY, '', { maxAge: 0 })
        return response
    }

    let verifiedSession
    try {
        verifiedSession = await verify(signedSession.payload.session)
    } catch (error) {
        const response = redirectToAuth(request.url)
        response.cookies.set(AUTH_COOKIE_KEY, '', { maxAge: 0 })
        return response
    }

    return redirectAccordngToRole(verifiedSession.payload.role, request.url)
}
