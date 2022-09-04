import { Provider } from 'react-redux'
import { reduxStore } from '../redux/reduxStore'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
     <Provider store={reduxStore}>
      <Component {...pageProps} />
     </Provider>
  </>
}

export default MyApp
