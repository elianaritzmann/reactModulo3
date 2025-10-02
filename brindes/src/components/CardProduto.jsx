import './CardProduto.css'
function CardProduto(props){
    return(
        <div className="card">
            <h2>{props.nome}</h2>
            <h3>{props.preco}</h3>
            <p>{props.descricao}</p>
            <img src={props.imagem} alt="imagem do produto" />
            <button onClick = {props.editProduto}>Editar</button>
            <button onClick = {props.deleteProduto}>Deletar</button>

        </div>
    )
}export default CardProduto