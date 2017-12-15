import * as React from "react";
import { ReactElement } from "react";
import {Transacao, eTipoTransacao, Item} from "./componentes";
import Lancamentos from "./lancamentos";
import {ToastContainer, toast} from 'react-toastify';

interface LancamentoDeValoresState{
    transacoes: Transacao[],
    transacaoAtual: Transacao

}



interface LancamentoDeValoresProps{
    contas: Item[]
}

export default class LancamentoDeValores extends React.Component<LancamentoDeValoresProps, LancamentoDeValoresState>{

    constructor(props: LancamentoDeValoresProps){
        super(props);     
        
        var transacaoAtual = {
            operacao: {
                codigo: eTipoTransacao.credito, 
                descricao: "Crédito"
            },
            banco: {
                codigo: 1, 
                descricao: "Banco do Brasil"
            },
            valor: 0
        }

        this.state = {transacoes : [], transacaoAtual: transacaoAtual };
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    notifyOperacaoRealizada(){
        toast.success(`${this.state.transacaoAtual.operacao.descricao} de ${this.state.transacaoAtual.valor} no banco ${this.state.transacaoAtual.banco.descricao}`);
    }

    notifyErroValorZero(){
        toast.error("Não é possível inserir valor zero!")
    }

    handleClickButton(e: any){
        e.preventDefault();        
   
        if(this.state.transacaoAtual.valor == 0){
            this.notifyErroValorZero();
        } else{
            var arrayVar = this.state.transacoes.slice();
            arrayVar.push(this.state.transacaoAtual);

            this.setState({transacoes: arrayVar});

            this.notifyOperacaoRealizada();

            this.setState(prevState => ({ 
                transacaoAtual: {
                    ...prevState.transacaoAtual,
                    valor: 0
            }}));
        }      
    }

    handleKeyDown(e: any){
        if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8)) {
            return false;
        }
    }

    handleChangeInput(event: any){
        var stateCopy = Object.assign({}, this.state);
        stateCopy.transacaoAtual.valor = event.target.value;
        this.setState(stateCopy);
    }

    handleChangeSelect(event : any){
        var item = {
            codigo: event.target.value,
            descricao: event.target.options[event.target.selectedIndex].textContent
        };

        var stateCopy = Object.assign({}, this.state);
        if(event.target.name == "operacao"){
            stateCopy.transacaoAtual.operacao = item;
        } else{
            stateCopy.transacaoAtual.banco = item;
        }        

        this.setState(stateCopy);
    }

    render(){
        return(
            <section>
                <ToastContainer/>
                <form className="ui form">
                    <h1 className="ui header">Lançamento de valores</h1>
                    <div className="field">
                        
                        <div className="four fields">
                        <div className="field">
                            <label>Banco</label>
                            <select value={this.state.transacaoAtual.banco.codigo} name="banco" onChange={this.handleChangeSelect} className="ui compact selection dropdown">
                                {this.props.contas.map(item=>(
                                    <option key={item.codigo} value={item.codigo}>{item.descricao}</option>
                                ))}   
                            </select>
                        </div>
                        <div className="field">
                            <label>Valor</label>
                            <input 
                                type="number"
                                min="0.00" 
                                max="10000.00" 
                                step="0.01" 
                                placeholder="Valor" 
                                value={this.state.transacaoAtual.valor} 
                                onChange={this.handleChangeInput}
                                onKeyDown={this.handleKeyDown}/>
                        </div>
                        <div className="field">
                            <label>Operação</label>
                            <select value={this.state.transacaoAtual.operacao.codigo} name="operacao" onChange={this.handleChangeSelect} className="ui compact selection dropdown">     
                                <option value={eTipoTransacao.credito}>Crédito</option>
                                <option value={eTipoTransacao.debito}>Débito</option>
                            </select>
                        </div>
                        
                        </div>
                    </div>
                    <button className="ui primary button" onClick={this.handleClickButton}>
                        Adicionar
                        </button>
                </form>
                <div>
                    <Lancamentos transacoes={this.state.transacoes}/>
                </div>
            </section>
        )
    }
}