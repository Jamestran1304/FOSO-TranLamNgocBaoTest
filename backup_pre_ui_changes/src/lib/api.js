// API adapter: currently returns mock data but can be replaced with real fetch calls.
import services from '../data/services';

export async function fetchServices() {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 350));
  // In future, replace with: return fetch('/api/services').then(r => r.json())
  return services;
}
