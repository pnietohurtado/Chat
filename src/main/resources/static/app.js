const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/chats'
});

stompClient.onConnect = (frame) => {

    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/canal1', (greeting) => {

        showGreeting(JSON.parse(greeting.body).content);

    });

};

stompClient.onStompError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {

    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Aditional details: ' + frame.body);

};

function setConnected(connected){

    $("#connect").prop("disabled", connected);
    $("#disconnected").prop("disabled", !connected);
    if(connected){
        $("#conversation").show();
    }else{
        $("#conversation").hide();
    }
    $("#greetings").html("");
}



function connect(){
    stompClient.activate();
}

function disconnect(){
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName(){
    stompClient.publish({
        destination: "/app/chat1",
        body: JSON.stringify({'body': $("message").val()})
    });
}

function showGreeting(message){
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect").click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());

});