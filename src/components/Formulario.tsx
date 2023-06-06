import { useState } from "react";
import Entrada from "./Entrada";
import Botao from "./Botao";
import Cliente from "../core/Cliente";

interface FormularioProps{
        cliente: Cliente
        //quando o usuario clicar em salvar, vou chamar o onclick
        clienteMudou?: (cliente: Cliente) => void
        cancelado?: () => void
}

export default function Formulario(props: FormularioProps){
    //se o cliente tiver id, é pq já existe e eu estou querendo alterar
    //se não tiver id, é pq é um cliente novo a ser criado
    const id = props.cliente?.id 
 //se não tiver cliente, não vou querer acessar o nome, se nenhum valor for passado, vai assumir uma string vazia por padrão
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    //por padrão o valoor da idade vai ser 0 se um cliente n for passado
    const [idade, setIdade] = useState(props.cliente?.idade ?? '0')
    return (
        <div>
            {id? (
                <Entrada 
                    somenteLeitura
                    texto="Código" 
                    valor={id}
                    className="mb-5"
                />
            ): false}
                <Entrada   
                    texto="Nome" 
                    valor={nome}
                    valorMudou={setNome}
                    className="mb-5"
                />
                <Entrada texto="Idade"
                    tipo="number"
                    valor={idade}
                    valorMudou={setIdade}
                />
                    <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2"
                    onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                    <Botao onClick={props.cancelado}>
                        Cancelar
                    </Botao>
                </div>
        </div>
    )
}