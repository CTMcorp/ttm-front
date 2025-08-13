import { useEffect, useRef, useState } from "react";

const WebSocketComponent = () => {
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const token = sessionStorage.getItem("accessToken");
      const ws = new WebSocket("ws://localhost:8080/ws");

      ws.onopen = async () => {
        console.log("WebSocket connected");

        // Authentification avec le token JWT
        ws.send(
          JSON.stringify({
            type: "AUTH",
            token: token,
          })
        );

        try {
          const response = await fetch("http://localhost:8080/ttm/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const username = await response.text();
            sessionStorage.setItem("username", username);
          } else {
            console.error("Échec de la récupération de l'utilisateur");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      };

      console.log(token);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "Message") {
          setMessages((prev) => [...prev, data]);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      socketRef.current = ws;
      return () => {
        ws.close();
        clearTimeout(timeout);
      };
    }, 1000);
  }, []);

  const sendMessage = () => {
    const sender = sessionStorage.getItem("username");
    console.log("Sender : ", sender);

    if (
      message &&
      receiver &&
      socketRef.current?.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({
          type: "Message",
          sender,
          receiver,
          content: message,
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Messaging App</h1>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.sender} → {msg.receiver}:
            </strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        placeholder="Receiver username"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketComponent;
