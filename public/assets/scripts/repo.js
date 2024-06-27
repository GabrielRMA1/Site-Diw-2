const token = 'YOUR_TOKEN_HERE';

const params = new URL(document.location.href);
const owner = params.searchParams.get("owner");
const repo = params.searchParams.get("repo");
 
async function getData() {
    const repositorio = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const data = await repositorio.json();

    document.getElementById('dataCriação').innerHTML= data.language;
    document.getElementById('nomeRepo').innerHTML = data.name;
    document.getElementById('descricaoRepo').innerHTML = data.description;
    document.getElementById('dataCriação').innerHTML = new Date(data.created_at).toLocaleDateString();
    document.getElementById('linguagemRepo').innerHTML = data.language;
    document.getElementById('estrelasRepo').innerHTML = data.stargazers_count;
    document.getElementById('watchersRepo').innerHTML = data.watchers;
    document.getElementById('forksRepo').innerHTML = data.forks;
    document.getElementById('licencaRepo').innerHTML = data.license.name;
    document.getElementById('linkRepo').innerHTML = data.html_url;
    linkElement = document.getElementById('linkRepo');
    linkElement.href = data.html_url;
    
    
}
getData();
async function getTopicos() {
    const repositorioTopicos = await fetch(`https://api.github.com/repos/${owner}/${repo}/topics`, {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.mercy-preview+json' // Cabeçalho necessário para acessar tópicos
        }
    });
    const dataTopicos = await repositorioTopicos.json();
    const topicsgit = document.getElementById('topicoRepo');
    // Certifique-se de que dataTopicos.names exista e seja um array antes de tentar iterar
    if (dataTopicos.names && Array.isArray(dataTopicos.names)) {
        dataTopicos.names.forEach(topic => {
            const buttonRepos = document.createElement('button');
            buttonRepos.setAttribute('type', 'button');
            buttonRepos.className = 'btn btn-dark';
            buttonRepos.textContent = topic; // Adiciona o texto do tópico ao botão
            topicsgit.appendChild(buttonRepos);
        });
    }
};

getTopicos();

window.onload = getTopicos();
window.onload = getData();