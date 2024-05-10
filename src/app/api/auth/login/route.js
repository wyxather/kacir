import { NextResponse } from 'next/server'
import { getUsersDatabase } from '@/app/_database/users'
import { encrypt, sign, AUTH_COOKIE_KEY } from '@/app/_utility/auth'
import { getRedirectUrlFromRole } from '@/app/_utility/role'

export async function POST(request) {
    let formData
    try {
        formData = await request.formData()
    } catch (error) {
        return NextResponse.json({ error: error.toString() }, { status: 400 })
    }

    const username = formData.get('username')
    if (username === null) {
        return NextResponse.json(
            { message: "Username can't be null." },
            { status: 400 },
        )
    }

    const password = formData.get('password')
    if (password === null) {
        return NextResponse.json(
            { message: "Password can't be null." },
            { status: 400 },
        )
    }

    const database = await getUsersDatabase()
    const user = database.data.users.find(
        user => user.username === username && user.password === password,
    )
    if (user === undefined) {
        return NextResponse.json(
            { message: 'Wrong username or password.' },
            { status: 401 },
        )
    }

    const expires = new Date(Date.now() + eval(process.env.AUTH_AGE))
    const session = await sign({ role: user.role }, username, expires)
    const encryptedSession = await encrypt({ session }, username, expires)

    const response = NextResponse.redirect(
        getRedirectUrlFromRole(user.role, request.url),
    )
    response.cookies.set(AUTH_COOKIE_KEY, encryptedSession, {
        expires,
        httpOnly: true,
        sameSite: 'strict',
    })
    return response
}
