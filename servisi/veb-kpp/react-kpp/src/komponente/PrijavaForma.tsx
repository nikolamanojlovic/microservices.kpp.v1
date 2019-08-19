import React, { FormEvent } from "react";
import { PrijavaFunkcija } from "../store/korisnik/akcije";
import logo from "../resursi/logo.svg";
import { IPoruka } from "../store/poruke/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { Poruka } from "./Poruka";
import { ObrisiPoruku } from "../store/poruke/akcije";

interface PrijavaFormaProps {
}

interface PrijavaFormaStanje {
    korisnickoIme: string,
    sifra: string,
}

type Props = PrijavaFormaProps & PrijavaFormaLinkStateProps;

class PrijavaForma extends React.Component<Props, PrijavaFormaStanje> {

    state: Readonly<PrijavaFormaStanje> = {
        korisnickoIme: "ИД",
        sifra: "Шифра"
    };

    _obradiPromenu(e: FormEvent<HTMLInputElement>) {
        ObrisiPoruku();
        this.setState({ ...this.state, [e.currentTarget.name]: e.currentTarget.value })
    }

    _prijavaKorisnika(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        ObrisiPoruku();
        PrijavaFunkcija(this.state);
    }

    render() {
        const { korisnickoIme, sifra } = this.state;
        const { poruka } = this.props;

        return (
            <div className="forma-prijava-div">
                <img className="forma-logo" src={logo} alt="KPP Logo" />
                <form className="forma-prijava" onSubmit={(e: React.FormEvent<HTMLFormElement>) => this._prijavaKorisnika(e)}>
                    <input className="input-tekst" name="korisnickoIme" type="text" placeholder={korisnickoIme} onChange={(e: React.FormEvent<HTMLInputElement>) => this._obradiPromenu(e)} />
                    <input className="input-tekst" name="sifra" type="password" placeholder={sifra} onChange={(e: React.FormEvent<HTMLInputElement>) => this._obradiPromenu(e)} />
                    <input className="input-dugme" type="submit" value="ПРИЈАВИ СЕ" />
                </form>
                <Poruka poruka={poruka}/>
            </div>
        )
    }
}

interface PrijavaFormaLinkStateProps {
    poruka?: IPoruka
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: PrijavaFormaProps): PrijavaFormaLinkStateProps => ({
    poruka: state.porukaReducer.poruka
});

export default connect(mapStateToProps)(PrijavaForma);