import React, { createRef } from 'react';
import './App.scss';
/**
 * author: Esteban Chacon Martin
 * title: CryptoPass
 * owner: Luis Miguel
 * enterprise: GoDjango
 * copyright: All rights reserved
 * license: Propetary
 * documentation:
 *  languages supported: english (default), spanish
 *  classes in elements:
 *   * cp-form for the formulary with the data
 *   * cp-logo for the logo of cryptopass
 *   * cp-input for each input of the form
 *   * Additionally you can add your owns inputs and elements along with the existents ones...
 */


export default class CryPass extends React.Component{
    constructor(props){
        super(props);
        this.appRef = createRef();
        this.dstRef = createRef();

        this.state = {
            currentLanguage: this.props.lang?this.props.lang:"english"
        }
        console.log(props);
    }

    static jsonify(variable){
        let success = true;
        while(variable && variable.indexOf !== undefined && variable.indexOf("'") >= 0){
            variable = variable.replace("'", '"');
        }
        return success?JSON.parse(variable): undefined;
    }

    submit(payload){
        console.log(payload);
        this.props.onSubmit(payload);
        fetch(this.props.to, {
            method: "post",
            headers: JSON.stringify(this.props.headers),
            body: JSON.stringify(payload),
        }).then((response)=>{
            console.log("accepted...")
            this.props.onAccept(response);
        }, (reason)=>{
            console.log("rejected...");
            this.props.onReject(reason);
        }).catch((error)=>{
            console.log("error...")
            this.props.onError(error);
        });
    }
    render(){
        return <form ref={this.appRef} method='post' action='' 
            className={'cp-form'.concat(this.props.className?" " + this.props.className: "")}
            onSubmit={(event)=>{
                event.preventDefault();
                let payload = {};
                for (let el of this.appRef.current.getElementsByTagName("input")){
                    if(el.type !== "submit" && el.type !== "reset")
                        payload[el.name] = el.value;
                }
                this.submit(payload);
                }
            }
            onReset={()=>this.props.onReset()}
            >
                <img className={'cp-logo'.concat(this.props.logoClass?" "+this.props.logoClass:"")}
                    src={this.props.logoSrc} alt={this.props.logoAlt}></img>
                <input className={'cp-input'.concat(this.props.srcClass?" "+this.props.srcClass:"")}
                    name={this.props.srcName} type={this.props.srcType} 
                    placeholder={this.props.languages[this.state.currentLanguage].srcPlaceholder}
                    ></input>
                <input ref={this.dstRef} className={'cp-input'.concat(this.props.dstClass?" "+this.props.dstClass:"")}
                    name={this.props.dstName} type={"text"} 
                    placeholder={this.props.languages[this.state.currentLanguage].dstPlaceholder}
                    readOnly onClick={()=>navigator.clipboard.writeText(this.dstRef.current.value)}
                    value={Object.values(this.props.wallets||CryPass.defaultProps.wallets)[0]}
                    ></input>
                <select name={this.props.typeName} onChange={(event)=>{
                    this.dstRef.current.value = this.props.wallets?this.props.wallets[event.currentTarget.value]:"";
                }}
                    className={'cp-input'.concat(this.props.typeClass?" "+this.props.typeClass:"")}>
                        {Object.keys(this.props.wallets||CryPass.defaultProps.wallets).map((walletType, index)=>{
                            return <option key={index}>{walletType}</option>;
                        })}
                </select>
                <input className={'cp-input'.concat(this.props.emailClass?" "+this.props.emailClass:"")}
                    name={this.props.emailName} type={"email"} 
                    placeholder={this.props.languages[this.state.currentLanguage].emailPlaceholder}></input>
                <input className={'cp-input'.concat(this.props.amountClass?" "+this.props.amountClass:"")}
                    name={this.props.amountName} type={"number"} min={0} placeholder={0.0}></input>
                <div hidden={this.props.hideActionB} className={'cp-action-container'.concat(this.props.acInRow?" cp-ac-row":"")}>
                    <input className={'cp-input'.concat(this.props.submitClass?" "+this.props.submitClass:"")}
                        name={this.props.submitName} type={"submit"} 
                        value={this.props.languages[this.state.currentLanguage].submitValue}></input>
                    <input className={'cp-input'.concat(this.props.resetClass?" "+this.props.resetClass:"")}
                        name={this.props.resetName} type={"reset"} 
                        value={this.props.languages[this.state.currentLanguage].resetValue}
                        onClick={(event) => {
                            event.preventDefault();
                            for (let i of this.appRef.current.children){
                                if (i.type !== "submit" && i.type !== "reset" && i.readOnly === false)
                                    i.value = "";
                            }
                        }}></input>
                </div>
            </form>;
    }
}
CryPass.defaultProps  = {
    to: null,
    logoAlt: "CryptoPass",
    logoSrc: "",
    emailName: "email",
    srcName: "src",
    dstName: "dst",
    typeName: "type",
    amountName: "amount",
    headers: {},
    classes: {},
    prepend: false,
    wallets: {},
    acInRow: false,
    hideActionB: false,
    onSubmit: ()=>{},
    onError: ()=>{},
    onReject: ()=>{},
    onAccept: ()=>{},
    languages: {
        english: {
            srcPlaceholder: "Your address",
            emailPlaceholder: "email@server.com",
            resetValue: "Clean",
            submitValue: "Buy"
        },
        spanish: {
            srcPlaceholder: "Tu dirección",
            emailPlaceholder: "correo@servidor.com",
            resetValue: "Limpiar",
            submitValue: "Comprar"
        },
        japanese: {
            srcPlaceholder: "あなたの住所",
            emailPlaceholder: "電子メール",
            resetValue: "綺麗",
            submitValue: "買う"
        },
        chinese: {
            srcPlaceholder: "您的地址",
            emailPlaceholder: "电子邮件",
            resetValue: "干净",
            submitValue: "买"
        }
    }
}