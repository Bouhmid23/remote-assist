const connection = new WebSocket("ws://192.168.1.20:443");

 //This function will check the websocket connection error.
connection.onerror = function () {
    console.log("connection.onerror");
    document.getElementById('loginerror').innerText = "Server is down.. please try later";
    populate_error("server");
};

 //This function will check the websocket connection open.
 //When connection sucessfull , the user name send to server.
connection.onopen = function () {
    console.log("connection is fine");
    setInterval(ping, 10000);
};

 //This function will handle all the messages from server.
 // Main functiion to receive data from server.
connection.onmessage = function (message) {
    console.log("message from server = ", message.data);
    var data = JSON.parse(message.data);

    switch (data.type) {

        case "server_pong":
            if (data.name == "pong") {
                pong();
            }
            break;

        case "server_login":
            onLogin(data.success);
            break;

        case "server_offer":
            onOffer(data.offer, data.name);
            break;

        case "server_answer":
            onAnswer(data.answer);
            break;

        case "server_candidate":
            onCandidate(data.candidate);
            break;

        case "server_userlist":
            LoadOnlineUserList(data.name);
            break;

        case "server_userready":
            user_is_ready(data.success, data.peername);
            break;

        case "server_userwanttoleave":
            DisposeRoom();
            break;

        case "server_busyuser":
            busy_user();
            break;

        case "server_exitfrom":
            left_from_server();
            break;
        
        case "server_alreadyinroom":
            check_user_status(data.success,data.name);
            break;   

        case "server_error":
            break;

        case "server_nouser":
            break;

        default:
            break;
    }
};