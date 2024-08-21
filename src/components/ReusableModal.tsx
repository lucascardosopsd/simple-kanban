import { CSSProperties, ReactNode } from "react";
import { Button } from "./ui/button";
import { ButtonVariants } from "@/types/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

interface ReusableModalProps {
  trigger: string | ReactNode;
  title: string | ReactNode;
  content: string | ReactNode;
  description?: string;
  footer?: string | ReactNode;
  isOpen?: boolean;
  onOpen?: (open: boolean) => void;
  triggerClassName?: string;
  triggerVariant?: ButtonVariants;
  triggerStyle?: CSSProperties;
  onClick?: () => void;
  triggerSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

const ReusableModal = ({
  trigger,
  title,
  content,
  isOpen,
  onOpen,
  description,
  triggerClassName,
  triggerVariant,
  triggerStyle,
  triggerSize,
  onClick,
}: ReusableModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn("w-min", triggerClassName)}
          variant={triggerVariant}
          style={triggerStyle}
          onClick={onClick}
          size={triggerSize}
        >
          {trigger}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between w-full">
            {title}
          </DialogTitle>
          <DialogDescription className="w-full text-end">
            {description}
          </DialogDescription>
        </DialogHeader>

        {content}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableModal;
