document.addEventListener("DOMContentLoaded", function () {
    const chatbotButton = document.createElement('button');
    chatbotButton.textContent = "Chat with us";
    chatbotButton.style.position = "fixed";
    chatbotButton.style.bottom = "20px";
    chatbotButton.style.right = "20px";
    chatbotButton.style.backgroundColor = "#28a745";
    chatbotButton.style.color = "#fff";
    chatbotButton.style.border = "none";
    chatbotButton.style.borderRadius = "5px";
    chatbotButton.style.padding = "10px 15px";
    chatbotButton.style.cursor = "pointer";

    document.body.appendChild(chatbotButton);

// Create the pop-up message container
const messageContainer = document.createElement('div');
messageContainer.style.position = "fixed";
messageContainer.style.bottom = "100px";  // Positioned above the button
messageContainer.style.right = "20px";
messageContainer.style.backgroundColor = "#ffffff";
messageContainer.style.color = "#000";
messageContainer.style.padding = "15px 20px"; // Increased padding for spacing
messageContainer.style.border = "1px solid #ddd";
messageContainer.style.borderRadius = "12px";  // Rounded corners
messageContainer.style.fontSize = "16px";  // Larger font size
messageContainer.style.textAlign = "center";
messageContainer.style.minWidth = "250px";  // Minimum width for shorter messages
messageContainer.style.maxWidth = "400px";  // Maximum width for longer messages
messageContainer.style.display = "none"; // Initially hidden
messageContainer.style.opacity = "0"; // Initial opacity
messageContainer.style.transition = "opacity 0.5s ease, bottom 0.5s ease"; // Smooth transition

// Create the triangle pointer
const triangle = document.createElement('div');
triangle.style.position = "absolute";
triangle.style.bottom = "-10px";  // Positioned right below the message box
triangle.style.right = "30px";  // Align with the button
triangle.style.borderLeft = "12px solid transparent";
triangle.style.borderRight = "12px solid transparent";
triangle.style.borderTop = "12px solid #ffffff"; // White triangle pointing upwards
messageContainer.appendChild(triangle);

document.body.appendChild(messageContainer);

// Message update functionality
const messages = [
    "Need assistance? We're here to help!",
    "Looking for more info? Let's chat!",
    "We're ready to assist with any inquiries.",
    "Got any questions? Feel free to ask us!"
];

let messageIndex = 0;

function updateMessage() {
    messageContainer.style.display = "block";  // Show message container
    messageContainer.style.opacity = "0"; // Initially invisible
    messageContainer.style.bottom = "-50px"; // Start off-screen

    // Delay appearance for animation
    setTimeout(() => {
        messageContainer.textContent = messages[messageIndex];
        messageContainer.style.opacity = "1"; // Fade in
        messageContainer.style.bottom = "80px"; // Slide to visible position
        messageIndex = (messageIndex + 1) % messages.length;  // Cycle messages
    }, 100);

    // Hide after 3 seconds
    setTimeout(() => {
        messageContainer.style.opacity = "0"; // Fade out
        messageContainer.style.bottom = "-50px"; // Slide back down
    }, 3000);
}

// Trigger message update every 1 minute
setInterval(updateMessage, 60000);

// Trigger the first message immediately
updateMessage();


    const chatbotWindow = document.createElement('div');
    chatbotWindow.style.position = "fixed";
    chatbotWindow.style.bottom = "70px";
    chatbotWindow.style.right = "20px";
    chatbotWindow.style.width = "750px";  // Increased width (2.5x)
    chatbotWindow.style.height = "600px"; // Decreased height to fit the section
    chatbotWindow.style.backgroundColor = "#fff";
    chatbotWindow.style.border = "1px solid #ddd";
    chatbotWindow.style.borderRadius = "5px";
    chatbotWindow.style.display = "none";
    chatbotWindow.style.flexDirection = "column";
    chatbotWindow.style.overflow = "hidden";

    const chatbotHeader = document.createElement('div');
    chatbotHeader.style.backgroundColor = "#28a745";
    chatbotHeader.style.color = "#fff";
    chatbotHeader.style.padding = "10px";
    chatbotHeader.style.fontWeight = "bold";
    chatbotHeader.style.position = "relative";
    chatbotHeader.style.textAlign = "center";

    const headerTitle = document.createElement('span');
    headerTitle.textContent = "Chatbot";

    const closeButton = document.createElement('span');
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.right = "15px";
    closeButton.style.top = "50%";
    closeButton.style.transform = "translateY(-50%)";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "20px";
    closeButton.style.width = "24px";
    closeButton.style.height = "24px";
    closeButton.style.backgroundColor = "white";
    closeButton.style.color = "black";
    closeButton.style.borderRadius = "4px";
    closeButton.style.display = "flex";
    closeButton.style.alignItems = "center";
    closeButton.style.justifyContent = "center";
    closeButton.style.transition = "background-color 0.2s, color 0.2s";
    
    closeButton.addEventListener("mouseover", function() {
        closeButton.style.backgroundColor = "black";
        closeButton.style.color = "white";
    });
    
    closeButton.addEventListener("mouseout", function() {
        closeButton.style.backgroundColor = "white";
        closeButton.style.color = "black";
    });

    closeButton.addEventListener("click", function() {
        chatbotWindow.style.display = "none";
    });

    chatbotHeader.appendChild(headerTitle);
    chatbotHeader.appendChild(closeButton);

    const chatbotMessages = document.createElement('div');
    chatbotMessages.style.flex = "1";
    chatbotMessages.style.padding = "10px";
    chatbotMessages.style.overflowY = "auto";

    const chatbotInputContainer = document.createElement('div');
    chatbotInputContainer.style.display = "flex";
    chatbotInputContainer.style.padding = "10px";
    chatbotInputContainer.style.borderTop = "1px solid #ddd";

    const chatbotInput = document.createElement('input');
    chatbotInput.type = "text";
    chatbotInput.placeholder = "Type your message...";
    chatbotInput.style.flex = "1";
    chatbotInput.style.padding = "10px";
    chatbotInput.style.border = "1px solid #ddd";
    chatbotInput.style.borderRadius = "5px";

    const chatbotSendButton = document.createElement('button');
    chatbotSendButton.textContent = "Send";
    chatbotSendButton.style.marginLeft = "10px";
    chatbotSendButton.style.padding = "10px 15px";
    chatbotSendButton.style.backgroundColor = "#28a745";
    chatbotSendButton.style.color = "#fff";
    chatbotSendButton.style.border = "none";
    chatbotSendButton.style.borderRadius = "5px";
    chatbotSendButton.style.cursor = "pointer";

    chatbotInputContainer.appendChild(chatbotInput);
    chatbotInputContainer.appendChild(chatbotSendButton);

    chatbotWindow.appendChild(chatbotHeader);
    chatbotWindow.appendChild(chatbotMessages);
    chatbotWindow.appendChild(chatbotInputContainer);

    document.body.appendChild(chatbotWindow);

    chatbotButton.addEventListener("click", function () {
        chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "flex" : "none";
    });

    chatbotInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            chatbotSendButton.click();
        }
    });

    chatbotSendButton.addEventListener("click", function () {
        const message = chatbotInput.value.trim();
        if (message) {
            const userMessage = document.createElement('div');
            userMessage.textContent = message;
            userMessage.style.backgroundColor = "#f1f1f1";
            userMessage.style.marginBottom = "10px";
            userMessage.style.padding = "10px";
            userMessage.style.borderRadius = "5px";
            userMessage.style.alignSelf = "flex-end";

            chatbotMessages.appendChild(userMessage);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            chatbotInput.value = "";

            // Fetch response from Gemini API
            fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAavLaNG0fu75ouhu5rtkrXUw5fV-To3Ko", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [ {
                        parts: [ {
                            text: message
                        } ]
                    } ]
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);

                // Correctly extract the chatbot's response
                const botResponse = data.candidates && data.candidates[0]?.content?.parts[0]?.text
                    ? data.candidates[0].content.parts[0].text
                    : "I couldn't understand that. Please try again.";

                const botMessage = document.createElement('div');
                botMessage.textContent = botResponse;
                botMessage.style.backgroundColor = "#28a745";
                botMessage.style.color = "#fff";
                botMessage.style.marginBottom = "10px";
                botMessage.style.padding = "10px";
                botMessage.style.borderRadius = "5px";
                botMessage.style.alignSelf = "flex-start";

                chatbotMessages.appendChild(botMessage);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            })
            .catch(error => {
                console.error("Error:", error);

                const botMessage = document.createElement('div');
                botMessage.textContent = "An error occurred. Please try again.";
                botMessage.style.backgroundColor = "#28a745";
                botMessage.style.color = "#fff";
                botMessage.style.marginBottom = "10px";
                botMessage.style.padding = "10px";
                botMessage.style.borderRadius = "5px";
                botMessage.style.alignSelf = "flex-start";

                chatbotMessages.appendChild(botMessage);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            });
        }
    });
});






