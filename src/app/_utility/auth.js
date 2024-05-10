import { EncryptJWT, SignJWT, jwtDecrypt, jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

const SUBJECT = 'auth'

const SIGN_KEY = new TextEncoder().encode(process.env.AUTH_SIGN_KEY)
const SIGN_ALG = 'HS256'

const ENCRYPT_KEY = new TextEncoder().encode(process.env.AUTH_ENCRYPT_KEY)
const ENCRYPT_ALG = 'dir'
const ENCRYPT_ENC = 'A256GCM'

export const AUTH_COOKIE_KEY = 'auth'
export const AUTH_URL_PATHNAME = '/auth'

export function redirectToAuth(requestUrl) {
    const url = new URL(requestUrl)
    if (url.pathname === AUTH_URL_PATHNAME) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL(AUTH_URL_PATHNAME, requestUrl))
}

export function sign(payload, audience, expires) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: SIGN_ALG })
        .setSubject(SUBJECT)
        .setAudience(audience)
        .setIssuedAt()
        .setExpirationTime(expires)
        .sign(SIGN_KEY)
}

export function verify(input) {
    return jwtVerify(input, SIGN_KEY, {
        alg: SIGN_ALG,
    })
}

export function encrypt(payload, audience, expires) {
    return new EncryptJWT(payload)
        .setProtectedHeader({
            alg: ENCRYPT_ALG,
            enc: ENCRYPT_ENC,
        })
        .setSubject(SUBJECT)
        .setAudience(audience)
        .setIssuedAt()
        .setExpirationTime(expires)
        .encrypt(ENCRYPT_KEY)
}

export function decrypt(input) {
    return jwtDecrypt(input, ENCRYPT_KEY, {
        alg: ENCRYPT_ALG,
        enc: ENCRYPT_ENC,
    })
}
