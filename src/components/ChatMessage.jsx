import { User, Scale } from "lucide-react"

function ChatMessage({ content, role, timestamp }) {
  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={`chat-message ${role}`}>
      <div className="message-avatar">
        {role === "user" ? (
          <div className="avatar user-avatar">
            <User />
          </div>
        ) : (
          <div className="avatar assistant-avatar">
            <Scale />
          </div>
        )}
      </div>
      <div className="message-content">
        <div className="message-bubble">{content}</div>
        <div className="message-timestamp">{formattedTime}</div>
      </div>
    </div>
  )
}

export default ChatMessage

