package PruebaChat.Chat.Controller;

import PruebaChat.Chat.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WSChatController {

    @MessageMapping("/chat1")
    public void getMessage(Message message){
        System.out.println("El mensaje recibido es " + message);
    }

}
