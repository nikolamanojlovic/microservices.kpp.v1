import React from "react";

export class PrijavaForma extends React.Component {

    render() {
        return(
            <div>
                <form>
                    <input className="input-tekst" type="text"/>
                    <input className="input-tekst" type="text"/>
                    <input className="input-dugme" type="button" value="Пријави се"/>
                </form>
            </div>
        )
    }
}