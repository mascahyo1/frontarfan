// store/index.js
import { state, mutations, actions } from './auth'

export const modules = {
  auth: {
    state,
    mutations,
    actions
  }
}