import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const compareAscending = (a, b) => {
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }
  return 0;
};

const compareDescending = (a, b) => {
  if (a.username < b.username) {
    return 1;
  }
  if (a.username > b.username) {
    return -1;
  }
  return 0;
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.users = [...state.users.filter(user => user.id !== id)];
    },
    updateUser: (state, action) => {
      const { id, name, email, username, address } = action.payload;
      const existingUser = state.users.find(user => user.id === id);

      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.username = username;
        existingUser.address.city = address.city;
      }
    },
    sortUsers: (state, action) => {
      const { sort } = action.payload;
      if (sort) {
        state.users = [...state.users.sort(compareAscending)];
      } else {
        state.users = [...state.users.sort(compareDescending)];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.concat(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser, deleteUser, updateUser, sortUsers } =
  usersSlice.actions;

export const selectUsers = state => state.users.users;

export const selectUserById = (state, userId) =>
  state.users.users.find(user => user.id === userId);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );

  const data = await response.json();

  return data;
});

export default usersSlice.reducer;
