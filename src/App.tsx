import { RouterProvider } from "react-router";
import { AnimalProvider } from "./features/animals/context/AnimalProvider";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { Router } from './router/Router';

function App() {

  return (
    <AuthProvider>
      <AnimalProvider>
        <RouterProvider router={Router} />
      </AnimalProvider>
    </AuthProvider>
  )
}

export default App