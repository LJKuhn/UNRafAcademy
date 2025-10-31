import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

interface AvatarSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (avatarUrl: string) => void;
  currentAvatar?: string;
}

const avatarSeeds = [
  "Felix", "Aneka", "Milo", "Luna", "Oscar", "Chloe", 
  "Max", "Bella", "Charlie", "Daisy", "Cooper", "Lucy",
  "Rocky", "Lily", "Bear", "Sophie", "Duke", "Sadie"
];

export function AvatarSelector({ open, onOpenChange, onSelect, currentAvatar }: AvatarSelectorProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || "");

  const handleSelect = (seed: string) => {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    setSelectedAvatar(avatarUrl);
  };

  const handleConfirm = () => {
    if (selectedAvatar) {
      onSelect(selectedAvatar);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Selecciona tu Avatar</DialogTitle>
          <DialogDescription>
            Elige un avatar de la colección disponible
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 py-4">
          {avatarSeeds.map((seed) => {
            const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
            const isSelected = selectedAvatar === avatarUrl;
            
            return (
              <button
                key={seed}
                onClick={() => handleSelect(seed)}
                className={`relative rounded-full transition-all hover:scale-110 ${
                  isSelected ? "ring-4 ring-primary" : ""
                }`}
              >
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarUrl} alt={seed} />
                </Avatar>
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-full">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedAvatar}>
            Confirmar Selección
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
