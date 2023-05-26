$(document).ready(function() {
    var conversationContainer = $("#conversation-container");
    var userInput = $("#user-input");
    var sendButton = $("#send-button");
    var loadingIndicator = $("#loading-indicator");

    sendButton.click(function() {
        var message = userInput.val().trim();

        if (message !== "") {
            // Mostrar el indicador de carga
            loadingIndicator.removeClass("is-hidden");

            // Enviar solicitud POST al servidor
            $.ajax({
                url: "/api/chatbot",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({ message: message }),
                success: function(response) {
                    // Ocultar el indicador de carga
                    loadingIndicator.addClass("is-hidden");

                    // Agregar mensaje del usuario al historial de la conversación
                    conversationContainer.append("<p>Human: " + message + "</p>");

                    // Agregar respuesta del chatbot al historial de la conversación
                    conversationContainer.append("<p>{{ params.chatbot_name }}: " + response.response + "</p>");

                    // Limpiar campo de entrada
                    userInput.val("");

                    // Mostrar el contenedor de la conversación si estaba oculto
                    conversationContainer.removeClass("is-hidden");
                },
                error: function(error) {
                    console.error("Error:", error);
                }
            });
        }
    });
});
