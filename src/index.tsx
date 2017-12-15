import * as React from "react";
import * as ReactDOM from "react-dom";
import {Tabs} from "./tabs";
import LancamentoDeValores from "./lancamentoDeValores";

interface AppProps{
    
}

let contas = [
    {codigo: 1, descricao: "Banco do Brasil"},
    {codigo: 2, descricao: "Caixa Econômica"}
]

localStorage.setItem("contas", JSON.stringify(contas));

export default class App extends React.Component<AppProps>{
    render(){
        var contasSalvas = localStorage.getItem("contas");
        var listaContas = contasSalvas == null ? [] : JSON.parse(contasSalvas);

        return (<div >
                    <Tabs/>
                    <div className="ui main container">
                        <LancamentoDeValores contas={listaContas}/>
                    </div>
                </div>
            )
    }
}


    ReactDOM.render(<App>text</App>, document.getElementById("app"));




