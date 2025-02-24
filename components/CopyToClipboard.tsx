"use client";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";

type CopyToClipboardProps = {
  text: string;
  mask?: boolean;
  maxChars?: number;
};

export function CopyToClipboard(props: CopyToClipboardProps) {
  const { maxChars, text, mask = true } = props;
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  function getMaskedText() {
    if (mask) return "*****";

    return maxChars ? text.substring(0, maxChars) + "..." : text;
  }
  return (
    <div className="flex items-center space-x-2">
      <span>{getMaskedText()}</span>
      <Clipboard
        role="button"
        className="pointer"
        size={20}
        onClick={handleCopyToClipboard}
      />
    </div>
  );
}
