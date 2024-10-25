import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast";
import React from "react";

interface CommonToastProps {
  id: string;
  title?: string;
  description: string;
  action?: "success" | "error" | "warning" | "info" | "muted";
}

const CommonToast: React.FC<CommonToastProps> = ({
  id,
  title,
  description,
  action = "info",
}) => {
  return (
    <Toast nativeID={id} action={action} variant="solid">
      {title && <ToastTitle>{title}</ToastTitle>}
      <ToastDescription>{description}</ToastDescription>
    </Toast>
  );
};

export default CommonToast;
