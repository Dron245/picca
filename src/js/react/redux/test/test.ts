import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type typeTest = {
	t1: string,
	t2: number
}
const initialState: typeTest = {
	t1:"qwe",
	t2: 123
};

export const test = createSlice({
	name: "test",
	initialState,
	reducers: {
		testReducers(state, action:PayloadAction<string>) {
			state.t1 = action.payload
		}
	},
});
export const {testReducers} = test.actions
export default test.reducer;