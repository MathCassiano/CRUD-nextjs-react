export default class Cliente {
    // #: torna um objeto privado
    #id: string;
    #nome: string;
    #idade: number;

    constructor(nome: string, idade: number, id: string = null){
        this.#nome = nome;
        this.#idade = idade;
        this.#id = id;
    }
    //retornando um cliente vazio
    static vazio(){
        return new Cliente('', 0);
    }

    get id(){
        return this.#id;
    }
    get nome(){
        return this.#nome;
    }
    get idade(){
        return this.#idade;
    }

}