import { catchAxiosError } from "@/lib/catch-axios-error";
import { AuthService } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await AuthService.login(email, password);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      sessionStorage.setItem("token", data.token);
      router.push("/profile");
    },
    onError: (error) => catchAxiosError(error),
  });
};

export const useSignupMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const response = await AuthService.signup(name, email, password);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      sessionStorage.setItem("token", data.token);
      router.push("/profile");
    },
    onError: (error) => catchAxiosError(error),
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthService.logout();
      return response.data;
    },
    onSuccess: () => {
      sessionStorage.removeItem("token");
      queryClient.clear();
      router.push("/login");
    },
    onError: (error) => catchAxiosError(error),
  });
};
