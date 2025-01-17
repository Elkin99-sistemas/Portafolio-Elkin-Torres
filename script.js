// script.js
const projectList = document.getElementById('project-list');

async function fetchProjects() {
  const response = await fetch('https://api.github.com/users/<TU_USUARIO>/repos');
  const projects = await response.json();

  projects.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description || 'Sin descripción'}</p>
      <a href="${project.html_url}" target="_blank">Ver en GitHub</a>
    `;
    projectList.appendChild(projectItem);
  });
}

fetchProjects();
