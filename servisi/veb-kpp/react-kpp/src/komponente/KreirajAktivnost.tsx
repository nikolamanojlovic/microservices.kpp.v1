import React, { Component } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import KreirajAktivnostForma from "./KreirajAktivnostForma";
import KreirajAktivnostFormaDokumenta from "./KreirajAktivnostFormaDokumenta";
import { IDokument } from "../store/dokument/tipovi";
import { SacuvajAktivnost } from "../store/proces/akcije";
import { VratiSveDokumenteSistema } from "../store/dokument/akcije";

interface KreirajAktivnostProps {

}

interface KreirajAktivnostiStanje {
    onemoguciCuvanje: boolean,
    naziv: string,
    opis: string,
    ulaznaDokumenta: Array<IDokument>,
    izlaznaDokumenta: Array<IDokument>
}

type Props = KreirajAktivnostProps & KreirajAktivnostLinkStateProps;

class KreirajAktivnost extends Component<Props, KreirajAktivnostiStanje> {

    state: KreirajAktivnostiStanje = {
        onemoguciCuvanje: true,
        naziv: "",
        opis: "",
        ulaznaDokumenta: [],
        izlaznaDokumenta: []
    }

    async UNSAFE_componentWillMount() {
        await VratiSveDokumenteSistema();
    }

    _postaviNaziv = (naziv: string) => {
        this.setState({ naziv: naziv });
        naziv === "" ? this.setState({ onemoguciCuvanje: true }) : this.setState({ onemoguciCuvanje: false });
    }

    _postaviOpis = (opis: string) => {
        this.setState({ opis: opis })
    }

    _dodajDokument = (dokument: IDokument, ulazni: boolean) => {
        if (ulazni) {
            this.setState({ ulaznaDokumenta: this.state.ulaznaDokumenta.concat(dokument) })
        } else {
            this.setState({ izlaznaDokumenta: this.state.izlaznaDokumenta.concat(dokument) })
        }
    }

    _obrisiDokument = (ulazni: boolean) => {
        if (ulazni) {
            let { ulaznaDokumenta } = this.state;
            this.setState({ ulaznaDokumenta: ulaznaDokumenta.slice(0, ulaznaDokumenta.length - 1) })
        } else {
            let { izlaznaDokumenta } = this.state;
            this.setState({ izlaznaDokumenta: izlaznaDokumenta.slice(0, izlaznaDokumenta.length - 1) })
        }
    }

    _sacuvajAktivnost() {
        let {naziv, opis, ulaznaDokumenta, izlaznaDokumenta} = this.state;
        SacuvajAktivnost({naziv: naziv, opis: opis, ulazniDokumenti: ulaznaDokumenta, izlazniDokumenti: izlaznaDokumenta});
        this.setState({onemoguciCuvanje: true, naziv: "", opis: "", ulaznaDokumenta: [], izlaznaDokumenta: []});
    }

    render() {
        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Активност</h1>
                    <Poruka poruka={this.props.poruka} />
                    <KreirajAktivnostForma naziv={this.state.naziv} opis={this.state.opis} postaviNaziv={this._postaviNaziv} postaviOpis={this._postaviOpis} />
                </div>
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Улази и излази</h1>
                    <KreirajAktivnostFormaDokumenta dokumenti={this.props.dokumenti} ulazni={this.state.ulaznaDokumenta} izlazni={this.state.izlaznaDokumenta} dodajDokument={this._dodajDokument} obrisiDokument={this._obrisiDokument} />
                </div>
                {
                    this.state.onemoguciCuvanje ? <span /> :
                        <div className="input-sacuvaj-aktivnost">
                            <input className="input-dugme input-kreiraj-sacuvaj" type="button" value="Сачувај" onClick={() => this._sacuvajAktivnost()} />
                        </div>
                }
            </div>
        )
    }
}

interface KreirajAktivnostLinkStateProps {
    poruka?: IPoruka,
    dokumenti: Array<IDokument>
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajAktivnostProps): KreirajAktivnostLinkStateProps => ({
    poruka: state.porukaReducer.poruka,
    dokumenti: state.dokumentReducer.dokumenti
});

export default connect(mapStateToProps)(KreirajAktivnost);