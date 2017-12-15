import * as React from "react";

interface TabState{
    activeTab  :number,
    tabs :TabElement[]
}

interface TabProps{
    isActive: boolean,
    title: string,
    onActiveTab: ((event: React.MouseEvent<HTMLAnchorElement>) => void) | undefined
}

type TabElement = {
    title: string,
    index: number
}

export class Tab extends React.Component<TabProps>{
    constructor(props: TabProps){
        super(props);
    }

    render(){
        return  <a className={ this.props.isActive ? "item active" : "item" }
                   onClick={this.props.onActiveTab}>
                    {this.props.title}
                </a>
    }
}

interface TabsProps{

}

export class Tabs extends React.Component<TabsProps, TabState>{
    constructor(props : any){
        super(props);
        this.state={            
            activeTab: 0,
            tabs: [
                {title: "Conta", index: 0},
                {title: "Lançamentos", index: 1},
                {title: "Lançamentos2", index: 2}
            ]
        }
    }    

    isActive(tab: number){
        return this.state.activeTab == tab;
    }

    setActiveTab(tab: number){
        this.setState({activeTab: tab});
    }

    renderTab(){
        return this.state.tabs.map((tab)=>{
            return (
                    <Tab
                    isActive={this.isActive(tab.index)}
                    title={tab.title} 
                    key={tab.index}
                    onActiveTab={this.setActiveTab.bind(this, tab.index)}/>

            );
        })
    }

    render(){
        return (
            <div className="ui inverted">
            <div className="ui stackable   menu">
            <div className="header item">Conta Manager</div>
            {this.renderTab()}
            </div>  
            </div>          
        );
    }

    
}