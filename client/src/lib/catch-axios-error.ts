import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

type ApiError = {
  message: string;
  error?: string;
  code?: string;
  statusCode?: number;
  constraint?: string;
};

const getFriendlyErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError | undefined;

    if (data?.code === "P2003") {
      return "Cannot delete this record because it has elements associated";
    }

    if (data?.message) {
      return data.message;
    }

    if (data?.error) {
      return data.error;
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};

export const catchAxiosError = (error: unknown) => {
  const errorMessage = getFriendlyErrorMessage(error);

  if (process.env.NODE_ENV !== "production") {
    console.error("Full error:", error);
    if (error instanceof AxiosError) {
      console.error("Response data:", error.response?.data);
    }
  }

  return toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  });
};
