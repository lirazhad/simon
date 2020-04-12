import * as React from 'react'
import { RootNavigator } from './src/navigation/root-navigator'
import { Provider } from 'react-redux'
import { store } from './src/store'



function App() {
  return(<Provider store={store}>
      <RootNavigator/> 
    </Provider>
    )}

export default App;