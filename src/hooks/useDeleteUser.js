import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/usersSlice";

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteUser = async userId => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`, {
        method: "DELETE",
      });

      dispatch(deleteUser({ id: userId }));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDeleteUser, isLoading };
};
