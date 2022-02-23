async function getRepositoriesAPI() {
    const response = await fetch("https://api.github.com/search/repositories?sort=stars&order=desc&per_page=10&page=1&q=stars");
    const data = await response.json();
    return data;
}

function getIDRepositories() {
    const searcParam = new URLSearchParams(location.search);
    const id = searcParam.get('id');
    return id;
}

async function repositories(){
    const repositories = await getRepositoriesAPI();
    for(let item of repositories.items){
        if(Number(getIDRepositories()) === item.id){
            renderRepositories(item)
        }
    }
}

function renderRepositories({name, watchers, visibility, language, homepage, created_at, html_url}) {
    const nameRepositories = document.querySelector('.name');
    const createdRepositories = document.querySelector('.created');
    const homepageRepositories = document.querySelector('.homepage');
    const languageRepositories = document.querySelector('.language');
    const watchersRepositories = document.querySelector('.watchers');
    const visibilityRepositories = document.querySelector('.visibility');
    const linkRepositories = document.querySelector('.link');

    nameRepositories.textContent = name;
    createdRepositories.textContent = created_at.slice(0,10);
    homepageRepositories.href = homepage;
    languageRepositories.textContent = language;
    watchersRepositories.textContent = watchers;
    visibilityRepositories.textContent = visibility;
    linkRepositories.href = html_url;

    homepageRepositories.setAttribute('target','_blank');
    linkRepositories.setAttribute('target','_blank');
}

repositories()