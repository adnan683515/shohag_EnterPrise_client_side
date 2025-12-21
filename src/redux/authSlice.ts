import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../Context/AuthContext";



interface AuthState {
    user: TUser | null;
}
const initialState: AuthState = {
    user: null,
}

const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setUser: (state, action: PayloadAction<TUser>) => {
            console.log(action.payload, "from auth slice")
            state.user = action.payload
            console.log(state.user)
        }
        , logout: (state) => {
            state.user = null
        }
    }
})


export const { setUser , logout } = authslice.actions
export default authslice.reducer