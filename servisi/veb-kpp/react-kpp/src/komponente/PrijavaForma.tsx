import React from "react";

export class PrijavaForma extends React.Component {

    render() {
        return(
            <div className="forma-prijava-div">
                <form className="forma-prijava">
                    <input className="input-tekst" type="text" placeholder="ИД"/>
                    <input className="input-tekst" type="text" placeholder="Шифра"/>
                    <input className="input-dugme" type="button" value="ПРИЈАВИ СЕ"/>
                </form>
            </div>
        )
    }
}