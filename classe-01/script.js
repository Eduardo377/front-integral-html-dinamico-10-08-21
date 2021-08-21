const root = document.querySelector('body');
const buscar = document.querySelector('.busca');
const paises = document.querySelector('.paises');
const modal = document.createElement('div');
modal.classList.add('modal');
modal.classList.add('hidden');

const closeImg = document.createElement('img');
closeImg.classList.add('close');
closeImg.src = '../assets/close.png';

let paisAtual = 0;

closeImg.addEventListener('click', () => {
    modal.classList.toggle('hidden');
});

const prevImg = document.createElement('img');
prevImg.classList.add('prev');
prevImg.src = '../assets/prev.jpg';

const nextImg = document.createElement('img');
nextImg.classList.add('next');
nextImg.src = '../assets/next.jpg';

const bandeiraModal = document.createElement('img');
bandeiraModal.classList.add('img_maior');

const nomeModal = document.createElement('h2');
const regiaoModal = document.createElement('span');
const capitalModal = document.createElement('span');
const populacaoModal = document.createElement('p');

modal.append(closeImg, prevImg, nextImg, nomeModal, regiaoModal, capitalModal, populacaoModal, bandeiraModal);
root.append(modal);

const tabelaDePaises = fetch('https://restcountries.eu/rest/v2/all');
tabelaDePaises.then((resposta) => {
    const resultado = resposta.json();
    resultado.then((body) => {
        body.forEach((
            patriaRequerida, index) => {
            const conjunto = document.createElement('div');
            conjunto.classList.add('pais');

            conjunto.addEventListener('click', (esconder) => {
                modal.classList.toggle('hidden');
                nomeModal.textContent = `Nome: ${patriaRequerida.name}.`;

                regiaoModal.textContent = `Região: ${patriaRequerida.region}.`;


                if (!patriaRequerida.capital) {
                    capitalModal.textContent = '';
                } else {
                    capitalModal.textContent = `Capital: ${patriaRequerida.capital}.`;
                }

                populacaoModal.textContent = `População de ${patriaRequerida.population} pessoas.`;
                bandeiraModal.src = patriaRequerida.flag;

                populacaoModal.classList.add('elementosDoModal');
                capitalModal.classList.add('elementosDoModal');
                regiaoModal.classList.add('elementosDoModal');
                nomeModal.classList.add('elementosDoModal');

                populacaoModal.classList.add('elementosDoModalHover');
                capitalModal.classList.add('elementosDoModalHover');
                regiaoModal.classList.add('elementosDoModalHover');
                nomeModal.classList.add('elementosDoModalHover');
                paisAtual = index;

                function paisAtualIndex() {
                    nomeModal.textContent = `Nome: ${body[paisAtual].name}.`;
                    regiaoModal.textContent = `Região: ${body[paisAtual].region}.`;

                    if (!body[paisAtual].capital) {
                        capitalModal.textContent = '';
                    } else {
                        capitalModal.textContent = `Capital: ${body[paisAtual].capital}.`;
                    }

                    populacaoModal.textContent = `População de ${body[paisAtual].population} pessoas.`;
                    bandeiraModal.src = body[paisAtual].flag;

                    if (paisAtual === body.length - 1) {
                        nextImg.classList.add('hidden');
                    } else if (paisAtual === 0) {
                        prevImg.classList.add('hidden');
                    } else {
                        nextImg.classList.remove('hidden');
                        prevImg.classList.remove('hidden');
                    }
                    return;
                };

                nextImg.addEventListener('click', () => {
                    paisAtual++;
                    paisAtualIndex();
                });

                prevImg.addEventListener('click', () => {
                    paisAtual--;
                    paisAtualIndex();
                });
            });

            const name = document.createElement('h2');
            name.classList.add('name');
            name.classList.add('elementosDourado');
            const regiao = document.createElement('span');
            regiao.classList.add('elementosDourado');

            const capital = document.createElement('span');
            capital.classList.add('elementosDourado');

            const populacao = document.createElement('p');
            populacao.classList.add('elementosDourado');

            const bandeira = document.createElement('img');
            bandeira.classList.add('img_transform');

            name.textContent = `Nome: ${patriaRequerida.name}.`;
            regiao.textContent = `Região: ${patriaRequerida.region}.`

            if (!patriaRequerida.capital) {
                capital.textContent = '';
            } else {
                capital.textContent = `Capital: ${patriaRequerida.capital}.`
            }
            populacao.textContent = `População de ${patriaRequerida.population} pessoas.`
            bandeira.src = patriaRequerida.flag
            bandeira.classList.add('bandeira');

            conjunto.append(name, regiao, capital, populacao, bandeira);
            paises.append(conjunto);

        })
    });



});

buscar.addEventListener('keydown', (event) => {

    const paisBuscado = document.querySelectorAll('.pais');
    const nameBuscado = document.querySelectorAll('.name');
    if (event.key !== 'Enter') {
        return;
    } else {
        for (let i = 0; i < paisBuscado.length; i++) {
            console.log(nameBuscado[i].textContent.substr(6));
            console.log(buscar.value);
            if (nameBuscado[i].textContent.substr(6).replace(".", "") === buscar.value) {

                paisBuscado[i].classList.remove('hidden');
            } else {
                if (buscar.value === '') {
                    paisBuscado[i].classList.remove('hidden');
                } else {
                    paisBuscado[i].classList.add('hidden');
                }
            }
        }
    }

    buscar.value = '';
});