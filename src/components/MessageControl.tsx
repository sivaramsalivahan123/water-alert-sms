import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Square, Droplet } from "lucide-react";
import { toast } from "sonner";

interface MessageControlProps {
  recipientNumber: string;
}

export const MessageControl = ({ recipientNumber }: MessageControlProps) => {
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (messageType: "start" | "stop" | "water_status") => {
    if (!recipientNumber) {
      toast.error("Please add a recipient number first");
      return;
    }

    setIsSending(true);
    
    try {
      // Simulate sending message - in production this would call an edge function
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const messages = {
        start: "START command sent",
        stop: "STOP command sent",
        water_status: "Water status request sent"
      };
      
      toast.success(`${messages[messageType]} to ${recipientNumber}`);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Card className="border-0 shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-2xl">Message Control Panel</CardTitle>
          <CardDescription>
            Send commands to {recipientNumber || "recipient"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => sendMessage("start")}
              disabled={isSending || !recipientNumber}
              size="lg"
              className="h-32 flex flex-col gap-3 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
            >
              <Play className="h-8 w-8" />
              <span className="text-lg font-semibold">Send START</span>
            </Button>

            <Button
              onClick={() => sendMessage("stop")}
              disabled={isSending || !recipientNumber}
              size="lg"
              variant="destructive"
              className="h-32 flex flex-col gap-3 shadow-md"
            >
              <Square className="h-8 w-8" />
              <span className="text-lg font-semibold">Send STOP</span>
            </Button>

            <Button
              onClick={() => sendMessage("water_status")}
              disabled={isSending || !recipientNumber}
              size="lg"
              className="h-32 flex flex-col gap-3 bg-success hover:bg-success/90 text-success-foreground shadow-md"
            >
              <Droplet className="h-8 w-8" />
              <span className="text-lg font-semibold">Water Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
