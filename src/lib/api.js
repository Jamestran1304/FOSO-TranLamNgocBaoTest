// API adapter: currently returns mock data but can be replaced with real fetch calls.
import services from '../data/services';

export async function fetchServices() {
  await new Promise((r) => setTimeout(r, 350));
  return services;
}
