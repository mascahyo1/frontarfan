// middleware/authenticated.js
export default function ({ store, redirect }) {
    // If the user is not authenticated, redirect to the login page
    if (!store.getters['auth/isUser']) {
      redirect('/login')
    }
  }