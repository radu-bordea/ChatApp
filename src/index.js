const URL_API = "https://ha-slutuppgift-chat-do.westling.workers.dev/api/messages";
const URL_SENT_MESSAGE_API = 'https://ha-slutuppgift-chat-do.westling.workers.dev/api/messages/append'
const token = "N31fRWVMZCtwU0JeZnBQdVBjTmlOImRzcTAxfl08cz1xR2lyWGFJfmo5JC5RNSc=";

// loading
init(); 

// initialisation 
async function init(){
  // body for init loading 
  const post_body = JSON.stringify({ 
    limit: 10
  })

  const result = await callApi(URL_API, post_body)
  const messages = result['messages']   
  displayMessages(messages) // caling displayMessages

}
// getting mesages from API
async function callApi(url, body){
  console.log('post');
  const response = await fetch(url, {   method: `POST`, 
                                            body: body,
                                            headers: { Authorization: `Bearer ${token}`}
                                        }
                            );
  console.log(response);
  if (response.ok) {
    console.log(response.status);
        return await response.json();
  }
}
// display messages on HTML web page
function displayMessages(messages){
  for(let m of messages.reverse()){
    var par = document.createElement("p");
    var user = m['user']
    if(user === 'Radu')
      par.style.textAlign = 'left'    
    else
      par.style.marginLeft = 'auto'
    var text = document.createTextNode(user + ": " + m.message);    
    par.append(text)
    var body = document.getElementById("messageList")
    body.append(par)
  }
}
// send message to API
async function sendMessage(){
  let messToSend = document.getElementById("message").value;
  const post_body = JSON.stringify({ 
    user: 'Radu', 
    message: messToSend
  })
  const result = await callApi(URL_SENT_MESSAGE_API, post_body)

  if (result['success']) {
    console.log('Sent');
  }
  else {
    console.log("Fel");
  }
  window.location.reload();
}


