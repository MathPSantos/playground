"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import { ButtonHTMLAttributes, useEffect, useState } from "react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

type CopyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function CopyButton({ className, value, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (!hasCopied) return;

    const timeout = setTimeout(() => {
      setHasCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn("size-8 [&_svg]:size-4", className)}
      {...props}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
    >
      <span className="sr-only">Copy text</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
