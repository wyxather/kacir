import { cookies } from 'next/headers'
import { AUTH_COOKIE_KEY, decrypt } from '@/app/_utility/auth'

function Logout() {
    return (
        <form
            className='h-full'
            method='post'
            action='/api/auth/logout'>
            <button className='font-xl h-full w-16 transition-colors duration-300 hover:bg-red-500 hover:text-white'>
                {'\u2715'}
            </button>
        </form>
    )
}

function User({ username }) {
    return (
        <>
            <div className='flex flex-grow cursor-default items-center justify-center'>
                {username}
            </div>
            <div className='flex items-center justify-center'>
                <Logout />
            </div>
        </>
    )
}

export async function Navbar() {
    let username
    try {
        const cookieStore = cookies()
        const authCookie = cookieStore.get(AUTH_COOKIE_KEY)
        const authCookieValue = await decrypt(authCookie.value)
        username = authCookieValue.payload.aud
    } catch (error) {
        return null
    }

    return (
        <>
            <nav className='fixed flex h-12 w-full flex-row shadow-md'>
                <User username={username} />
            </nav>
            <div className='h-12'></div>
        </>
    )
}
