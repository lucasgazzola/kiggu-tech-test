// import {
//   AuthResponse,
//   User,
//   Watchlist,
//   WatchlistTerm,
//   Event,
//   CreateEventRequest,
//   CreateWatchlistRequest,
//   CreateTermRequest,
//   ApiError,
// } from './types'
// import { mockApiResponses } from './mockData'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'
// const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

// API Client como clase, interpolando baseURL en todos los métodos
class ApiClient {
  constructor(private baseURL: string) {}

  // Auth
  async register(name: string, email: string, password: string) {
    const res = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    return res.json()
  }
  async login(email: string, password: string) {
    const res = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    return res.json()
  }
  async logout(token: string | null) {
    if (!token) return
    await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async getProfile(token: string) {
    const res = await fetch(`${this.baseURL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.json()
  }

  // Watchlists
  async getWatchlists() {
    const res = await fetch(`${this.baseURL}/watchlists`)
    const watchlists = await res.json()
    return watchlists
  }

  async getWatchlist(id: string) {
    const res = await fetch(`${this.baseURL}/watchlists/${id}`)
    const watchlist = await res.json()
    return watchlist
  }

  async createWatchlist(data: {
    name: string
    description?: string
    ownerId: string
    terms: { value: string }[]
  }) {
    const res = await fetch(`${this.baseURL}/watchlists`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    return res.json()
  }
  async deleteWatchlist(id: string) {
    await fetch(`${this.baseURL}/watchlist/${id}`, { method: 'DELETE' })
  }

  // Events
  async getEvents() {
    const res = await fetch(`${this.baseURL}/events`)
    const events = await res.json()
    return events
  }
  async getEvent(id: string) {
    const res = await fetch(`${this.baseURL}/events/${id}`)
    return res.json()
  }
  async createEvent(data: {
    title: string
    description?: string
    status?: string
  }) {
    const res = await fetch(`${this.baseURL}/events`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    return res.json()
  }
  async updateEvent(
    id: string,
    data: { title?: string; description?: string; status?: string }
  ) {
    const res = await fetch(`${this.baseURL}/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    return res.json()
  }
  async enrichEvent(id: string) {
    const res = await fetch(`${this.baseURL}/events/${id}/enrich`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    return res.json()
  }

  // event-matches
  async getEventMatchedWatchlists(eventId: string) {
    const res = await fetch(
      `${this.baseURL}/event-matches/event/${eventId}/watchlists`
    )
    return res.json()
  }
  async getWatchlistMatchedEvents(watchlistId: string) {
    const res = await fetch(
      `${this.baseURL}/event-matches/watchlist/${watchlistId}/events`
    )
    return res.json()
  }
  async getEventMatch(id: string) {
    const res = await fetch(`${this.baseURL}/event-matches/${id}`)
    return res.json()
  }
  async getEventMatches() {
    const res = await fetch(`${this.baseURL}/event-matches`)
    return res.json()
  }
  async getEventMatchByTerm(termId: string) {
    const res = await fetch(`${this.baseURL}/event-matches/term/${termId}`)
    return res.json()
  }
  async getEventMatchByWatchlist(watchlistId: string) {
    const res = await fetch(
      `${this.baseURL}/event-matches/watchlist/${watchlistId}`
    )
    return res.json()
  }

  // WatchlistTerm
  async getWatchlistTerms() {
    const res = await fetch(`${this.baseURL}/watchlist-terms`)
    return res.json()
  }
  async getWatchlistTerm(id: string) {
    const res = await fetch(`${this.baseURL}/watchlist-terms/${id}`)
    return res.json()
  }
  async createWatchlistTerm(data: { value: string }) {
    const res = await fetch(`${this.baseURL}/watchlist-terms`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    return res.json()
  }
  async deleteWatchlistTerm(id: string) {
    await fetch(`${this.baseURL}/watchlist-terms/${id}`, { method: 'DELETE' })
  }

  // Health
  async getHealth() {
    const res = await fetch(`${this.baseURL}/health`)
    return res.json()
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
