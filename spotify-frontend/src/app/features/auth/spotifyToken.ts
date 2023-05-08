import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState, RequiredParams } from "../../../utils/interfaces";
import { authTokenService } from "../../../utils/services/authService";

interface Props {
    requiredParam: RequiredParams,
    grant_type: string
}

const initialState: AuthState = {
  access_token: "",
  refresh_token: "",
};

export const fetchAuth = createAsyncThunk(
  "spotifyToken/authToken",
  async ({requiredParam, grant_type} : Props) => {
    const response = await authTokenService({requiredParam, grant_type});
    return response;
  }
);

export const spotifyTokenSlice = createSlice({
  name: "spotifyToken",
  initialState: initialState,
  reducers: {
    reset (state) {
      state.access_token = "",
      state.refresh_token = ""
    }
  },
  extraReducers(builder) {
    builder.addCase(
      fetchAuth.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      }
    );
  },
});

export default spotifyTokenSlice.reducer;
export const {reset} = spotifyTokenSlice.actions;
