import type { AuthSession, User } from "../types";

const USERS_KEY = "caracolrace_users";
const SESSION_KEY = "caracolrace_session";
const CARD_KEY = "caracolrace_card";
const VERSION_KEY = "caracolrace_storage_version";
const STORAGE_VERSION = "1";

export interface SavedCard {
  cardNumber: string;
  cvv: string;
}

function runMigrations(): void {
  try {
    if (localStorage.getItem(VERSION_KEY) === STORAGE_VERSION) return;
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
  } catch {
    return;
  }
}

runMigrations();

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): User | undefined {
  const normalized = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function upsertUser(user: User): void {
  const normalized = user.email.toLowerCase();
  const users = getUsers().filter((u) => u.email.toLowerCase() !== normalized);
  users.push(user);
  saveUsers(users);
}

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function saveCard(card: SavedCard): void {
  localStorage.setItem(CARD_KEY, JSON.stringify(card));
}

export function getCard(): SavedCard | null {
  try {
    const raw = localStorage.getItem(CARD_KEY);
    return raw ? (JSON.parse(raw) as SavedCard) : null;
  } catch {
    return null;
  }
}
