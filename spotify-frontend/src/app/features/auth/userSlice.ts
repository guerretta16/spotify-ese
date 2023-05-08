import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../../utils/interfaces";
import { getCurrentUserData } from "../../../utils/services/spotifyService";

const initialState: UserState = {
  id: "",
};

export const fetchUser = createAsyncThunk(
  "user/authInfo",
  async (access_token: string) => {
    const response = await getCurrentUserData(access_token);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset (state) {
      state.id = ""
    }
  },
  extraReducers(builder) {
     builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.id = action.payload.id
    })
  },
});

export default userSlice.reducer;
export const {reset} = userSlice.actions;
