export const SESSION_COOKIE = "za_session";

/** Demo-only client session. Swap for a real auth provider in production. */
export function startDemoSession(remember: boolean) {
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8;
  document.cookie = `${SESSION_COOKIE}=demo; path=/; max-age=${maxAge}; samesite=lax`;
}

export function endDemoSession() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
