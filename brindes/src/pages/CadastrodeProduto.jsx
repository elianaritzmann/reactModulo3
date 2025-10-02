import { useEffect, useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import "./CadastrodeProduto.css"
import { useParams, useNavigate } from "react-router-dom";

function CadastrodeProduto(){
    const [nomeProduto, setNomeProduto]=useState('')
    const [precoProduto, setPrecoProduto]=useState('')
    const [descricao, setDescricao]=useState('')
    const [url, setUrl]=useState('')
    const { id } = useParams(); 
    const navigate = useNavigate();

    const produtos = {
    nome :nomeProduto,
    preco :precoProduto,
    descricao : descricao,
    imagem : url
    }
     useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/produtos/${id}`)
                .then((res) => {
                    setNomeProduto(res.data.nome);
                    setPrecoProduto(res.data.preco);
                    setDescricao(res.data.descricao);
                    setUrl(res.data.imagem);
                })
                .catch(() => toast.error("Erro ao carregar produto."));
        }
    }, [id]);

    function handleSubmit(event){
         event.preventDefault()

         if (id) {
            axios.put(`http://localhost:3001/produtos/${id}`, produtos)
                .then(() => {
                    toast.success("Produto atualizado com sucesso!");
                    navigate("/");
                })
                .catch(() => {
                    toast.error("Erro ao atualizar produto. Tente novamente mais tarde");
                })
        } else {
         axios.post("http://localhost:3001/produtos", produtos) 
    .then(() => {
      toast.success("Cadastro feito com sucesso!");
    })
    .catch(() => {
      toast.error("Houve um erro ao cadastrar produto. Tente novamente mais tarde");
    })
    }}
    return(
        <div className="produto">
            <ToastContainer></ToastContainer>
            <h2>Cadastro de produto</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="nomeProduto">Nome do produto: </label>
                <input type="text" name="nomeProduto"   value={nomeProduto}  onChange={(event)=>{ setNomeProduto(event.target.value)} } placeholder="Nome do produto"/>
                <label htmlFor="precoProduto">Preço: </label>
                <input type="text" name="precoProduto"value={precoProduto}   onChange={(event)=>{ setPrecoProduto(event.target.value)} } placeholder="Preço"/>
                <label htmlFor="descricao">Descrição: </label>
                <textarea name="descricao" id="descricao"  value={descricao}  onChange={(event)=>{ setDescricao(event.target.value)} } placeholder="Descrição do produto"></textarea>
                <label htmlFor="url">Url da imagem do produto: </label>
                <input type="text" name="url" id="url" value={url}  onChange={(event)=>{ setUrl(event.target.value)} } placeholder="Link da imagem"/>
                <button type="submit">Cadastrar</button>
            </form>
         </div>

    )
    
}export default CadastrodeProduto