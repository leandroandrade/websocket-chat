package me.leandro.websockets;

import java.io.IOException;
import java.util.logging.Logger;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat/{processo}")
public class ChatEndpoint {
	private final Logger log = Logger.getLogger(getClass().getName());

	@OnOpen
	public void open(final Session session, @PathParam("processo") final String processo) {
		log.info("session openend and bound to room: " + processo);
		session.getUserProperties().put("processo", processo);
	}

	@OnMessage
	public void onMessage(final Session session, String dados) throws IOException {
		System.out.println("message:" + dados);
		String processo = (String) session.getUserProperties().get("processo");
		for (Session s : session.getOpenSessions()) {
			if (s.isOpen() && processo.equals(s.getUserProperties().get("processo"))) {
				s.getBasicRemote().sendText(dados);
			}
		}
	}
}
