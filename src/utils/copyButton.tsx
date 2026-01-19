import { useState } from "react";
import { Copy, Check } from "lucide-react";

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2 soniyadan keyin ikonkani qaytarish
    } catch (err) {
      console.error("Nusxalashda xato:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 hover:bg-gray-200 rounded-md transition-colors inline-flex items-center"
      title="Nusxalash"
    >
      {copied ? (
        <Check size={14} className="text-green-600" />
      ) : (
        <Copy size={14} className="text-gray-400" />
      )}
    </button>
  );
};
