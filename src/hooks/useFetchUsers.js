import { useEffect, useState } from "react";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    await fetch(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    )
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading };
};
