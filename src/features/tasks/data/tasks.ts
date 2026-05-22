import { faker } from '@faker-js/faker'

faker.seed(12345)

const taskTitles = [
  'Implement OAuth2 refresh token rotation for mobile clients',
  'Fix rate limiting bypass in API gateway middleware',
  'Add distributed tracing spans to worker job queue',
  'Migrate auth service database to PostgreSQL 16',
  'Reduce cold-start latency in serverless functions',
  'Add webhook retry logic with exponential backoff',
  'Set up automated dependency vulnerability scanning',
  'Refactor API gateway to support multi-region routing',
  'Implement request deduplication in notification service',
  'Write load test suite for /v2/users endpoint',
  'Add gzip compression to all API responses above 1KB',
  'Rotate all production secrets and update vault paths',
  'Fix memory leak in event stream consumer loop',
  'Implement cursor-based pagination for /v2/events API',
  'Add structured logging with trace IDs to all services',
  'Create Grafana dashboard for p95 latency per endpoint',
  'Investigate anomalous spike in error rate on Oct 12',
  'Add input sanitization to webhook payload processor',
  'Document internal API authentication flow in Confluence',
  'Upgrade Node runtime from 18 to 22 across all services',
  'Fix CORS preflight handling for third-party integrations',
  'Implement feature flag service using LaunchDarkly SDK',
  'Add circuit breaker to downstream notification calls',
  'Write integration tests for auth token refresh flow',
  'Set up canary deployment pipeline for api-gateway',
  'Enable HTTP/2 on all edge-facing services',
  'Investigate 504 timeouts on analytics pipeline writes',
  'Add idempotency keys to POST /v2/webhooks endpoint',
  'Implement RBAC permission checks in middleware layer',
  'Create runbook for on-call incident response workflow',
  'Set up Datadog APM tracing for worker jobs service',
  'Optimize database indexes for /v2/metrics query path',
  'Patch XSS vulnerability in user-generated content renderer',
  'Add Slack alerting for error rate threshold breaches',
  'Implement blue-green deployment for auth service',
  'Write E2E test coverage for user invitation flow',
  'Add data retention policy enforcement to log pipeline',
  'Investigate increased 429 responses from API gateway',
  'Audit IAM roles and remove over-provisioned permissions',
  'Add request body size limit to upload endpoints',
  'Refactor event processor to use batch writes',
  'Implement graceful shutdown handler for all services',
  'Add SLO burn rate alerting to monitoring stack',
  'Create self-service API key rotation UI for users',
  'Fix timestamp timezone handling in analytics exports',
  'Add automated rollback trigger on error rate spike',
  'Implement mutual TLS for internal service communication',
  'Write ADR for multi-tenant data isolation strategy',
  'Reduce Docker image sizes using multi-stage builds',
  'Add health-check endpoint with dependency status checks',
]

const assignees = [
  'Hemant Bendadi',
  'Riya Sharma',
  'Aditya Kumar',
  'Priya Mehta',
  'Karan Singh',
  'Neha Joshi',
  'Vikram Patel',
  'Sonal Gupta',
]

export const tasks = Array.from({ length: 100 }, (_, i) => {
  const statuses = ['todo', 'in progress', 'done', 'canceled', 'backlog'] as const
  const labels = ['bug', 'feature', 'improvement', 'infra', 'security'] as const
  const priorities = ['low', 'medium', 'high', 'critical'] as const

  return {
    id: `ENG-${1000 + i}`,
    title: taskTitles[i % taskTitles.length],
    status: faker.helpers.arrayElement(statuses),
    label: faker.helpers.arrayElement(labels),
    priority: faker.helpers.arrayElement(priorities),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    assignee: faker.helpers.arrayElement(assignees),
    description: faker.helpers.arrayElement([
      'Tracked in sprint #24. Requires coordination with infra team.',
      'Reported by on-call. Root cause still under investigation.',
      'Part of Q2 reliability initiative. See linked Notion doc.',
      'Prerequisite for OAuth2 migration. Blocked on security sign-off.',
      'Customer-facing impact. P0 — resolve before next release.',
    ]),
    dueDate: faker.date.future(),
  }
})
