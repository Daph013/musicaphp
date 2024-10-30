import { BrowserRouter } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Header from "./components/Header"
import Footer from "./components/Footer"




const App = () => {
  return (
    <BrowserRouter>
    <div className="contenedor">
      <Header />
      
     

      <main>
        <Inicio/>
      </main>

      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App