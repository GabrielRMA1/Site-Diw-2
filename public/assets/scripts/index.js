const token = 'YOUR_TOKEN_HERE';

async function getData() {
    const response = await fetch('https://api.github.com/users/GabrielRMA1', {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const data = await response.json();

    document.getElementById('nomegit').innerHTML = data.name;
    document.getElementById('biogit').innerHTML = data.bio;
    document.getElementById('localgit').innerHTML = data.location;
    document.getElementById('sitegit').innerHTML = data.html_url;
    linkElement = document.getElementById('sitegit');
    linkElement.href = data.html_url;
    imgElement = document.getElementById('imggit');
    imgElement.src = data.avatar_url;
    document.getElementById('seggit').innerHTML = data.followers;
    document.getElementById('totalRepos').innerHTML = `(${data.public_repos})`;

}
getData();

async function getRepos() {
    const repositorio = await fetch('https://api.github.com/users/GabrielRMA1/repos', {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const repo = await repositorio.json();
    const reposgit = document.getElementById('repositoriosgit');
    repo.forEach(async element => {
        const divRepos = document.createElement('div');
        divRepos.innerHTML = `
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"><a href="repo.html?owner=${element.owner.login}&repo=${element.name}">${element.name}</a></h5>
                    <p class="card-text">${element.description}</p>
                    <a class="fa-regular fa-star"  id="icones">${element.stargazers_count}</a>
                    <a class="fa-solid fa-user" id="icones">${element.watchers}</a>
                </div>
            </div>
        </div>`;
        reposgit.appendChild(divRepos);
    });

}
async function carregarDadosJson(){
    const resposta = await fetch('http://localhost:3000/Amigos');
    const data = await resposta.json();
    console.log(data);
    const amigos = document.getElementById('listaAmigos');
    data.forEach(element => {
        amigos.innerHTML += `
        <div class="card mb-3" style="max-width: 320px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${element.img}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title"><a href="${element.github}" >${element.nome}</a></h5>
                <p class="card-text">${element.descricao}</p>
              </div>
            </div>
          </div>
        </div>
        `;
    });

    const resposta2 = await fetch('http://localhost:3000/Carousel');
    const data2 = await resposta2.json();
    const carousel = document.getElementById('carousel');

    for(let i = 0; i < data2.length; i++) {
        const noticia = data2[i];
        const div = document.createElement('div');
        div.className = `carousel-item ${i === 0 ? 'active' : ''}`;

        div.innerHTML = `<img
            src="${noticia.img}"
            class="d-block w-100" alt="...">
        `;

        carousel.appendChild(div);
    }

   /*
    const carouselInner = document.querySelector('#btnCarousel');
    carouselInner.innerHTML = '';
    for(let i = 0; i < data2.length; i++) {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.bsTarget = '#carouselExampleCaptions';
        button.dataset.bsSlideTo = i.toString();
        button.className = i === 0 ? 'active' : '';
        button.setAttribute('aria-current', i === 0 ? 'true' : 'false');
        button.setAttribute('aria-label', `Slide ${i + 1}`);

        carouselIndicators.appendChild(button);
    }

*/
}

window.onload = getRepos();
window.onload = getData(); 
window.onload = carregarDadosJson();