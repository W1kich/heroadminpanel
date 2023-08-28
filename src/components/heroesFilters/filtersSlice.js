import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
// 	filters: [],
// 	activeFilter: 'all',
// 	filtersLoadingStatus: 'idle',

// }

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
	activeFilter: 'all',
	filtersLoadingStatus: 'idle'
})


export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters', 
	async () =>{
		const {request} = useHttp();
		return await request("http://localhost:3001/filters");
	}
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers:{
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filtersLoadingStatus = 'idle';
				filtersAdapter.setAll(state, action.payload);
			})
			.addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
			.addDefaultCase(() => {})
	}
})

const {actions, reducer} = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

console.log(selectAll);

export default reducer;
export const {
	activeFilterChanged
} = actions;