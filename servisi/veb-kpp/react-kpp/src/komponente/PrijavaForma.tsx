import React, { FormEvent } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { PrijaviKorisnika } from "../store/korisnik/akcije";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AkcijeAplikacije } from "../store/konfiguracija";
import { bindActionCreators } from "redux";

interface PrijavaFormaProps {
}

interface PrijavaFormaStanje {
    korisnickoIme: string,
    sifra: string,
}

type Props = PrijavaFormaProps & PrijavaFormaLinkDispatchProps;

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
        console.log(this.state);
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

interface PrijavaFormaLinkDispatchProps {
    //prijaviKorisnika: ({ korisnickoIme, sifra } : { korisnickoIme: string, sifra : string}) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AkcijeAplikacije>, ownProps: PrijavaFormaProps) : PrijavaFormaLinkDispatchProps => ({
    prijaviKorisnika: bindActionCreators(PrijaviKorisnika, dispatch)
});

export default connect(null, mapDispatchToProps)(PrijavaForma);
