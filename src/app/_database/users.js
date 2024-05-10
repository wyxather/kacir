import { JSONFilePreset } from 'lowdb/node'

const USER_DATABASE_FILENAME = 'users.json'
const USER_DATABASE_DEFAULT_DATA = { users: [] }

export function getUsersDatabase() {
    return JSONFilePreset(USER_DATABASE_FILENAME, USER_DATABASE_DEFAULT_DATA)
}

export async function getUsers() {
    const database = await getUsersDatabase()
    return database.data.users
}
