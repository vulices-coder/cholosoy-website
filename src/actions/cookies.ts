// app/actions/cookies.ts
'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAME, COOKIE_MAX_AGE, type Consent } from '@/lib/cookies/types'

export async function getConsent(): Promise<Consent | null> {
  const cookieStore = await cookies()
  const consentCookie = cookieStore.get(COOKIE_NAME)
  
  if (!consentCookie) return null
  
  try {
    const parsed = JSON.parse(consentCookie.value)
    // Validar estructura mínima
    if (parsed?.v === 1 && parsed?.necessary === true) {
      return parsed as Consent
    }
    return null
  } catch {
    return null
  }
}

export async function setConsent(consent: Omit<Consent, 'ts'>): Promise<void> {
  const cookieStore = await cookies()
  
  const fullConsent: Consent = {
    ...consent,
    ts: Date.now()
  }
  
  cookieStore.set({
    name: COOKIE_NAME,
    value: JSON.stringify(fullConsent),
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true // Seguro contra XSS
  })
}

export async function hasConsent(): Promise<boolean> {
  const consent = await getConsent()
  return consent !== null
}