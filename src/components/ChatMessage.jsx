import { useState } from "react";
import {
  Webchat,
  WebchatProvider,
  Fab,
  getClient,
} from "@botpress/webchat";

const clientId = "8cb8a194-ad1b-4a87-8f7c-c46bd7789426";

const configuration = {
  // Color ko agar customize karna hai to CSS se kar sakti hai
};

export default function ChatMessage() {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div style={{ width: "100vw", height: "60vh" }}>
      <WebchatProvider client={client}>
        <Fab onClick={toggleWebchat} />
        {isWebchatOpen && <Webchat />}
      </WebchatProvider>
    </div>
  );
}
