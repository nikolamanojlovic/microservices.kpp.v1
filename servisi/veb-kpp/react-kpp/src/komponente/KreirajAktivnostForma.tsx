import React, { Component, FormEvent } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";

interface KreirajAktivnostFormaProps {
    naziv: string,
    opis: string
    postaviNaziv: (naziv: string) => void;
    postaviOpis: (opis: string) => void;
}

type Props = KreirajAktivnostFormaProps & KreirajAktivnostFormaLinkStateProps;

class KreirajAktivnostForma extends Component<Props> {

    _postaviNaziv(e: FormEvent<HTMLInputElement>) {
        this.props.postaviNaziv(e.currentTarget.value);
    }

    _postaviOpis (e: FormEvent<HTMLTextAreaElement>) {
        this.props.postaviOpis(e.currentTarget.value);
    }

    render() {
        return (
            <div className="kreiraj-aktivnost-forma">
                <label className="label-kreiraj">Назив активности:</label>
                <input className="input-tekst input-kreiraj input-kreiraj-aktivnost" name="naziv" type="text" value={this.props.naziv} onChange={(e: FormEvent<HTMLInputElement>) => this._postaviNaziv(e)}/>
                <label className="label-kreiraj label-kreiraj-opis">Опис процеса:</label>
                <textarea className="input-tekst input-kreiraj input-opis input-kreiraj-aktivnost" name="opis" value={this.props.opis} rows={4} cols={3} onChange={(e: FormEvent<HTMLTextAreaElement>) => this._postaviOpis(e)}/>
            </div>
        )
    }
}

interface KreirajAktivnostFormaLinkStateProps {
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajAktivnostFormaProps): KreirajAktivnostFormaLinkStateProps => ({
});

export default connect(mapStateToProps)(KreirajAktivnostForma);