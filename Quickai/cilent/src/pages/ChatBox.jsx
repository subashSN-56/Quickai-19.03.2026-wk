
// import { useState } from "react";
// import dog from "../image/pup.gif";

// const ChatBox = ({ active }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input) return;

//     const newMessages = [...messages, { type: "user", text: input }];
//     setMessages(newMessages);

//     try {
//       const res = await fetch("https://bot-backend-ecru-one.vercel.app/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message: input })
//       });

//       const data = await res.json();

//       setMessages([
//         ...newMessages,
//         { type: "bot", text: data.reply }
//       ]);
//     } catch (err) {
//       console.error(err);
//     }

//     setInput("");
//   };

//   return (
//     <div className={`chat-box ${active ? "show" : ""}`}>
//          {active && <img src={dog} className="dog" alt="dog" />}
// <div className="messages">
//   {messages.map((msg, i) => (
//     <div key={i} className={`message ${msg.type}`}>
//       {msg.text}
//     </div>
//   ))}
// </div>

//       <div className="input-area">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import { useState, useRef, useEffect } from "react";
import dog from "../image/pup.gif";

const ChatBox = ({ active }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("https://bot-backend-ecru-one.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { type: "bot", text: data.reply }
      ]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  // ✅ ENTER KEY SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // ✅ AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`chat-box ${active ? "show" : ""}`}>
      {active && <img src={dog} className="dog" alt="dog" />}

          {/* ✅ HEADER */}
<div className="flex items-center gap-2 p-3 border-b shadow-sm bg-white">
  
  {/* 🤖 Icon */}
  <span className="text-2xl">🤖</span>

  {/* ✨ Gradient Title */}
  <span className="bg-gradient-to-r from-green-500 via-orange-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg sm:text-xl">
    AI ChatBot
  </span>

</div>


      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            
            {/* ICON */}
            <span className="icon">
              {msg.type === "user" ? "🦹‍♂️" : "👉"}
            </span>

            <span>{msg.text}</span>
          </div>
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;