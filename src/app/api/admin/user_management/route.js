import { getUsers, getUsersDatabase } from '@/app/_database/users'
import { NextResponse } from 'next/server'

export async function GET() {
    const users = await getUsers()
    return NextResponse.json(users, { status: 200 })
}

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
    const user = database.data.users.find(user => user.username === username)
    if (user !== undefined) {
        return NextResponse.json(
            { message: 'User already registered.' },
            { status: 409 },
        )
    }

    database.update(({ users }) => {
        users.push({
            username,
            password,
            role: 'user',
        })
    })
    return NextResponse.json(
        { message: 'User successfully registered.' },
        { status: 201 },
    )
}

export async function DELETE(request) {
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

    const database = await getUsersDatabase()
    const userIndex = database.data.users.findIndex(
        user => user.username === username,
    )
    if (userIndex === -1) {
        return NextResponse.json(
            { message: "User doesn't exists." },
            { status: 404 },
        )
    }

    database.update(({ users }) => {
        users.splice(userIndex, 1)
    })
    return NextResponse.json(
        { message: 'User successfully deleted.' },
        { status: 201 },
    )
}

export async function PUT(request) {
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

    const role = formData.get('role')

    const database = await getUsersDatabase()
    const userIndex = database.data.users.findIndex(
        user => user.username === username,
    )
    if (userIndex === -1) {
        return NextResponse.json(
            { message: "User doesn't exists." },
            { status: 404 },
        )
    }

    database.update(({ users }) => {
        users[userIndex] = { username, password, role }
    })
    return NextResponse.json(
        { message: 'User successfully updated.' },
        { status: 201 },
    )
}
