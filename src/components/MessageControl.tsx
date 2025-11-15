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
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-8">
      <Card className="border-0 shadow-lg bg-gradient-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl">Message Control Panel</CardTitle>
          <CardDescription className="text-sm">
            Send commands to {recipientNumber || "recipient"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Button
              onClick={() => sendMessage("start")}
              disabled={isSending || !recipientNumber}
              size="lg"
              className="h-28 sm:h-32 flex flex-col gap-2 sm:gap-3 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow touch-manipulation"
            >
              <Play className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="text-base sm:text-lg font-semibold">Send START</span>
            </Button>

            <Button
              onClick={() => sendMessage("stop")}
              disabled={isSending || !recipientNumber}
              size="lg"
              variant="destructive"
              className="h-28 sm:h-32 flex flex-col gap-2 sm:gap-3 shadow-md touch-manipulation"
            >
              <Square className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="text-base sm:text-lg font-semibold">Send STOP</span>
            </Button>

            <Button
              onClick={() => sendMessage("water_status")}
              disabled={isSending || !recipientNumber}
              size="lg"
              className="h-28 sm:h-32 flex flex-col gap-2 sm:gap-3 bg-success hover:bg-success/90 text-success-foreground shadow-md touch-manipulation"
            >
              <Droplet className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="text-base sm:text-lg font-semibold">Water Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
