// export const setFilter = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         data: filter
//     }
// }

// const filterReducer = (state = "", action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.data
//         default:
//             return state
//     }
// }

// export default filterReducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer