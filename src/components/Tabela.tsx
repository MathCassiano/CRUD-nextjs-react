import Cliente from "@/core/Cliente";
import { table } from "console";
import { IconeEdicao, IconeLixo } from "./icones";

//dizendo o que eu esperor receber nessa tabela
interface TabelaProps{
    clientes: Cliente[];
    //quando clicar no cliente, vai devolver o cliente selecionad
    clienteSelecionado?:(cliente: Cliente) => void
    clienteExcluido?:(cliente: Cliente) => void
}


export default function Tabela(props: TabelaProps){
    
    function renderizarCabecalho(){
        return (
            <tr>
            <th className="text-left p-4">Código</th>
            <th className="text-left p-4">Nome</th>
            <th className="text-left p-4">Idade</th>
            <th className="p-4">Ações</th>
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
                {renderizarAcoes(cliente)}
            </tr>
            )
        })
    }
    
    //vou ter que receber um cliente aqui pois vou precisar escolher um cliente específico para realizar a ação
    function renderizarAcoes(cliente: Cliente){
        return (
            <td className="flex">
                <button className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2  m-1
                    hover:bg-purple-50
                `}>
                    {IconeEdicao}
                </button>
                <button className={`
                    flex justify-center items-center
                    text-red-600 rounded-full p-2  m-1
                    hover:bg-purple-50
                `}>
                    {IconeLixo}
                </button>
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