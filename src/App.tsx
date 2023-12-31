import { RouterProvider } from "react-router-dom";
import './App.css'
import { router } from "./routes";

const App = () => {
  return (
    <div className="App" style={{ width: '100%' }}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App