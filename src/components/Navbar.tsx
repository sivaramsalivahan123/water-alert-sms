import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Save } from "lucide-react";
import { toast } from "sonner";

interface NavbarProps {
  onRecipientChange: (number: string) => void;
}

export const Navbar = ({ onRecipientChange }: NavbarProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedNumber, setSavedNumber] = useState("");

  const handleSave = () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number");
      return;
    }

    // Basic phone number validation
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    if (cleanNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setSavedNumber(phoneNumber);
    onRecipientChange(phoneNumber);
    toast.success("Recipient number saved!");
  };

  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">SMS Control</h1>
          </div>
          
          <div className="flex items-center gap-3 max-w-md flex-1 ml-8">
            <Input
              type="tel"
              placeholder="Enter recipient number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSave}
              size="sm"
              className="bg-gradient-primary hover:opacity-90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
          
          {savedNumber && (
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{savedNumber}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
