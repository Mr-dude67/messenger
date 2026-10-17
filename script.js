// cursor things

const boody = document.querySelector('body');
const cursor = document.getElementById('cursor');

document.addEventListener("mousemove", (e) => {
	
	cursor.style.left = e.clientX + "px";
	cursor.style.top = e.clientY + "px";
	
});

window.onmousedown = () => { cursor.style.width = '25px'; cursor.style.height = '25px'; };
window.onmouseup = () => { cursor.style.width = '20px'; cursor.style.height = '20px'; };


// message system


const service = new WebSocket("wss://free.blr2.piesocket.com/v3/1?api_key=yo3iC0MgCTn4bZJ7Tk7qaCZKni21BsEXjU86Xdf0&notify_self=1");

const messageBox = document.getElementById("message-box");
const input = document.getElementById('input');

const userName = document.getElementById("username");

userName.value = localStorage.getItem("username") ?? 'Anonymous' + Math.floor(Math.random() * 200);

userName.addEventListener('input', (event) => {
	localStorage.setItem("username", userName.value)	
});

// Sending Text

let msg_count = 0;

function input_msg() {
	service.send(userName.value + ': ' + input.value);
	input.value = '';
};


// this is js for tests

service.onopen = () => { 
	// console.log("works"); tests
	// service.send("Test message connection"); tests
};


service.onmessage = (msg) => {
	msg_count++;
	
	if (msg_count > 16) {
		messageBox.textContent = '';
		messageBox.append(msg.data + '\n');
		msg_count = 1;	
	};
	
	if (msg_count < 17) {
		messageBox.append(msg.data + '\n');
	};
};


// Emoji system

const emojiBox = document.getElementById("emoji-box");

function smileyInsert() {
	input.value = input.value + '😀';
}

function poopInsert() {
	input.value = input.value + '💩';
}
