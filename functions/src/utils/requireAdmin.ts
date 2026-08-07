import { getAuth } from 'firebase-admin/auth'
import type { DecodedIdToken } from 'firebase-admin/auth'
import type { Request as FirebaseRequest } from 'firebase-functions/v2/https'
import type { Response } from 'express'

/**
 * Verifies the caller of an admin HTTPS function.
 *
 * Reads a Firebase ID token from the `Authorization: Bearer <token>` header, verifies
 * it, and requires an `admin` custom claim. On any failure it writes a 401/403 JSON
 * response and returns `null`; callers MUST stop processing when the result is null.
 *
 * Custom claims are set server-side only (e.g. `getAuth().setCustomUserClaims(uid,
 * { admin: true })`). Never trust a role/isAdmin field sent in the request body or read
 * from a client-writable Firestore document.
 *
 * Usage:
 *   export const doThing = onRequest(async (req, res) => {
 *     const caller = await requireAdmin(req, res)
 *     if (!caller) return
 *     // ...privileged work, caller.uid is a verified admin
 *   })
 */
export async function requireAdmin(
  req: FirebaseRequest,
  res: Response,
): Promise<DecodedIdToken | null> {
  const header = req.get('Authorization') || ''
  const match = header.match(/^Bearer (.+)$/)

  if (!match) {
    res.status(401).json({
      code: 'unauthenticated',
      message: 'Missing or malformed Authorization header (expected "Bearer <idToken>").',
    })
    return null
  }

  try {
    const decoded = await getAuth().verifyIdToken(match[1])
    if (decoded.admin !== true) {
      res.status(403).json({
        code: 'permission-denied',
        message: 'Caller is authenticated but lacks the required admin privileges.',
      })
      return null
    }
    return decoded
  } catch {
    res.status(401).json({
      code: 'unauthenticated',
      message: 'Invalid or expired ID token.',
    })
    return null
  }
}
