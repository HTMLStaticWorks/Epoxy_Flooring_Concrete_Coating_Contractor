import re

with open(r'assets\css\style.css', 'r', encoding='utf-8') as f:
    content = f.read()

missing_css = """}

/* ================================================================
   HEADER / NAVBAR
   ================================================================ */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  height: var(--header-height);
  transition: var(--transition-slow);
  background: rgba(15,23,42,0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.site-header .navbar {
  padding: 0;
  height: var(--header-height);
  transition: var(--transition-slow);
}

.site-header.scrolled {
  background: var(--bg-primary) !important;
  box-shadow: var(--shadow-md);
  height: 68px;
}
.site-header.scrolled .navbar { height: 68px; }
.site-header.scrolled .nav-link { color: var(--text-primary) !important; }
.site-header.scrolled .brand-name { color: var(--text-heading) !important; }
.site-header.scrolled .header-icon-btn { color: var(--text-primary) !important; }

.site-header.header-transparent {
  background: rgba(15,23,42,0.75) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 44px;
  height: 44px;
  background: var(--gradient-secondary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  flex-shrink: 0;
  box-shadow: var(--shadow-secondary);
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
}

.brand-tagline {
  font-size: 0.65rem;
  font-weight: 400;
  color: rgba(255,255,255,0.7);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
}

.nav-link {
  color: rgba(255,255,255,0.9) !important;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 8px 14px !important;
  border-radius: var(--radius-sm);
  transition: var(--transition);
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px; left: 14px; right: 14px;
  height: 2px;
  background: var(--secondary);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
.nav-link:hover { color: #fff !important; }
.nav-link.active { color: var(--secondary) !important; font-weight: 600; }

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: var(--radius-sm);
  color: rgba(255,255,255,0.9);
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
  backdrop-filter: blur(8px);
}
.header-icon-btn:hover {
  background: rgba(255,255,255,0.2);
  color: #fff;
}

.header-quote-btn {
  background: var(--gradient-secondary);
  color: #fff !important;
  border: none !important;
  padding: 10px 22px !important;
  border-radius: var(--radius-full) !important;
  font-weight: 700 !important;
  font-size: 0.85rem !important;
  box-shadow: var(--shadow-secondary);
  white-space: nowrap;
}
.header-quote-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(249,115,22,0.45);
  color: #fff !important;
}
.header-quote-btn::after { display: none !important; }

.navbar-toggler {
  border: 1px solid rgba(255,255,255,0.3) !important;
  padding: 6px 10px !important;
  color: #fff !important;
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255%2c255%2c255%2c0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

/* Dark mode header toggler fix */
[data-theme="dark"] .site-header.scrolled .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28241%2c245%2c249%2c0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}
.site-header.scrolled .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2815%2c23%2c42%2c0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

/* ================================================================
   HERO SECTIONS
   ================================================================ */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 100%);
  z-index: 1;
}

.hero-content { position: relative; z-index: 2; }

.hero-badge {"""

# Replace from `color: #fff;\n  display: inline-flex;` to the correct block
if "color: #fff;\n  display: inline-flex;" in content:
    new_content = content.replace("color: #fff;\n  display: inline-flex;", "color: #fff;\n" + missing_css + "\n  display: inline-flex;")
    with open(r'assets\css\style.css', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed style.css")
else:
    print("Pattern not found, manual fix required.")
