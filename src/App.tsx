import { Routes, Route } from "react-router"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile.tsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile/:id" element={<Profile/>} />
    </Routes>
  )
  
}

export default App
