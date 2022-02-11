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
    promisse.then(promisseDelivered)
}
// função para buscar mensagens no servidor 
function promisseDelivered(reply) {
    messages = reply.data;
    console.log(messages);
    const ul = document.querySelector("ul");
    ul.innerHTML = "";

    for (let i=0; i< messages.length; i++) {
        console.log(messages[i].data);
        ul.innerHTML += `
        <li>
            <div class="chat">
                <div class="time">(${messages[i].time})</div>
                <div class="message">${messages[i].from} para ${messages[i].to}: ${messages[i].text}</div>
            </div>
        </li>
    `;
    }
}

