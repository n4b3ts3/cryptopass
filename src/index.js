import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CryPass from './App';

const elements = document.getElementsByTagName("CryptoPass");

for (let element of elements){
    let childrens = [];
    for(let child of element.children){
        child.classList.toggle("cp-input");
        childrens.push(child);
    }
    ReactDOM.render(
        <BrowserRouter basename=''>
            <CryPass lang={element.getAttribute("lang")} 
            prepend={element.getAttribute("prepend") || CryPass.defaultProps.prepend}
            to={element.getAttribute("to") || CryPass.defaultProps.to} 
            logoAlt={element.getAttribute("logoAlt") || CryPass.defaultProps.logoAlt} 
            logoSrc={element.getAttribute("logoSrc") || CryPass.defaultProps.logoSrc} 
            emailName={element.getAttribute("emailName") || CryPass.defaultProps.emailName}
            srcName={element.getAttribute("srcName") || CryPass.defaultProps.srcName} 
            dstName={element.getAttribute("dstName") || CryPass.defaultProps.dstName} 
            typeName={element.getAttribute("typeName") || CryPass.defaultProps.typeName}
            amountName={element.getAttribute("amountName") || CryPass.defaultProps.amountName}
            headers={CryPass.jsonify(element.getAttribute("headers")) || CryPass.defaultProps.headers} 
            classes={CryPass.jsonify(element.getAttribute("classes")) || CryPass.defaultProps.classes} 
            wallets={CryPass.jsonify(element.getAttribute("wallets")) || CryPass.defaultProps.wallets}
            onSubmit={eval(element.getAttribute("onSubmit")) || CryPass.defaultProps.onSubmit}
            onError={eval(element.getAttribute("onError")) || CryPass.defaultProps.onError}
            onReject={eval(element.getAttribute("onReject")) || CryPass.defaultProps.onReject}
            onAccept={eval(element.getAttribute("onAccept")) || CryPass.defaultProps.onAccept}
            >
            </CryPass>
        </BrowserRouter>,
        element
    );
    let form = element.querySelector("form");
    for(let i = 0; i < childrens.length; i++){
        element.getAttribute("prepend") !== undefined && element.getAttribute("prepend") !== null ?
            form.insertBefore(childrens[i], form.querySelector("input")):
            form.insertBefore(childrens[i], form.querySelector("div"));
    }
}