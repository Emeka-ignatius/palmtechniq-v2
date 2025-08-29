import { TriangleAlertIcon } from "lucide-react";
import React from "react";

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-xl flex justify-center mx-auto items-center gap-x-2 text-sm text-destructive ">
      <TriangleAlertIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
}
