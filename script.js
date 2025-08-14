// Función para mostrar la sección seleccionada
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';

    // Desplazarse suavemente a la sección seleccionada
    setTimeout(() => {
        selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200); // Retrasar el scroll ligeramente para asegurar que el contenido esté visible

    // Si se selecciona la sección de proyectos, cargar los repositorios de GitHub
    if (sectionId === 'projects') {
        loadGitHubProjects();
    }
}

// Función para cargar los repositorios de GitHub
async function loadGitHubProjects() {
    const response = await fetch('https://api.github.com/users/Elkin99-sistemas/repos');
    const projects = await response.json();

    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = ''; // Limpiar la lista antes de cargar

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.name;

        const projectLink = document.createElement('a');
        projectLink.href = project.html_url;
        projectLink.target = '_blank';
        projectLink.textContent = 'Ver en GitHub';

        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectLink);
        projectsList.appendChild(projectCard);
    });
}

// Mostrar la sección de "Sobre mí" por defecto al cargar la página
window.onload = () => {
    showSection('about');
};

// Agregar eventos de clic a los enlaces de navegación
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        showSection(sectionId);
    });
});

// Agregar evento de clic al botón de descarga de CV
document.getElementById('download-cv').addEventListener('click', () => {
    window.open('assets/Imagenes/elkin cv.pdf', '_blank');
});
