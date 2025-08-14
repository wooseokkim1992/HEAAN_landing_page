import { useQuery } from "@tanstack/react-query";

import { getGrantId } from "@/api/oidcAPI";

export const useGrantIdQuery = () => {
  return useQuery({
    queryKey: ["grantId"],
    queryFn: async () => await getGrantId(),
    enabled: false,
  });
};
