const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


// CRIA O LI DA LISTA ======================================
function criaLi() {
    const li = document.createElement('li');
    return li;

}
// CAPTURAR O EVENTO DE TECLA ENTER PRESSIONADA ======================================

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

//LIMPAR INPUT APÓS ADICIONAR UMA NOVA TAREFA ========================================
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

// CRIAR BOTÃO PARA APAGAR A TAREFA =================================

function criaBotaoApagar(li) {
    li.innerText += '  ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}




// CRIA A TAREFA ======================================================================

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}
// CAPTURAR O EVENTO DE CLIQUE NO BOTÃO ================================================

btnTarefa.addEventListener('click', function (e) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
});
// APAGAR TAREFAS =================================================================

document.addEventListener('click', function (e) {
    const elemento = e.target
    if (elemento.classList.contains('apagar')) {
        elemento.parentElement.remove();
        salvarTarefas();
    }
})
// SALVAR AS TAREFAS EM LOCALSTORAGE =================================================================
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON); 
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();