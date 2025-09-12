export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  user?: User
  token: string
}

export interface Watchlist {
  id: string
  name: string
  description: string
  ownerId: string
  terms: WatchlistTerm[]
  createdAt?: string
  updatedAt?: string
}

export interface WatchlistTerm {
  // id: string
  // term: string
  value: string
  // watchlistId: string
}

export type EventSeverity = 'LOW' | 'MED' | 'HIGH' | 'CRITICAL'

export interface Event {
  id: string
  title: string
  description: string
  summary: string
  status: string
  severity: EventSeverity
  suggestedAction: string
  watchlistId: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateEventRequest {
  title: string
  description: string
  summary?: string
  severity?: EventSeverity
  suggestedAction?: string
}

export interface CreateWatchlistRequest {
  name: string
  description: string
  ownerId: string
  terms: WatchlistTerm[]
}

export interface CreateTermRequest {
  term: string
  type: string
  watchlistId: string
}

export interface ApiError {
  message: string
  status: number
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}
