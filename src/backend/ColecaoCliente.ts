import firebase from "./db/config";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio{
   
    // converte uma classe para algo persistido no firestore, e eu recebo algo do firestore e converto para classe
    #conversor = {
        toFirestore(cliente: Cliente){
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions){
            const dados = snapshot.data(options)        
            return new Cliente(dados.nome, dados.idade, snapshot.id);        }
    }

    async salvar(cliente: Cliente): Promise<Cliente>{
       //se o cliente estiver setado, vou alterar:
        if(cliente?.id){
            await this.colecao().doc(cliente.id).set(cliente);
            return cliente;
        } else {
            //como estou adicionando, ele vai retornar um Docuement reference
            //adicionando na coleção
            const docRef = await this.colecao().add(cliente);
            //retornando o objeto já com o id setado pelo firebase
            const doc = await docRef.get();
            return doc.data();
        }

    }

    async excluir(cliente: Cliente): Promise<void> {
        //dentro da coleção de clientes eu posso acessar um cliente específico, que é um doc a partir do id dele, e chamo a função delete() pra excluir
        return this.colecao().doc(cliente.id).delete();
    }
    async obterTodos(): Promise<Cliente[]>{
       const query = await this.colecao().get();
       //pegando todos os documentos, fazendo o mapeamento e transformando para doc.data, que me retorna os clientes
       return query.docs.map(doc => doc.data()) ?? [];
    }

    private colecao(){
        return firebase
            .firestore().collection('clientes')
            .withConverter(this.#conversor)
    }
}
