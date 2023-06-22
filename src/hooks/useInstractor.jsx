
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";

const useInstractor = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isInstractor, isLoading: isInstractorLoading } = useQuery({
    queryKey: ["isInstractor", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/instractor/${user?.email}`);
      return res.data.instractor;
    },
  });
  return [isInstractor, isInstractorLoading];
};
export default useInstractor;
