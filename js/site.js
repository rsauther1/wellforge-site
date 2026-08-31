const SUPPORT_PUBLIC = 'support@wellforge.app';
/** Delivery inbox until wellforge.app MX records are live. */
const SUPPORT_INBOX = 'ryan.sauther@gmail.com';

function injectChrome() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const page = document.body.dataset.page || '';
  if (header) {
    header.innerHTML = `
      <div class="wrap nav">
        <a class="brand" href="index.html">
          <img src="assets/icon.png" alt="WellForge icon" />
          WellForge
        </a>
        <nav class="nav-links">
          <a class="${page === 'home' ? 'active' : 'hide-sm'}" href="index.html">Product</a>
          <a class="${page === 'support' ? 'active' : ''}" href="support.html">Support</a>
          <a class="${page === 'privacy' ? 'active' : 'hide-sm'}" href="privacy.html">Privacy</a>
          <a class="${page === 'terms' ? 'active' : 'hide-sm'}" href="terms.html">Terms</a>
          <a class="btn btn-primary" href="support.html">Contact</a>
        </nav>
      </div>`;
  }
  if (footer) {
    footer.innerHTML = `
      <div class="wrap footer">
        <div class="footer-row">
          <div>
            <strong style="color:#f3f4f6">WellForge</strong><br />
            Nutrition + strength tracking without social.
          </div>
          <div>
            <a href="mailto:${SUPPORT_PUBLIC}">${SUPPORT_PUBLIC}</a><br />
            <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="support.html">Support</a>
          </div>
        </div>
        <p class="muted">Not medical advice. Consult your physician before changing diet or exercise.</p>
      </div>`;
  }
}

function wireSupportForm() {
  const form = document.getElementById('support-form');
  const status = document.getElementById('form-status');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const topic = String(data.get('topic') || 'General');
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      if (status) status.textContent = 'Please fill in name, email, and message.';
      return;
    }
    const subject = `WellForge support: ${topic}`;
    const body = [
      `Name: ${name}`,
      `From: ${email}`,
      `Topic: ${topic}`,
      '',
      message,
      '',
      '(Sent from wellforge.app support form)',
    ].join('\n');
    const href = `mailto:${SUPPORT_PUBLIC}?cc=${encodeURIComponent(SUPPORT_INBOX)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) {
      status.textContent = `Opening an email to ${SUPPORT_PUBLIC}…`;
    }
    window.location.href = href;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectChrome();
  wireSupportForm();
});
