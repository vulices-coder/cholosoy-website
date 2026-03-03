// app/lib/cookies/types.ts
export type Locale = 'de' | 'es' | 'en'

export type Consent = {
  v: 1
  necessary: true
  analytics: boolean
  marketing: boolean
  ts: number
}

export const COOKIE_NAME = 'cholosoy_consent'
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 año en segundos