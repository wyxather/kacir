import { AUTH_COOKIE_KEY, redirectToAuth } from '@/app/_utility/auth'

export async function POST(request) {
    const response = redirectToAuth(request.url)
    response.cookies.set(AUTH_COOKIE_KEY, '', { maxAge: 0 })
    return response
}
