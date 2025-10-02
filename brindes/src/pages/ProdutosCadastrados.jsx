import { useState, useEffect } from "react";
import CardProduto from "../components/CardProduto"
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "./ProdutosCadastrados.css"
import { Link, useNavigate} from "react-router-dom";

function ProdutosCadastrados(){
    const [produtos, setProdutos] = useState([])
    const navigate = useNavigate();
    const [busca, setBusca] = useState(""); 

    useEffect(() => {
     axios.get('http://localhost:3001/produtos', { 
    }
  ).then((response)=>{
      setProdutos(response.data)
      
  })
  }, []);         

  const editProduto = (id) =>{  
   navigate(`/cadastro/${id}`);

  }

  const deleteProduto =(id)=>{
    if (window.confirm("Tem certeza que deseja excluir este produto?")){ 
        axios.delete(`http://localhost:3001/produtos/${id}`,{ 
      }
        )
        .then(()=>{
          toast.success("Produto excluído com sucesso!")
        }).catch(()=>{
          toast.error("Houve um erro ao cadastrar. Tente novamente mais tarde")
        }
        )
        const novaLista = produtos.filter((l) => l.id !== id); 
        setProdutos(novaLista)
       }  }

        const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(busca.toLowerCase())
  );

    return(
        <div className="cardsContainer">
          <ToastContainer></ToastContainer>
          <h2>Produtos Cadastrados</h2>
           <input type="text"  placeholder="Pesquisar produto..." value={busca} onChange={(e) => setBusca(e.target.value)} className="barra-pesquisa" />

          <div className="btn">
              <Link to = '/cadastro'><button>Novo</button> </Link> 
          </div>

           <div className="cards">
            {produtosFiltrados.length > 0 ? (
             produtosFiltrados.map((produto) => {
             return (
        
         <CardProduto
          key={produto.id}
          nome={produto.nome}
          preco={produto.preco}
          descricao={produto.descricao}
          imagem = {produto.imagem}
          deleteProduto={() => deleteProduto(produto.id)}
          editProduto={() => editProduto(produto.id)}
        />
      )
    })
  ) : (
    <p>Ainda não há produtos cadastrados.</p>
  )}
           </div>
           
</div>
           

    
    )
} export default ProdutosCadastrados
