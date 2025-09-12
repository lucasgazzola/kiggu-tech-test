import { User, Watchlist, Event, EventSeverity } from './types'

// Mock user data
export const mockUser: User = {
  id: 'db3c5611-c627-4586-898d-9074a607902a',
  name: 'Ana García',
  email: 'ana.garcia@company.com',
}

// Mock watchlists data
export const mockWatchlists: Watchlist[] = [
  {
    id: 'wl-001',
    name: 'Suspicious Domains',
    description: 'Monitor potentially malicious domains and subdomains',
    ownerId: mockUser.id,
    terms: ['phishing', 'malware', 'suspicious-domain.com', 'fake-bank'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'wl-002',
    name: 'Brand Protection',
    description: 'Track unauthorized use of company brand and trademarks',
    ownerId: mockUser.id,
    terms: [
      'company-brand',
      'trademark-abuse',
      'counterfeit',
      'brand-impersonation',
    ],
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: 'wl-003',
    name: 'Executive Monitoring',
    description: 'Monitor mentions of key executives and leadership team',
    ownerId: mockUser.id,
    terms: ['CEO-name', 'CTO-name', 'executive-threats', 'leadership-mentions'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
  {
    id: 'wl-004',
    name: 'Data Breach Indicators',
    description: 'Track potential data breach and leak indicators',
    ownerId: mockUser.id,
    terms: [
      'data-leak',
      'breach',
      'credentials',
      'database-dump',
      'stolen-data',
    ],
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
  },
  {
    id: 'wl-005',
    name: 'Cryptocurrency Threats',
    description: 'Monitor crypto-related security threats and scams',
    ownerId: mockUser.id,
    terms: ['crypto-scam', 'wallet-drain', 'defi-exploit', 'rugpull'],
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
  },
]

// Mock events data
export const mockEvents: Event[] = [
  {
    id: 'evt-001',
    title: 'Suspicious Domain Registration Detected',
    description:
      "A new domain 'secure-bank-login.com' was registered that closely resembles our banking partner's domain. The domain uses similar branding and could be used for phishing attacks targeting our customers.",
    summary:
      'AI Analysis: High-confidence phishing domain detected. Domain registered 2 hours ago with privacy protection enabled. Hosting infrastructure matches known threat actor patterns.',
    severity: 'CRITICAL' as EventSeverity,
    suggestedAction:
      'Immediately contact domain registrar for takedown. Alert security team and prepare customer communications. Monitor for active phishing campaigns.',
    watchlistId: 'wl-001',
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 'evt-002',
    title: 'Brand Impersonation on Social Media',
    description:
      'Multiple fake social media accounts detected using our company logo and branding. Accounts are promoting fraudulent investment schemes and requesting personal information from followers.',
    summary:
      'AI Analysis: Coordinated brand impersonation campaign across 3 platforms. Accounts created within 24 hours of each other, suggesting organized threat actor.',
    severity: 'HIGH' as EventSeverity,
    suggestedAction:
      'Report accounts to social media platforms for immediate suspension. Document evidence for legal action. Issue public warning to customers.',
    watchlistId: 'wl-002',
    createdAt: '2024-01-15T12:15:00Z',
    updatedAt: '2024-01-15T12:15:00Z',
  },
  {
    id: 'evt-003',
    title: 'Executive Name in Dark Web Forum',
    description:
      "CEO's name mentioned in a dark web forum discussion about corporate espionage targets. Thread includes discussion of social engineering tactics and personal information gathering.",
    summary:
      'AI Analysis: Medium-confidence threat. Discussion appears to be in planning phase. No immediate action detected, but indicates potential targeting.',
    severity: 'MED' as EventSeverity,
    suggestedAction:
      'Brief executive protection team. Review and update personal security protocols. Monitor for escalation or additional intelligence.',
    watchlistId: 'wl-003',
    createdAt: '2024-01-15T09:45:00Z',
    updatedAt: '2024-01-15T09:45:00Z',
  },
  {
    id: 'evt-004',
    title: 'Potential Data Leak on Paste Site',
    description:
      'A paste containing what appears to be employee credentials was posted on a public paste site. The data includes email addresses matching our company domain and hashed passwords.',
    summary:
      'AI Analysis: High-confidence data breach. 247 employee credentials identified. Hash format suggests older breach, possibly from 2022 incident.',
    severity: 'HIGH' as EventSeverity,
    suggestedAction:
      'Force password reset for affected accounts. Audit access logs for suspicious activity. Investigate source of leak and notify affected employees.',
    watchlistId: 'wl-004',
    createdAt: '2024-01-14T18:20:00Z',
    updatedAt: '2024-01-14T18:20:00Z',
  },
  {
    id: 'evt-005',
    title: 'Cryptocurrency Wallet Drainer Detected',
    description:
      "New malware variant detected that specifically targets our company's crypto wallet software. The malware appears to be distributed through fake software updates.",
    summary:
      'AI Analysis: Targeted attack against our crypto infrastructure. Malware samples show sophisticated evasion techniques and specific knowledge of our wallet implementation.',
    severity: 'CRITICAL' as EventSeverity,
    suggestedAction:
      'Immediately alert all crypto wallet users. Disable automatic updates until security patch available. Coordinate with threat intelligence team for attribution.',
    watchlistId: 'wl-005',
    createdAt: '2024-01-14T16:10:00Z',
    updatedAt: '2024-01-14T16:10:00Z',
  },
  {
    id: 'evt-006',
    title: 'Suspicious Email Campaign Targeting Employees',
    description:
      'Spear-phishing campaign detected targeting our employees with emails containing malicious attachments. Emails appear to come from trusted business partners.',
    summary:
      'AI Analysis: Sophisticated spear-phishing campaign with high success probability. Email templates show detailed knowledge of our business relationships.',
    severity: 'HIGH' as EventSeverity,
    suggestedAction:
      'Issue immediate security alert to all employees. Block sender domains at email gateway. Conduct security awareness training session.',
    watchlistId: 'wl-001',
    createdAt: '2024-01-14T13:30:00Z',
    updatedAt: '2024-01-14T13:30:00Z',
  },
  {
    id: 'evt-007',
    title: 'Trademark Violation in Mobile App Store',
    description:
      'Fake mobile application using our company name and logo detected in app store. App requests excessive permissions and may be collecting user data.',
    summary:
      'AI Analysis: Clear trademark violation with potential data harvesting intent. App has been downloaded 500+ times in past week.',
    severity: 'MED' as EventSeverity,
    suggestedAction:
      'File takedown request with app store. Document evidence for legal proceedings. Alert customers through official channels.',
    watchlistId: 'wl-002',
    createdAt: '2024-01-14T11:45:00Z',
    updatedAt: '2024-01-14T11:45:00Z',
  },
  {
    id: 'evt-008',
    title: 'DDoS Attack Preparation Detected',
    description:
      'Intelligence indicates potential DDoS attack being planned against our infrastructure. Threat actors discussing attack vectors and timing in underground forums.',
    summary:
      'AI Analysis: Credible DDoS threat with specific targeting of our services. Attack planned for next 48-72 hours based on forum discussions.',
    severity: 'HIGH' as EventSeverity,
    suggestedAction:
      'Activate DDoS mitigation protocols. Scale up infrastructure capacity. Coordinate with ISP and CDN providers for additional protection.',
    watchlistId: 'wl-001',
    createdAt: '2024-01-13T20:15:00Z',
    updatedAt: '2024-01-13T20:15:00Z',
  },
  {
    id: 'evt-009',
    title: 'Insider Threat Indicator',
    description:
      'Unusual data access patterns detected for employee in finance department. Large volumes of sensitive data accessed outside normal working hours.',
    summary:
      'AI Analysis: Anomalous behavior pattern consistent with potential insider threat. Access patterns show systematic data collection over 2-week period.',
    severity: 'MED' as EventSeverity,
    suggestedAction:
      'Initiate discrete investigation. Review employee access logs and recent behavioral changes. Consider temporary access restrictions.',
    watchlistId: 'wl-004',
    createdAt: '2024-01-13T15:20:00Z',
    updatedAt: '2024-01-13T15:20:00Z',
  },
  {
    id: 'evt-010',
    title: 'Supply Chain Compromise Alert',
    description:
      'One of our software suppliers reported a security breach. Their compromised systems may have been used to inject malicious code into software updates.',
    summary:
      'AI Analysis: High-risk supply chain incident. Supplier breach confirmed, potential for widespread impact across customer base.',
    severity: 'CRITICAL' as EventSeverity,
    suggestedAction:
      'Immediately halt all updates from affected supplier. Audit recent software deployments. Coordinate incident response with supplier and customers.',
    watchlistId: 'wl-001',
    createdAt: '2024-01-13T08:30:00Z',
    updatedAt: '2024-01-13T08:30:00Z',
  },
]

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 800) =>
  new Promise(resolve => setTimeout(resolve, ms))

// Mock API responses
export const mockApiResponses = {
  login: async (email: string, password: string) => {
    await simulateApiDelay(1000)

    // Simple mock validation
    if (email === mockUser.email && password.length >= 6) {
      return {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
      }
    }
    throw new Error('Invalid credentials')
  },

  register: async (name: string, email: string, password: string) => {
    await simulateApiDelay(1200)

    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
    }

    return {
      user: newUser,
      token: 'mock-jwt-token-' + Date.now(),
    }
  },

  getProfile: async () => {
    await simulateApiDelay(500)
    return mockUser
  },

  getWatchlists: async () => {
    await simulateApiDelay(600)
    return mockWatchlists
  },

  getEvents: async () => {
    await simulateApiDelay(700)
    return mockEvents
  },

  createWatchlist: async (data: any) => {
    await simulateApiDelay(800)

    const newWatchlist: Watchlist = {
      id: 'wl-' + Date.now(),
      name: data.name,
      description: data.description,
      ownerId: data.ownerId,
      terms: data.terms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return newWatchlist
  },

  createEvent: async (data: any) => {
    await simulateApiDelay(900)

    const newEvent: Event = {
      id: 'evt-' + Date.now(),
      title: data.title,
      description: data.description,
      summary: data.summary || 'AI analysis pending...',
      severity: data.severity || 'LOW',
      suggestedAction:
        data.suggestedAction ||
        'Review event details and determine appropriate action.',
      watchlistId: data.watchlistId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return newEvent
  },

  enrichEvent: async (eventId: string) => {
    await simulateApiDelay(2000) // Longer delay to simulate AI processing

    const event = mockEvents.find(e => e.id === eventId)
    if (!event) throw new Error('Event not found')

    // Simulate AI enrichment
    const enrichedEvent: Event = {
      ...event,
      summary: `AI Enhanced Analysis: This event has been analyzed using advanced threat intelligence. Risk assessment indicates ${event.severity.toLowerCase()} priority with high confidence. Pattern matching suggests this is part of a larger campaign targeting similar organizations.`,
      suggestedAction: `Enhanced Recommendation: ${event.suggestedAction} Additionally, consider implementing enhanced monitoring for similar patterns and coordinate with industry threat sharing groups.`,
      updatedAt: new Date().toISOString(),
    }

    return enrichedEvent
  },

  deleteWatchlist: async (id: string) => {
    await simulateApiDelay(500)
    return // 204 No Content
  },

  getHealth: async () => {
    await simulateApiDelay(200)
    return { status: 'ok' }
  },
}
