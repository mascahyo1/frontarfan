

export default function ({ $axios,store, app }) {
    let token = store.getters['auth/isToken'] ? store.getters['auth/isToken'] : app.$publictoken
    // console.log(store.getters['auth/isToken'] == null)
    $axios.defaults.baseURL = app.$baseurl
    $axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    $axios.interceptors.request.use((config) => {
      store.commit('auth/setLoading', true)
      return config
    },(error) => {
      return Promise.reject(error)
    });
    $axios.interceptors.response.use(
      (response) => {
        store.commit('auth/setLoading', false)
        // Hide the spinner
        return response;
      },
      (error) => {
        store.commit('auth/setLoading', false)
        // Do something with the response error
        return Promise.reject(error);
      }
    );
}
  