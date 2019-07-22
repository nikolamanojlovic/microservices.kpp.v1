import React, { FormEvent } from "react";
import { PrijavaFunkcija } from "../store/korisnik/akcije";

interface PrijavaFormaProps {
}

interface PrijavaFormaStanje {
    korisnickoIme: string,
    sifra: string,
}

type Props = PrijavaFormaProps;

export class PrijavaForma extends React.Component<Props, PrijavaFormaStanje> {

    state: Readonly<PrijavaFormaStanje> = {
        korisnickoIme: "ИД",
        sifra: "Шифра"
    };

    _obradiPromenu(e: FormEvent<HTMLInputElement>) {
        this.setState({...this.state, [e.currentTarget.name]: e.currentTarget.value})
    }

    _prijavaKorisnika(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        PrijavaFunkcija(this.state);
    }

    render() {
        const { korisnickoIme, sifra } = this.state;
        
        return(
            <div className="forma-prijava-div">
                <form className="forma-prijava" onSubmit={(e: React.FormEvent<HTMLFormElement>) => this._prijavaKorisnika(e)}>
                    <input className="input-tekst" name="korisnickoIme" type="text" placeholder={korisnickoIme} onChange={(e: React.FormEvent<HTMLInputElement>) => this._obradiPromenu(e)}/>
                    <input className="input-tekst" name="sifra" type="password" placeholder={sifra} onChange={(e: React.FormEvent<HTMLInputElement>) => this._obradiPromenu(e)}/>
                    <input className="input-dugme" type="submit" value="ПРИЈАВИ СЕ"/>
                </form>
            </div>
        )
    }
}

export default PrijavaForma;
