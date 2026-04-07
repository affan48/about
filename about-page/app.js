/* ═══════════════════════════════
   NEXASTUDIO — APP.JS
   ═══════════════════════════════ */

'use strict';

/* ── Default Team Data (seeded to localStorage) ── */
const DEFAULT_MEMBERS = [
  {
    id: 1,
    name: "Sophia Chen",
    role: "Developer",
    image: "https://i.pravatar.cc/400?img=47",
    bio: "Full-stack engineer with 7 years of experience in React, Node.js and distributed systems. Obsessed with clean code and high-performance applications.",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Designer",
    image: "https://i.pravatar.cc/400?img=68",
    bio: "Product designer focused on crafting pixel-perfect interfaces that prioritize user delight. Former lead designer at two fintech unicorns.",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 3,
    name: "Aisha Rahman",
    role: "Manager",
    image: "https://i.pravatar.cc/400?img=44",
    bio: "Project manager and agile coach who keeps teams aligned, clients happy, and deadlines met — without burning anyone out.",
    linkedin: "https://linkedin.com",
    github: ""
  },
  {
    id: 4,
    name: "Luca Ferrara",
    role: "DevOps",
    image: "https://i.pravatar.cc/400?img=52",
    bio: "Infrastructure wizard specializing in Kubernetes, Terraform, and CI/CD pipelines. Makes 99.99% uptime look effortless.",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 5,
    name: "Zara Malik",
    role: "Designer",
    image: "https://i.pravatar.cc/400?img=45",
    bio: "Brand strategist and visual designer who transforms complex ideas into compelling visual systems. Thinks in systems, designs in details.",
    linkedin: "https://linkedin.com",
    github: ""
  },
  {
    id: 6,
    name: "James Okafor",
    role: "Developer",
    image: "https://i.pravatar.cc/400?img=59",
    bio: "Backend specialist with a passion for scalable APIs and data engineering. Contributor to several open-source projects with 2k+ GitHub stars.",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 7,
    name: "Priya Nair",
    role: "Marketing",
    image: "https://i.pravatar.cc/400?img=48",
    bio: "Growth marketer with expertise in content strategy, SEO, and demand generation. Helped scale two SaaS startups from 0 to 50k users.",
    linkedin: "https://linkedin.com",
    github: ""
  },
  {
    id: 8,
    name: "Ethan Brooks",
    role: "Manager",
    image: "https://i.pravatar.cc/400?img=65",
    bio: "Technical program manager bridging business strategy and engineering execution. Certified Scrum Master with a background in software architecture.",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
];

/* ── State ── */
let members = [];
let activeRole = 'All';
let searchQuery = '';
let nextId = 100;

/* ── LocalStorage Helpers ── */
function loadMembers() {
  try {
    const raw = localStorage.getItem('nexa_members');
    if (raw) {
      members = JSON.parse(raw);
      nextId = Math.max(...members.map(m => m.id), 99) + 1;
    } else {
      members = DEFAULT_MEMBERS;
      nextId = 9;
      saveMembers();
    }
  } catch { members = [...DEFAULT_MEMBERS]; }
}

function saveMembers() {
  localStorage.setItem('nexa_members', JSON.stringify(members));
}

/* ── Role Color Utility ── */
function roleClass(role) {
  const map = { Developer: 'role-Developer', Designer: 'role-Designer', Manager: 'role-Manager', DevOps: 'role-DevOps', Marketing: 'role-Marketing' };
  return map[role] || 'role-Developer';
}

/* ── Emoji Fallback ── */
function initials(name) {
  return name ? name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() : '?';
}

/* ── Render Team Grid ── */
function getFilteredMembers() {
  return members.filter(m => {
    const matchRole = activeRole === 'All' || m.role === activeRole;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });
}

function buildSocialLinks(m, style = 'card') {
  const links = [];
  if (m.linkedin) links.push(`<a href="${m.linkedin}" target="_blank" rel="noopener" title="LinkedIn">in</a>`);
  if (m.github) links.push(`<a href="${m.github}" target="_blank" rel="noopener" title="GitHub">gh</a>`);
  return links.join('');
}

function renderTeam() {
  const grid = document.getElementById('teamGrid');
  const noResults = document.getElementById('noResults');
  const filtered = getFilteredMembers();

  if (!filtered.length) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = filtered.map((m, i) => {
    const imgTag = m.image
      ? `<img src="${m.image}" alt="${m.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'card-avatar-placeholder\\'>${initials(m.name)}</div>'">`
      : `<div class="card-avatar-placeholder">${initials(m.name)}</div>`;

    const socials = buildSocialLinks(m);

    return `
    <div class="team-card" data-id="${m.id}" style="animation-delay:${i * 0.07}s" onclick="openMemberModal(${m.id})">
      <div class="card-image-wrap">
        ${imgTag}
        <div class="card-overlay">
          <div class="overlay-socials">
            ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="LinkedIn">in</a>` : ''}
            ${m.github ? `<a href="${m.github}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="GitHub">gh</a>` : ''}
          </div>
        </div>
      </div>
      <div class="card-body">
        <span class="card-role ${roleClass(m.role)}">${m.role}</span>
        <div class="card-name">${m.name}</div>
        <div class="card-bio">${m.bio}</div>
      </div>
      <div class="card-footer">
        <div class="card-socials">${socials}</div>
        <button class="card-detail-btn">View profile →</button>
      </div>
    </div>`;
  }).join('');
}

/* ── Member Modal ── */
function openMemberModal(id) {
  const m = members.find(x => x.id === id);
  if (!m) return;

  const imgEl = m.image
    ? `<img class="modal-img" src="${m.image}" alt="${m.name}" onerror="this.outerHTML='<div class=\\'modal-img-placeholder\\'>${initials(m.name)}</div>'">`
    : `<div class="modal-img-placeholder">${initials(m.name)}</div>`;

  const links = [];
  if (m.linkedin) links.push(`<a href="${m.linkedin}" target="_blank" rel="noopener">🔗 LinkedIn</a>`);
  if (m.github) links.push(`<a href="${m.github}" target="_blank" rel="noopener">⌨️ GitHub</a>`);

  document.getElementById('modalContent').innerHTML = `
    ${imgEl}
    <div class="modal-body">
      <span class="card-role modal-role ${roleClass(m.role)}">${m.role}</span>
      <div class="modal-name">${m.name}</div>
      <div class="modal-bio">${m.bio}</div>
      ${links.length ? `<div class="modal-links">${links.join('')}</div>` : ''}
    </div>`;

  document.getElementById('memberModal').classList.add('open');
}

function closeModal() {
  document.getElementById('memberModal').classList.remove('open');
}

/* ── Admin Panel ── */
function openAdmin() {
  renderAdminList();
  document.getElementById('adminOverlay').classList.add('open');
}

function closeAdmin() {
  document.getElementById('adminOverlay').classList.remove('open');
  resetForm();
}

function renderAdminList() {
  document.getElementById('memberCount').textContent = members.length;
  const container = document.getElementById('adminMemberList');

  if (!members.length) {
    container.innerHTML = '<p style="color:var(--text2);font-size:0.9rem;padding:12px 0">No team members yet. Add one above!</p>';
    return;
  }

  container.innerHTML = members.map(m => {
    const avatarContent = m.image
      ? `<img src="${m.image}" alt="${m.name}" onerror="this.parentElement.textContent='${initials(m.name)}'">`
      : initials(m.name);

    return `
    <div class="admin-member-item">
      <div class="admin-avatar">${m.image ? `<img src="${m.image}" alt="${m.name}" onerror="this.style.display='none'">` : initials(m.name)}</div>
      <div class="admin-member-info">
        <strong>${m.name}</strong>
        <span>${m.role}</span>
      </div>
      <div class="admin-member-actions">
        <button class="admin-edit-btn" onclick="editMember(${m.id})">Edit</button>
        <button class="admin-del-btn" onclick="deleteMember(${m.id})">Delete</button>
      </div>
    </div>`;
  }).join('');
}

function editMember(id) {
  const m = members.find(x => x.id === id);
  if (!m) return;

  document.getElementById('editId').value = m.id;
  document.getElementById('fName').value = m.name;
  document.getElementById('fRole').value = m.role;
  document.getElementById('fImage').value = m.image || '';
  document.getElementById('fBio').value = m.bio;
  document.getElementById('fLinkedin').value = m.linkedin || '';
  document.getElementById('fGithub').value = m.github || '';

  document.getElementById('formTitle').textContent = '✏️ Edit Team Member';
  document.getElementById('formSubmit').textContent = 'Save Changes';
  document.getElementById('cancelEdit').style.display = 'inline-block';

  // Scroll to form
  document.querySelector('.admin-form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteMember(id) {
  if (!confirm('Remove this team member?')) return;
  members = members.filter(m => m.id !== id);
  saveMembers();
  renderTeam();
  renderAdminList();
}

function resetForm() {
  document.getElementById('memberForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = '➕ Add Team Member';
  document.getElementById('formSubmit').textContent = 'Add Member';
  document.getElementById('cancelEdit').style.display = 'none';
}

/* ── Form Submit ── */
document.getElementById('memberForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const id = document.getElementById('editId').value;
  const data = {
    name: document.getElementById('fName').value.trim(),
    role: document.getElementById('fRole').value,
    image: document.getElementById('fImage').value.trim(),
    bio: document.getElementById('fBio').value.trim(),
    linkedin: document.getElementById('fLinkedin').value.trim(),
    github: document.getElementById('fGithub').value.trim()
  };

  if (id) {
    // Edit existing
    const idx = members.findIndex(m => m.id === parseInt(id));
    if (idx !== -1) members[idx] = { id: parseInt(id), ...data };
  } else {
    // Add new
    members.push({ id: nextId++, ...data });
  }

  saveMembers();
  renderTeam();
  renderAdminList();
  resetForm();

  // Flash success
  const btn = document.getElementById('formSubmit');
  const orig = btn.textContent;
  btn.textContent = '✓ Saved!';
  btn.style.background = '#4ade80';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1800);
});

/* ── Theme Toggle ── */
document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('nexa_theme', html.dataset.theme);
});

/* ── Filter Tabs ── */
document.getElementById('filterTabs').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeRole = btn.dataset.role;
  renderTeam();
});

/* ── Search ── */
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderTeam();
});

/* ── Event Listeners ── */
document.getElementById('adminToggleBtn').addEventListener('click', e => { e.preventDefault(); openAdmin(); });
document.getElementById('adminClose').addEventListener('click', closeAdmin);
document.getElementById('adminOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeAdmin(); });
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('memberModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.getElementById('cancelEdit').addEventListener('click', resetForm);

/* ── Escape key ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeAdmin(); }
});

/* ── Scroll Animations ── */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

/* ── Counter Animation ── */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ── Init ── */
function init() {
  // Restore theme
  const savedTheme = localStorage.getItem('nexa_theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  loadMembers();
  renderTeam();
}

init();
