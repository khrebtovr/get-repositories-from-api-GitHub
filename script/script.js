async function getRepositoriesApiGithub() {
    const response = await fetch("https://api.github.com/search/repositories?sort=stars&order=desc&per_page=10&page=1&q=stars");
    const data = await response.json();
    return data;
}

function createNameRepositories(name, id) {
    const nameRepositories = document.createElement('td');
    const linkToIDRepositories = document.createElement('a');
    nameRepositories.append(linkToIDRepositories);
    linkToIDRepositories.textContent = name;
    linkToIDRepositories.href = `/detailsRepositories.html?id=${id}`;
    linkToIDRepositories.classList.add('nameRepositories');
    return nameRepositories;
}

function createStarsRepositories(stargazers_count) {
    const starsRepositories = document.createElement('td');
    starsRepositories.textContent = stargazers_count;
    return starsRepositories;
}

function createLastCommitDate(updated_at) {
    const lastCommitDate = document.createElement('td');
    lastCommitDate.textContent = updated_at.slice(0,10);
    return lastCommitDate;
}

function createLinkGithub(html_url) {
    const linkGithub = document.createElement('td');
    const link = document.createElement('a');
    linkGithub.append(link);
    link.classList.add('link');
    link.setAttribute('target','_blank')
    link.textContent = html_url;
    link.href = html_url;
    return linkGithub;
}

function createOutputLine({name, id, stargazers_count, updated_at, html_url}) {
    const outputLines = document.createElement('tr');
    const repositories = createNameRepositories(name, id);
    const stars = createStarsRepositories(stargazers_count);
    const commit = createLastCommitDate(updated_at);
    const link = createLinkGithub(html_url);
    outputLines.append(repositories, stars, commit, link);
    return outputLines;
}

async function getAllRepositories() {
    const response = await getRepositoriesApiGithub();
    const tbody = document.querySelector('tbody');
    for(let i = 0; i < response.items.length; i++) {
        tbody.append(createOutputLine(response.items[i]))
    }
    return response.items;
}
getAllRepositories()