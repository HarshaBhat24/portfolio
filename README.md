# S Harsha Bhat

Curiosity is the first exploit.

Cybersecurity professional focused on offensive security, VAPT, and CTF competitions. I approach every system with an attacker's mindset — finding what breaks before adversaries do.

---

## About This Portfolio

This space documents the work I want to be known for: VAPT engagements, security research, CTF writeups, and the tools built along the way. It is not a resume dump. It is a living record of how I think, what I break, and what I learn while doing it.

Certified in **CompTIA Security+** and **ISC2 Certified in Cybersecurity (CC)**. Currently working as a **Product Development Intern at Epicor Software** while conducting freelance VAPT engagements and competing in CTF competitions.

---

## Sections

| Section | Description |
|---|---|
| About | Who I am and what drives my security work |
| Experience | Epicor internship + freelance VAPT engagements |
| Certifications | CompTIA Security+ · ISC2 CC |
| Security Arsenal | Offensive, defensive, forensics, and tooling skills |
| Projects | Security tools and research built in practice |
| CTF Writeups | Challenge walkthroughs by category |
| Contact | Get in touch |

---

## Experience

### Product Development Intern — Epicor Software
*Oct 2025 – Present · Bengaluru, India*

- Authored CI/CD pipeline-as-code (Jenkins Jenkinsfile + Azure Pipelines YAML) and led the migration from Jenkins to Azure DevOps
- Developed PowerShell and Batch scripts to fully automate build and test environment provisioning
- Performed log-based root cause analysis of pipeline failures across Linux-based execution environments

### Freelance VAPT Engagement — Enterprise SaaS Platform
*Jul 2026 – Aug 2026*

End-to-end VAPT across 7 domains of a multi-tenant SaaS application — 9 Critical and 15 High findings including SSRF (OOB-confirmed), SQL wildcard injection, prompt injection on open LLM endpoints, and unauthenticated RLS access to security-critical tables. Delivered CVSS-scored reports with code-level remediations in TypeScript, Python, and SQL.

### Authorized Black-Box Security Assessment
*Individual Engagement*

Full lifecycle black-box assessment of a modern SaaS web application — confirmed BOLA, OAuth secret exposure, CORS misconfiguration, and WebSocket authentication weakness. Independently produced a professional report with attack chains, CVSS scores, and secure architecture recommendations.

---

## Featured Projects

### VigiLynx — Phishing & Malware Detector
*🏆 Track Champion, HackAthena'25*

Real-time threat detection platform with a dashboard and Chrome extension for detecting malicious URLs and files. Analyses structural anomalies, subdomain abuse, and obfuscation patterns.

→ [GitHub](https://github.com/HarshaBhat24/Vigilynx-Web) · [Live Demo](https://vigilynx-web.vercel.app/)

### CipherCrack — CTF Cryptographic Toolkit

Offline CLI toolkit in Python for automating encryption, decryption, and analysis of common CTF ciphers — built for speed during live competitions.

→ [GitHub](https://github.com/HarshaBhat24/CipherCrack)

### BodyBuddy — Computer Vision Posture Analyser

CV-based tool using OpenCV and MediaPipe to track joint angles, count reps, and provide real-time accuracy feedback for workout exercises.

→ [GitHub](https://github.com/HarshaBhat24/BodyBuddy)

---

## Certifications

- **CompTIA Security+** (SY0-701)
- **ISC2 Certified in Cybersecurity (CC)**

---

## Highlights

- 🏆 Track Champion, HackAthena'25
- 🏅 Finalist, KJSSE CTF 2.0 (2025) — 17th out of 662 teams
- 🏅 Finalist, Smart India Hackathon 2024 — top 1% of 500+ teams

---

## Tech Stack

**Portfolio built with:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Node.js (contact API)

**Security tooling across engagements:** Burp Suite · Nmap · ffuf · interactsh · sqlmap · nikto · Wireshark · Gobuster · curl · wscat

---

## Running Locally

```bash
# Client
cd client
npm install
npm run dev

# Server (contact form API)
cd server
npm install
npm run dev

# Network access (for mobile testing)
cd client
npm run dev -- -H 0.0.0.0
```

---

## Connect

- Email: harshabhat666@gmail.com
- LinkedIn: https://www.linkedin.com/in/s-harsha-bhat/
- GitHub: https://github.com/HarshaBhat24/
- Portfolio: https://harsha-bhat.vercel.app/
- Location: Bengaluru, India