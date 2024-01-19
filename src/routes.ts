/**
 * This module contains the public routes of the application.
 */

/**
 * Array of public routes.
 * These routes can be accessed without authentication.
 */

export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification",
]


/**
 * Array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings.
 */

export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

/**
 * Prefix for API auth routes.
 * Routes that start with this prefix are used for API authentication purposes.
 */
export const apiAuthPrefix: string = "/api/auth";

/** 
 * Default redirect path after loggin in.
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings"