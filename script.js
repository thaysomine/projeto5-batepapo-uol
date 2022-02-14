let contact = null;
let mode = null;
let messages = [];
let participants = [];
let user = null;
let comparatorOne = null;
let comparatorTwo = null;

//função para envia usuário na tecla enter
document.querySelector(".login input").addEventListener("keyup", enterKeyPressedLogin);
function enterKeyPressedLogin(event) {
    if (event.keyCode == 13) {
        console.log("Enter key is pressed");
        login();
        return true;
    } else {
        return false;
    }
}
// função para entrar na sala
function login() {
    user = document.querySelector(".login input").value;
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name : user});
    promisse.then(validUser);
    promisse.catch(invalidUser);
}
// função caso nome do usuario esteja disponível
function validUser(loginUser) {
    document.querySelector(".login").classList.add("hidden");
    document.querySelector("main").classList.remove("hidden");
    setInterval(function() {
        axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name : user});
    },5000)
    console.log(loginUser);
}
// função caso ja tenha um usuário cadastrado com esse nome 
function invalidUser(error) {
    console.log(error.response);
    alert("Nome indisponível, tente outro.");
    window.location.reload(true);
}
// função para enviar mensagens na tecla enter
document.querySelector("footer input").addEventListener("keyup", enterKeyPressedMessage);
function enterKeyPressedMessage(event) {
    if (event.keyCode == 13) {
        console.log("Enter key is pressed");
        sendMessage();
        return true;
    } else {
        return false;
    }
}
// função para adicionar mensagens
function sendMessage () {
    const input = document.querySelector("footer input").value;
    console.log(input);
    if (input !== "") {
        const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", { from : user, to : "Todos", text : input, type : "message"});
        promisse.then(serverResponseSucess);
        promisse.catch(serverResponseFailed);
    }
}
// função caso servidor responda com sucesso
function serverResponseSucess() {
    document.querySelector("footer input").value = "";
    messageServer();
}
// função caso servidor responda com erro
function serverResponseFailed(messageFailed) {
    console.log(messageFailed.response);
    alert("Usuario deslogado");
    window.location.reload(true);
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
    const ul = document.querySelector("article ul");
    ul.innerHTML = "";

    for (let i=0; i< messages.length; i++) {
        // caso tipo mensagem
        if (messages[i].type === "message") { 
            ul.innerHTML += `
            <li>
                <div class="chat">
                    <div class="time">(${messages[i].time})</div>
                    <div class="message" data-identifier="message"><b>${messages[i].from}</b> para <b>${messages[i].to}</b>: ${messages[i].text}</div>
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
                    <div class="message" data-identifier="message"><b>${messages[i].from}</b> ${messages[i].text}</div>
                </div>
            </li>
        `;
        }
        //caso tipo mensagem reservada
        else if (messages[i].to === user || messages[i].from === user ) {
            ul.innerHTML += `
            <li>
                <div class="chat private">
                <div class="time">(${messages[i].time})</div>
                <div class="message" data-identifier="message"><b>${messages[i].from}</b> reservadamente para <b>${messages[i].to}</b>: ${messages[i].text}</div>
                </div>
            </li>
        `;
        }
        else {
            ul.innerHTML += `
            <li>
                <div class="hidden">
                <div class="time">(${messages[i].time})</div>
                <div class="message" data-identifier="message"><b>${messages[i].from}</b> reservadamente para <b>${messages[i].to}</b>: ${messages[i].text}</div>
                </div>
            </li>
        `;
        }
    }
    comparator();
}
// função para ver se tem mensagem nova
function comparator() {
    if (comparatorOne === null) {
        comparatorOne = messages[99].from+messages[99].to+messages[99].time+messages[99].text;
    } else
    if (comparatorOne !== null && comparatorTwo === null && messages[99].type === "message") {
        comparatorTwo = messages[99].from+messages[99].to+messages[99].time+messages[99].text;
        checkEquallity ();
    }
}
// função para verificar igualdade acima
function checkEquallity() {
    // caso tenha msg nova scrolar pra baixo
    if (comparatorOne !== comparatorTwo) {
        const scrollDown = document.querySelector('.box');
        scrollDown.scrollIntoView();
        console.log(comparatorOne);
        console.log(comparatorTwo);
    } 
    comparatorOne = comparatorTwo;
    comparatorTwo = null;
}