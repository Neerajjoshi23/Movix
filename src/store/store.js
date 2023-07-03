import { configureStore } from '@reduxjs/toolkit'
import HomeSlice from '../slice/HomepageSlice'

export default configureStore({
  reducer: {
    home:HomeSlice,
  }
})