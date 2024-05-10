import { NextResponse } from 'next/server'
import { AUTH_URL_PATHNAME } from './auth'

const ADMIN_DASHBOARD_PATHNAME = '/admin/dashboard'
const USER_DASHBOARD_PATHNAME = '/user/dashboard'

export function getRedirectUrlFromRole(role, requestUrl) {
    switch (role) {
        case 'admin': {
            return new URL(ADMIN_DASHBOARD_PATHNAME, requestUrl)
        }
        default: {
            return new URL(USER_DASHBOARD_PATHNAME, requestUrl)
        }
    }
}

function createRedirectResponseFromRole(role, requestUrl) {
    return NextResponse.redirect(getRedirectUrlFromRole(role, requestUrl))
}

export function redirectAccordngToRole(role, requestUrl) {
    const url = new URL(requestUrl)

    if (url.pathname.startsWith(AUTH_URL_PATHNAME)) {
        return createRedirectResponseFromRole(role, requestUrl)
    }

    switch (role) {
        case 'admin': {
            break
        }
        default: {
            if (
                url.pathname !== USER_DASHBOARD_PATHNAME &&
                !url.pathname.startsWith('/user') &&
                !url.pathname.startsWith('api/user')
            ) {
                return createRedirectResponseFromRole(role, requestUrl)
            }
        }
    }

    return NextResponse.next()
}
