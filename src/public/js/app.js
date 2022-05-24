//alert("1");
const socket = new WebSocket( `ws://${window.location.host}/`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

socket.addEventListener("open", (open)=>{
    console.log("[addEventListener Open]");
});

socket.addEventListener("message", (msg)=>{
    console.log("addEventListener message", "[",msg.data,"]" );
    const messageLi = document.createElement("li");
    messageLi.innerText = msg.data;
    messageList.append(messageLi);
});

socket.addEventListener("close", (close)=>{
    console.log("[addEventListener close]" );

});


function handleSubmit(event){
    event.preventDefault();
    const sMsg = messageForm.querySelector("input");
    socket.send(sMsg.value);
}

messageForm.addEventListener("submit", handleSubmit);
