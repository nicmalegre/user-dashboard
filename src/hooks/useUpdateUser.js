import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/usersSlice";

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const putUser = async newUser => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
          method: "PUT",
          body: JSON.stringify(newUser),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      dispatch(updateUser(newUser));

      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { putUser, isLoading };
};
