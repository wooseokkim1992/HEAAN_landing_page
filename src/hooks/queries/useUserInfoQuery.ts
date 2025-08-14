import { getUserInfo } from "@/api/oidcAPI";
import { useQuery } from "@tanstack/react-query";

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => await getUserInfo(),
    enabled: false,
  });
};
