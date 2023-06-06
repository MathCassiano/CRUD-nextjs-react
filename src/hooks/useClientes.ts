import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";
import { useState } from "react";
import ColecaoCliente from "../backend/ColecaoCliente";
import { useEffect } from "react";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes (){
    
  const repo: ClienteRepositorio = new ColecaoCliente();

   const { tabelaVisivel, formularioVisivel, exibirTabela, exibirFormulario } = useTabelaOuForm();

  //esse cliente é o cliente selecionado / armazenar do tipo cliente
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  
  
  //vai chamar automaticamente na inicialização do componente
  useEffect(obterTodos, [])

  function obterTodos(){
    //quando receber os clientes
    repo.obterTodos().then(clientes => {
        setClientes(clientes);
        exibirTabela();
    });
  }

  function selecionarCliente(cliente: Cliente){
      setCliente(cliente);
      exibirFormulario();
  }
  function novoCliente(){
    setCliente(Cliente.vazio());
    exibirFormulario();
}

 async function excluirCliente(cliente: Cliente){
    await repo.excluir(cliente);
     obterTodos();
  }
  
 async function salvarCliente(cliente: Cliente){
   await repo.salvar(cliente);
   //vai obter todos, setar os clientes e colocar a tabela visivel automaticamente
      obterTodos();
  }

  return {
    cliente, 
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    tabelaVisivel,
    exibirTabela,
  }
}