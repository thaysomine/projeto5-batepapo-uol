let contact = null;
let mode = null;
let messages = [];
// função para abrir barra lateral
function showSideBar() {
    document.querySelector("aside").classList.remove("hidden")
    document.querySelector("main").classList.add("bright");
}
// função para fechar a barra lateral
function unShowSideBar() {
    if (document.querySelector("main").classList.contains("bright")) {
        document.querySelector("aside").classList.add("hidden")
        document.querySelector("main").classList.remove("bright");
    }
}
// função para adicionar mensagens
function sendMessage () {
    const input = document.querySelector("footer input").value;
    const ul = document.querySelector("ul");
    ul.innerHTML += `
            <li>
                <div class="chat">
                    <div class="time">(09:21:45)</div>
                    <div class="message">${input}</div>
                </div>
            </li>
        `;
    input.value = "";
    console.log(input);
}
// função para escolher destinatario da mensagem 
function receiver (receiverOption) {
    if(contact !== null) {
        contact.querySelector("aside .check").classList.add("hidden");
    }

    contact = receiverOption;
    contact.querySelector("aside .check").classList.remove("hidden");
}
// função para escolher entre mensagem publica ou privada
function typeMessage(typeOption) {
    if(mode !== null) {
        mode.querySelector("aside .check").classList.add("hidden");
    }

    mode = typeOption;
    mode.querySelector("aside .check").classList.remove("hidden");
}
// função para buscar msgs no server a cada 3 segundos
setInterval(messageServer,3000);
// função para buscar mensagens no servidor 
function messageServer () {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(promisseDelivered);
}
// função para buscar mensagens no servidor 
function promisseDelivered(reply) {
    messages = reply.data;
    const ul = document.querySelector("ul");
    ul.innerHTML = "";

    for (let i=0; i< messages.length; i++) {
        // caso tipo mensagem
        if (messages[i].type === "message") { 
            ul.innerHTML += `
            <li>
                <div class="chat">
                    <div class="time">(${messages[i].time})</div>
                    <div class="message"><b>${messages[i].from}</b> para <b>${messages[i].to}</b>: ${messages[i].text}</div>
                </div>
            </li>
        `;
        }
        // caso tipo status 
        else if (messages[i].type === "status") {
            ul.innerHTML += `
            <li>
                <div class="chat connected">
                    <div class="time">(${messages[i].time})</div>
                    <div class="message"><b>${messages[i].from}</b> ${messages[i].text}</div>
                </div>
            </li>
        `;
        }
        //caso tipo mensagem reservada
        else {
            ul.innerHTML += `
            <li>
                <div class="chat private">
                <div class="time">(${messages[i].time})</div>
                <div class="message"><b>${messages[i].from}</b> reservadamente para <b>${messages[i].to}</b>: ${messages[i].text}</div>
                </div>
            </li>
        `;
        }
    }
}
// função para entrar na sala
function login() {
    let user = prompt("Insira nome de usuario");
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name : user});
    promisse.then(validUser);
    promisse.catch(invalidUser);
}
login();
// função caso nome do usuario esteja disponível
function validUser(loginUser) {
    console.log(loginUser);
}
// função caso ja tenha um usuário cadastrado com esse nome 
function invalidUser(error) {
    console.log(error.response);
    alert("Nome indisponível, tente outro.");
    login();
}

