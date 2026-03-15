// This script extracts all service data from the Maven dashboard
// Run in browser console on the All Services tab
const services = [];
document.querySelectorAll('[class*="card"], [class*="Card"]').forEach(card => {
  const name = card.querySelector('h3, h2, [class*="title"], [class*="Title"]');
  if (name) services.push(name.textContent.trim());
});
console.log(JSON.stringify(services, null, 2));
