
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "../src/components/Home"
import Result from "../src/components/Result"
import Login from "../src/components/Login"
import Quiz from "../src/components/Quiz"
import { Provider } from "react-redux"
import appStore from "../src/store/appStore"
const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <Home/>
  }, 
  {
    path : "/login", 
    element : <Login/>
  },
  {
    path : "/quiz",
    element : <Quiz/>
  },
  {
    path : "/result",
    element : <Result/>
  }
])

function App() {
  return (
    <Provider store={appStore}>
    <RouterProvider router={appRouter}/>
    </Provider>
    );
}

export default App;
