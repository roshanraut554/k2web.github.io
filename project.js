async function loadProjectData() {
    const response = await fetch('/projects.json');
    return response.json();
}

let lastCategory = null;

async function loadProjects(category) {
    const gallery = document.getElementById('gallery');
    const experienceSection = document.getElementById('client-experience');

    if (lastCategory === category) {
        resetToExperience();
        lastCategory = null;
        return;
    }

    gallery.innerHTML = '';

    const data = await loadProjectData();
    const projects = data[category] || [];

    if (projects.length === 0) {
        gallery.innerHTML = '<p>No projects available in this category.</p>';
        gallery.style.display = 'block';
        return;
    }

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <a href="${project.image}" data-lightbox="projects" data-title="${project.title}" class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </a>
            <h3>${project.title}</h3>
            <p>${project.location}</p>
            <p>${project.description}</p>
        `;
        gallery.appendChild(projectDiv);
    });

    gallery.style.display = 'block';
    experienceSection.style.display = 'none';

    lastCategory = category;
}

function resetToExperience() {
    const gallery = document.getElementById('gallery');
    const experienceSection = document.getElementById('client-experience');

    gallery.innerHTML = '';
    gallery.style.display = 'none';
    experienceSection.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects('residential');
});

function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}
