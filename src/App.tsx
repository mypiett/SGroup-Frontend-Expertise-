// import { AlignLeft } from "lucide-react"
import { Button } from "./components/ui/button"

function App() {
  function getData(){
    alert("Hello");
  }
  return (
    <>
      <Button onClick={getData}>Click me</Button>
    </>
  )
}

export default App
