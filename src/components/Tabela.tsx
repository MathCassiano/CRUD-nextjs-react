'use client'
import Cliente from "../core/Cliente";
import { IconeEdicao, IconeLixo } from "./icones";

//dizendo o que eu esperor receber nessa tabela
interface TabelaProps{
    clientes: Cliente[];
    //quando clicar no cliente, vai devolver o cliente selecionad
    clienteSelecionado?:(cliente: Cliente) => void
    clienteExcluido?:(cliente: Cliente) => void
}


export default function Tabela(props: TabelaProps){

    
    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado
    
    function renderizarCabecalho(){
        return (
            <tr>
            <th className="text-left p-4">Código</th>
            <th className="text-left p-4">Nome</th>
            <th className="text-left p-4">Idade</th>
            
            {exibirAcoes ? <th className="p-4">Ações</th> : false}
        </tr>
        )
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, i) =>{
            return(
            <tr key={`cliente.id`}
            className={`${i%2 === 0 ? 'bg-purple-200' : 'bg-purple-100' }`} >
                <td  className="text-left p-4">{cliente.id}</td>
                <td  className="text-left p-4">{cliente.idade}</td>
                <td  className="text-left p-4">{cliente.nome}</td>
                {exibirAcoes ? renderizarAcoes(cliente) : false}
            </tr>
            )
        })
    }
    
    'user client';
    //vou ter que receber um cliente aqui pois vou precisar escolher um cliente específico para realizar a ação
    function renderizarAcoes(cliente: Cliente){
        
        return (
            
            <td className="flex justify-center">
                {/* renderizando o botão apenas se a função houver sido fornecida */}
                {props.clienteSelecionado ? (
                    // se o usuário clicar no botão, chama a função de cliente selecionado passando o cliente
                 <button onClick={() => props.clienteSelecionado?.(cliente)}  className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2  m-1
                    hover:bg-purple-50
                `}>
                    {IconeEdicao}
                </button>
                ) : false}

                
                {props.clienteExcluido ? (
                    // só  vai chamar passando o cliente se props.clienteSelecionado for diferente de  nulo
                    
                    <button onClick={() => props.clienteExcluido?.(cliente)} className={`
                    flex justify-center items-center
                    text-red-600 rounded-full p-2  m-1
                    hover:bg-purple-50
                `}>
                    {IconeLixo}
                </button>
                ): false}
            </td>
        )
    }
    return(
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
            text-gray-300
            bg-gradient-to-r from-purple-500 to bg-purple-800
            `}>
            {renderizarCabecalho()}
            </thead>
            <tbody>
                 {renderizarDados()}
            </tbody>

        </table>
    )
}