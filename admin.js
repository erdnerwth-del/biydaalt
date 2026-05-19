/* ============================================
   Admin Panel JavaScript
   ============================================ */

// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Default data
const defaultData = {
    about: {
        name: 'Эрдэнчулуун',
        university: 'Их Засаг Их Сургууль',
        course: '3-р курс',
        profession: 'Програм хангамж / Мэдээллийн технологи',
        intro: 'Сайн уу! Намайг Эрдэнчулуун гэдэг. Би Их Засаг Их Сургуулийн Програм хангамж / Мэдээллийн технологийн 3-р курсын оюутан. Програмчлал, вэб хөгжүүлэлт, мэдээллийн технологийн шинэ зүйлсийг сурах дуртай.',
        goal: 'Мэргэжлийн програм хөгжүүлэгч болох',
        interest: 'Вэб хөгжүүлэлт, AI, өгөгдлийн сан',
        passion: 'Шинэ технологи судлах, төсөл хөгжүүлэх'
    },
    skills: [
        { id: 1, name: 'HTML', percent: 85, category: 'web', icon: 'fab fa-html5' },
        { id: 2, name: 'CSS', percent: 80, category: 'web', icon: 'fab fa-css3-alt' },
        { id: 3, name: 'JavaScript', percent: 75, category: 'web', icon: 'fab fa-js' },
        { id: 4, name: 'Bootstrap', percent: 80, category: 'web', icon: 'fab fa-bootstrap' },
        { id: 5, name: 'PHP', percent: 70, category: 'other', icon: 'fab fa-php' },
        { id: 6, name: 'MySQL', percent: 75, category: 'other', icon: 'fas fa-database' },
        { id: 7, name: 'Git & GitHub', percent: 70, category: 'other', icon: 'fab fa-git-alt' },
        { id: 8, name: 'AI & Face Recognition', percent: 60, category: 'other', icon: 'fas fa-brain' }
    ],
    experiences: [
        { id: 1, title: 'Вэб хөгжүүлэлтийн төслүүд', desc: 'Олон төрлийн вэб сайт, вэб аппликейшн хөгжүүлсэн. Frontend болон backend хөгжүүлэлтийн туршлагатай.', icon: 'fas fa-globe', tags: ['HTML/CSS', 'JavaScript', 'PHP'] },
        { id: 2, title: 'Өгөгдлийн сангийн удирдлага', desc: 'MySQL өгөгдлийн санг зохион байгуулах, хурдан асуулга бичих, өгөгдлийн санг оптимизацлах туршлагатай.', icon: 'fas fa-database', tags: ['MySQL', 'Database Design', 'SQL'] },
        { id: 3, title: 'Багийн төслүүд', desc: 'Сургуулийн багийн төслүүдэд оролцож, хамтран ажиллах, код хуваалцах, Git ашиглах чадвартай.', icon: 'fas fa-users', tags: ['Teamwork', 'Git', 'Agile'] },
        { id: 4, title: 'Сургуулийн даалгавар, систем хөгжүүлэлт', desc: 'Сургуулийн хичээлүүдэд олон төрлийн программ, систем хөгжүүлж, програмчлалын хэлний гүнзгий мэдлэгтэй.', icon: 'fas fa-laptop-code', tags: ['C++', 'Java', 'Python'] }
    ],
    projects: [
        { id: 1, name: 'AI-д суурилсан царай таних ирцийн систем', desc: 'Хиймэл оюун ухаан ашиглан оюутнуудын ирцийг автоматаар бүртгэх систем.', tech: ['Python', 'OpenCV', 'AI', 'MySQL'], github: '#', demo: '#', image: '' },
        { id: 2, name: 'Weather App', desc: 'API ашиглан бодит цагийн цаг агаарын мэдээлэл харуулах вэб аппликейшн.', tech: ['JavaScript', 'API', 'HTML/CSS'], github: '#', demo: '#', image: '' },
        { id: 3, name: 'Admin Panel System', desc: 'Хэрэглэгчид, өгөгдөл удирдах, статистик харуулах админ панел систем.', tech: ['PHP', 'MySQL', 'Bootstrap'], github: '#', demo: '#', image: '' },
        { id: 4, name: 'Personal Portfolio Website', desc: 'Өөрийн ур чадвар, бүтээл, туршлагыг танилцуулх хувийн портфолио вэб сайт.', tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'], github: '#', demo: '#', image: '' },
        { id: 5, name: 'Database Management System', desc: 'Өгөгдлийн санг удирдах, CRUD үйлдэл хийх, тайлан гаргах систем.', tech: ['MySQL', 'PHP', 'JavaScript'], github: '#', demo: '#', image: '' }
    ],
    contact: {
        facebook: 'Эрдэнчулуун',
        github: '@erdenechuluun',
        email: 'erdenechuluun@email.com',
        phone: '+976 9911 9911'
    },
    messages: []
};

// Current editing item
let currentEditItem = null;
let currentEditType = null;

/* ============================================
   Initialize
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    initLocalStorage();
    checkLoginStatus();
    initLoginForm();
    initSidebar();
    initThemeToggle();
    initLogout();
    initForms();
    initImagePreview();
    initModal();
    loadAllData();
});

/* ============================================
   LocalStorage
   ============================================ */
function initLocalStorage() {
    if (!localStorage.getItem('cvData')) {
        localStorage.setItem('cvData', JSON.stringify(defaultData));
    }
}

function getData() {
    return JSON.parse(localStorage.getItem('cvData')) || defaultData;
}

function saveData(data) {
    localStorage.setItem('cvData', JSON.stringify(data));
}

/* ============================================
   Login System
   ============================================ */
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showDashboard();
    }
}

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            showAlert('success', 'Амжилттай нэвтэрлээ!');
            setTimeout(() => {
                showDashboard();
            }, 1000);
        } else {
            showAlert('danger', 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!');
        }
    });
}

function showAlert(type, message) {
    const alert = document.getElementById('loginAlert');
    alert.className = 'login-alert login-alert-' + type + ' show';
    alert.textContent = message;

    setTimeout(() => {
        alert.classList.remove('show');
    }, 3000);
}

function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadAllData();
}

/* ============================================
   Sidebar Navigation
   ============================================ */
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    const main = document.getElementById('adminMain');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            main.classList.toggle('expanded');
        });
    }

    // Mobile toggle
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
            sidebar.classList.toggle('mobile-open');
        }
    });

    // Menu items
    document.querySelectorAll('.admin-sidebar-menu a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);

            // Update active state
            document.querySelectorAll('.admin-sidebar-menu a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');

            // Close mobile sidebar
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('mobile-open');
            }
        });
    });
}

function showPage(page) {
    document.querySelectorAll('.admin-page').forEach(p => p.style.display = 'none');
    const targetPage = document.getElementById('page-' + page);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
}

/* ============================================
   Theme Toggle
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggleAdmin');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

/* ============================================
   Logout
   ============================================ */
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('adminLoggedIn');
        location.reload();
    });
}

/* ============================================
   Load All Data
   ============================================ */
function loadAllData() {
    const data = getData();

    // Dashboard stats
    document.getElementById('statSkills').textContent = data.skills.length;
    document.getElementById('statProjects').textContent = data.projects.length;
    document.getElementById('statExperience').textContent = data.experiences.length;
    document.getElementById('statMessages').textContent = data.messages.length;

    // About form
    document.getElementById('aboutName').value = data.about.name;
    document.getElementById('aboutUniversity').value = data.about.university;
    document.getElementById('aboutCourse').value = data.about.course;
    document.getElementById('aboutProfession').value = data.about.profession;
    document.getElementById('aboutIntro').value = data.about.intro;
    document.getElementById('aboutGoal').value = data.about.goal;
    document.getElementById('aboutInterest').value = data.about.interest;
    document.getElementById('aboutPassion').value = data.about.passion;

    // Skills table
    renderSkillsTable();

    // Experience table
    renderExperienceTable();

    // Projects table
    renderProjectsTable();

    // Contact info
    document.getElementById('contactFacebook').value = data.contact.facebook;
    document.getElementById('contactGithub').value = data.contact.github;
    document.getElementById('contactEmail').value = data.contact.email;
    document.getElementById('contactPhone').value = data.contact.phone;
}

/* ============================================
   Forms
   ============================================ */
function initForms() {
    // About form
    const aboutForm = document.getElementById('aboutForm');
    if (aboutForm) {
        aboutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = getData();
            data.about = {
                name: document.getElementById('aboutName').value,
                university: document.getElementById('aboutUniversity').value,
                course: document.getElementById('aboutCourse').value,
                profession: document.getElementById('aboutProfession').value,
                intro: document.getElementById('aboutIntro').value,
                goal: document.getElementById('aboutGoal').value,
                interest: document.getElementById('aboutInterest').value,
                passion: document.getElementById('aboutPassion').value
            };
            saveData(data);
            showNotification('Мэдээлэл амжилттай хадгалагдлаа!');
        });
    }

    // Skill form
    const skillForm = document.getElementById('skillForm');
    if (skillForm) {
        skillForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = getData();
            const newSkill = {
                id: Date.now(),
                name: document.getElementById('skillName').value,
                percent: parseInt(document.getElementById('skillPercent').value),
                category: document.getElementById('skillCategory').value,
                icon: document.getElementById('skillIcon').value || 'fas fa-code'
            };
            data.skills.push(newSkill);
            saveData(data);
            renderSkillsTable();
            skillForm.reset();
            showNotification('Ур чадвар амжилттай нэмэгдлээ!');
        });
    }

    // Experience form
    const experienceForm = document.getElementById('experienceForm');
    if (experienceForm) {
        experienceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = getData();
            const newExp = {
                id: Date.now(),
                title: document.getElementById('expTitle').value,
                desc: document.getElementById('expDesc').value,
                icon: document.getElementById('expIcon').value || 'fas fa-briefcase',
                tags: document.getElementById('expTags').value.split(',').map(t => t.trim()).filter(t => t)
            };
            data.experiences.push(newExp);
            saveData(data);
            renderExperienceTable();
            experienceForm.reset();
            showNotification('Туршлага амжилттай нэмэгдлээ!');
        });
    }

    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = getData();
            const imagePreview = document.getElementById('projectImagePreview');
            let imageData = '';
            const img = imagePreview.querySelector('img');
            if (img) {
                imageData = img.src;
            }

            const newProject = {
                id: Date.now(),
                name: document.getElementById('projectName').value,
                desc: document.getElementById('projectDesc').value,
                tech: document.getElementById('projectTech').value.split(',').map(t => t.trim()).filter(t => t),
                github: document.getElementById('projectGithub').value || '#',
                demo: document.getElementById('projectDemo').value || '#',
                image: imageData
            };
            data.projects.push(newProject);
            saveData(data);
            renderProjectsTable();
            projectForm.reset();
            imagePreview.innerHTML = '<i class="fas fa-image"></i>';
            showNotification('Бүтээл амжилттай нэмэгдлээ!');
        });
    }

    // Contact info form
    const contactInfoForm = document.getElementById('contactInfoForm');
    if (contactInfoForm) {
        contactInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = getData();
            data.contact = {
                facebook: document.getElementById('contactFacebook').value,
                github: document.getElementById('contactGithub').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value
            };
            saveData(data);
            showNotification('Холбоо барих мэдээлэл амжилттай хадгалагдлаа!');
        });
    }
}

/* ============================================
   Render Tables
   ============================================ */
function renderSkillsTable() {
    const tbody = document.getElementById('skillsTableBody');
    if (!tbody) return;

    const data = getData();
    tbody.innerHTML = data.skills.map((skill, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><i class="${skill.icon} me-2"></i>${skill.name}</td>
            <td>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar" style="width: ${skill.percent}%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));"></div>
                </div>
                <small>${skill.percent}%</small>
            </td>
            <td>${skill.category === 'web' ? 'Вэб хөгжүүлэлт' : 'Бусад'}</td>
            <td>
                <button class="admin-btn admin-btn-warning me-2" onclick="editItem('skills', ${skill.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="admin-btn admin-btn-danger" onclick="deleteItem('skills', ${skill.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    document.getElementById('statSkills').textContent = data.skills.length;
}

function renderExperienceTable() {
    const tbody = document.getElementById('experienceTableBody');
    if (!tbody) return;

    const data = getData();
    tbody.innerHTML = data.experiences.map((exp, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><i class="${exp.icon} me-2"></i>${exp.title}</td>
            <td>${exp.desc.substring(0, 50)}...</td>
            <td>
                <button class="admin-btn admin-btn-warning me-2" onclick="editItem('experiences', ${exp.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="admin-btn admin-btn-danger" onclick="deleteItem('experiences', ${exp.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    document.getElementById('statExperience').textContent = data.experiences.length;
}

function renderProjectsTable() {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;

    const data = getData();
    tbody.innerHTML = data.projects.map((project, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                ${project.image ? `<img src="${project.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">` : '<i class="fas fa-image" style="font-size: 2rem; color: var(--text-muted);"></i>'}
            </td>
            <td>${project.name}</td>
            <td>${project.tech.join(', ')}</td>
            <td>
                <button class="admin-btn admin-btn-warning me-2" onclick="editItem('projects', ${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="admin-btn admin-btn-danger" onclick="deleteItem('projects', ${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    document.getElementById('statProjects').textContent = data.projects.length;
}

/* ============================================
   Edit & Delete
   ============================================ */
function editItem(type, id) {
    const data = getData();
    const item = data[type].find(i => i.id === id);
    if (!item) return;

    currentEditItem = item;
    currentEditType = type;

    let modalBody = '';

    if (type === 'skills') {
        modalBody = `
            <div class="mb-3">
                <label>Нэр</label>
                <input type="text" id="editName" class="form-control" value="${item.name}">
            </div>
            <div class="mb-3">
                <label>Хувь (%)</label>
                <input type="number" id="editPercent" class="form-control" value="${item.percent}" min="0" max="100">
            </div>
            <div class="mb-3">
                <label>Ангилал</label>
                <select id="editCategory" class="form-control">
                    <option value="web" ${item.category === 'web' ? 'selected' : ''}>Вэб хөгжүүлэлт</option>
                    <option value="other" ${item.category === 'other' ? 'selected' : ''}>Бусад</option>
                </select>
            </div>
            <div class="mb-3">
                <label>Icon Class</label>
                <input type="text" id="editIcon" class="form-control" value="${item.icon || ''}">
            </div>
        `;
    } else if (type === 'experiences') {
        modalBody = `
            <div class="mb-3">
                <label>Гарчиг</label>
                <input type="text" id="editTitle" class="form-control" value="${item.title}">
            </div>
            <div class="mb-3">
                <label>Тайлбар</label>
                <textarea id="editDesc" class="form-control" rows="3">${item.desc}</textarea>
            </div>
            <div class="mb-3">
                <label>Icon Class</label>
                <input type="text" id="editIcon" class="form-control" value="${item.icon || ''}">
            </div>
            <div class="mb-3">
                <label>Тагууд (таслалаар)</label>
                <input type="text" id="editTags" class="form-control" value="${item.tags ? item.tags.join(', ') : ''}">
            </div>
        `;
    } else if (type === 'projects') {
        modalBody = `
            <div class="mb-3">
                <label>Нэр</label>
                <input type="text" id="editName" class="form-control" value="${item.name}">
            </div>
            <div class="mb-3">
                <label>Тайлбар</label>
                <textarea id="editDesc" class="form-control" rows="3">${item.desc}</textarea>
            </div>
            <div class="mb-3">
                <label>Технологиуд (таслалаар)</label>
                <input type="text" id="editTech" class="form-control" value="${item.tech ? item.tech.join(', ') : ''}">
            </div>
            <div class="mb-3">
                <label>GitHub</label>
                <input type="text" id="editGithub" class="form-control" value="${item.github || ''}">
            </div>
            <div class="mb-3">
                <label>Demo</label>
                <input type="text" id="editDemo" class="form-control" value="${item.demo || ''}">
            </div>
        `;
    }

    document.getElementById('modalBody').innerHTML = modalBody;
    document.getElementById('editModal').classList.add('show');
}

function deleteItem(type, id) {
    if (!confirm('Та энэ мэдээллийг устгахдаа итгэлтэй байна уу?')) return;

    const data = getData();
    data[type] = data[type].filter(item => item.id !== id);
    saveData(data);

    if (type === 'skills') renderSkillsTable();
    else if (type === 'experiences') renderExperienceTable();
    else if (type === 'projects') renderProjectsTable();

    showNotification('Амжилттай устгагдлаа!');
}

/* ============================================
   Modal
   ============================================ */
function initModal() {
    const modal = document.getElementById('editModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelModal');
    const saveBtn = document.getElementById('saveModal');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    saveBtn.addEventListener('click', () => {
        if (!currentEditItem || !currentEditType) return;

        const data = getData();
        const item = data[currentEditType].find(i => i.id === currentEditItem.id);
        if (!item) return;

        if (currentEditType === 'skills') {
            item.name = document.getElementById('editName').value;
            item.percent = parseInt(document.getElementById('editPercent').value);
            item.category = document.getElementById('editCategory').value;
            item.icon = document.getElementById('editIcon').value;
        } else if (currentEditType === 'experiences') {
            item.title = document.getElementById('editTitle').value;
            item.desc = document.getElementById('editDesc').value;
            item.icon = document.getElementById('editIcon').value;
            const tags = document.getElementById('editTags').value;
            item.tags = tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [];
        } else if (currentEditType === 'projects') {
            item.name = document.getElementById('editName').value;
            item.desc = document.getElementById('editDesc').value;
            const tech = document.getElementById('editTech').value;
            item.tech = tech ? tech.split(',').map(t => t.trim()).filter(t => t) : [];
            item.github = document.getElementById('editGithub').value || '#';
            item.demo = document.getElementById('editDemo').value || '#';
        }

        saveData(data);

        if (currentEditType === 'skills') renderSkillsTable();
        else if (currentEditType === 'experiences') renderExperienceTable();
        else if (currentEditType === 'projects') renderProjectsTable();

        closeModal();
        showNotification('Амжилттай засагдлаа!');
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('editModal').classList.remove('show');
    currentEditItem = null;
    currentEditType = null;
}

/* ============================================
   Image Preview
   ============================================ */
function initImagePreview() {
    const fileInput = document.getElementById('projectImage');
    const preview = document.getElementById('projectImagePreview');

    if (!fileInput || !preview) return;

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

/* ============================================
   Notification
   ============================================ */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);
