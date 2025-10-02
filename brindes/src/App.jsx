
import './App.css'
import {Route, Routes} from "react-router-dom"
import CadastrodeProduto from './pages/CadastrodeProduto'
import ProdutosCadastrados from './pages/ProdutosCadastrados'
function App() {
  

  return (
    <>
    <Routes>
          <Route path="/" Component={ProdutosCadastrados}/>
          <Route path="/cadastro" Component={CadastrodeProduto}/>
          <Route path="/cadastro/:id" Component={CadastrodeProduto} />
    </Routes>
        
    </>
  )
}

export default App
