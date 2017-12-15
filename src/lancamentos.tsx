import * as React from "react";
import {Transacao, eTipoTransacao} from "./componentes";



interface LancamentosProps{
    transacoes: Transacao[]
}

export default class Lancamentos extends React.Component<LancamentosProps>{

    render(){
        return (
            <table className="ui single line table">
                <thead>
                    <tr>
                    <th>Banco</th>
                    <th>Tipo de transação</th>
                    <th>Valor</th>                    
                    </tr>
                </thead>
                <tbody>
                {this.props.transacoes.map((x,y)=>(
                    <tr key={y}>
                        <td>
                            {x.banco.descricao}
                        </td>
                        <td>
                            {x.operacao.descricao }
                        </td>
                        <td>
                            {x.valor}
                        </td>
                    </tr>
                    ))
                }         
                </tbody>
                <tfoot>
                    <tr>
                    <th>Saldo</th>
                    <th></th>
                    <th>{                            
                            this.props.transacoes.map(x => x.valor).reduce((x,y)=> Number(x) + Number(y),0)
                        }</th>
                </tr></tfoot>
            </table>
        )
    }
}