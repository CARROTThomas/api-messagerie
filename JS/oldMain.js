const textMessage = document.querySelector("#inputMessage")
const ShowChatPage = document.querySelector("#btnAfficheConv")
const btnSendMessage = document.querySelector("#btnSendMessage")
const conversation = document.querySelector("#conversation")
const apiMessagerie = document.querySelector(".api-messagerie")
const userID = document.querySelector("#inputRegisterUsername")
const ShowSignUpPage = document.querySelector("#ShowSignUpPage")


ShowSignUpPage.addEventListener('click', ()=>{
    clearPage()
    templatePageSignUp()
})

ShowChatPage.addEventListener('click', ()=>{
    ordre()
})

/*btnSendMessage.addEventListener('click', ()=>{
    clearMessage()
    sendMessage(textMessage.value)
    RecupMessage()
    textMessage.value = ""
})*/

function templatePageSignUp(){
    let template = `
                    <div class="container d-flex align-items-center justify-content-center">
                        <div class="d-flex align-items-center flex-column border rounded m-3 bg-secondary">
                            <h2>Register : </h2>
                            <input id="inputRegisterUsername" class="d-flex text-center inputConnecting" type="text" id="regUsername" placeholder="Username">
                            <input id="inputRegisterPassword" class="d-flex text-center inputConnecting" type="password" id="regPassword" placeholder="Password">
                            <button class="btn bg-primary">submit</button>
                        </div>
                    </div>
                    `
    apiMessagerie.innerHTML = template
}

function templatePageChat(){
    let template = `
                    <div class="container d-flex align-items-center justify-content-center">
                        <div class="container d-flex flex-column justify-content-between align-items-center salonConversation">
                            <div id="conversation" class="bg-success m-1"></div>
                            <div class="row d-flex align-items-center methodeEnvoieMessage">
                                <input id="inputMessage" class="border col-11" type="text" name="messageAEnvoye" id="" placeholder="send message">
                                <button id="btnSendMessage" class="btn bg-primary col-1 d-flex align-items-center justify-content-center"><i class="bi bi-send-fill"></i></button>
                            </div>
                        </div>
                    </div>
                    `
    apiMessagerie.innerHTML = template
}

function clearMessage(){
    conversation.innerHTML = ""
}

async function RecupMessage(){
    let url = "https://139.162.156.85:8000/messages/"
    let requeteSerialisee = await fetch(url)
    let donneesDerialisee = await requeteSerialisee.json()
    donneesDerialisee.forEach(donnee=>{
        creationAffichageMessage(donnee.content, donnee.id, donnee.author.username)
    })
}

function creationAffichageMessage(msg, id, author){
    let template = `<div class="col-12 row d-flex align-items-center justify-content-between m-1 caseMessage">
                        <div class="col-2 d-flex align-items-center text-center">
                            <p class="col-5 m-0">${id}</p>
                            <p class="col-5 m-0">${author}:</p>
                        </div>
                        <p class="col-10 m-0">${msg}</p>
                    </div>`
    conversation.innerHTML += template
}

function sendMessage(messageText){
    let url = `https://139.162.156.85:8000/messages/${userID.value}/new`
    let body = {
        content : messageText
    }
    //console.log(messageText)
    fetch(url, {method : "POST", body:JSON.stringify(body)})
}

function clearPage(){
    apiMessagerie.innerHTML = ""
}

async function ordre(){
    clearPage()
    templatePageChat()
    //clearMessage()
    RecupMessage()
}