import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MessageControl } from "@/components/MessageControl";

const Index = () => {
  const [recipientNumber, setRecipientNumber] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRecipientChange={setRecipientNumber} />
      <main className="py-8">
        <MessageControl recipientNumber={recipientNumber} />
      </main>
    </div>
  );
};

export default Index;
