import React, { Component, FormEvent } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { VratiSveDokumenteSistema } from "../store/dokument/akcije"
import { IDokument } from "../store/dokument/tipovi";

interface KreirajAktivnostFormaDokumentaProps {
    dokumenti: Array<IDokument>,
    ulazni: Array<IDokument>,
    izlazni: Array<IDokument>,
    dodajDokument: (dokument: IDokument, ulazni: boolean) => void;
    obrisiDokument: (ulazni: boolean) => void;
}

interface KreirajAktivnostFormaDokumentaStanje {
    ulazniDokument: number,
    izlazniDokumet: number
}

type Props = KreirajAktivnostFormaDokumentaProps & KreirajAktivnostFormaDokumentaLinkStateProps;

class KreirajAktivnostFormaDokumenta extends Component<Props, KreirajAktivnostFormaDokumentaStanje> {

    state: Readonly<KreirajAktivnostFormaDokumentaStanje> = {
        ulazniDokument: 0,
        izlazniDokumet: 0
    }

    _obradiSelect(e: FormEvent<HTMLSelectElement>, ulaz: boolean) {
        let izabrani = parseInt(e.currentTarget.value);

        if (ulaz) {
            this.setState({ ulazniDokument:  izabrani})
            return;
        } else {
            this.setState({ izlazniDokumet: izabrani })
        }
    }

    _vratiVrednostZaTekst(dokumenti: Array<IDokument>): string {
        if (dokumenti && dokumenti.length > 0) {
            let finalni = "";

            dokumenti.forEach(d => {
                finalni += d.sifraDokumenta + " - " + d.naziv + "\n";
            });

            return finalni;
        }
        return "";
    }

    _dodajDokument(ulazni: boolean) {
        let {ulazniDokument, izlazniDokumet } = this.state;
        let ulaz = this._vratiUlazneDokumente()[ulazniDokument];
        let izlaz = this._vratiIzlazneDokumente()[izlazniDokumet];

        if (ulazni && ulaz)  {
            this.props.dodajDokument(ulaz, true);
        } else if (ulazni === false && izlaz) {
            this.props.dodajDokument(izlaz, false)
        }
    }

    _obrisiDokument(ulazi: boolean) {
        this.props.obrisiDokument(ulazi);
    }

    _vratiUlazneDokumente(): Array<IDokument> {
        let { dokumenti, ulazni } = this.props;

        return dokumenti.filter(e => {
            return ulazni.find(u => { return u.idDokumenta === e.idDokumenta }) === undefined;
        })
    }

    _vratiIzlazneDokumente(): Array<IDokument> {
        let { dokumenti, izlazni } = this.props;

        return dokumenti.filter(e => {
            return izlazni.find(i => { return i.idDokumenta === e.idDokumenta }) === undefined;
        })

    }

    render() {
        return (
            <div className="kreiraj-aktivnost-forma kreiraj-aktivnost-forma-dokumenta">
                <div className="forma-dokumenta forma-dokumenta-ulazi">
                    <label className="label-kreiraj">Изабери улазни документ:</label>
                    <form className="forma-dokumenti-izbor">
                        <select className="input-tekst input-kreiraj input-kreiraj-aktivnost input-kreiraj-aktivnost-select" name="ulazni" onChange={(e: FormEvent<HTMLSelectElement>) => this._obradiSelect(e, true)}>
                            {
                                this._vratiUlazneDokumente().map((e, i) => {
                                    return <option key={i} value={i}>{e.sifraDokumenta + " - " + e.naziv}</option>
                                })
                            }
                        </select>
                        <svg className="input" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajDokument(true)}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        <svg className="input svg-obrisi proces-obrisi-podproces" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._obrisiDokument(true)}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                        </svg>
                    </form>
                    <label className="label-kreiraj label-kreiraj-opis">Улазни документи:</label>
                    <textarea className="input-tekst input-kreiraj input-opis input-kreiraj-aktivnost tekst-kreiraj-aktinost" name="ulazi" disabled={true} value={this._vratiVrednostZaTekst(this.props.ulazni)} rows={4} cols={3} />
                </div>
                <div className="forma-dokumenta forma-dokumenta-izlazi">
                    <label className="label-kreiraj">Изабери излазни документ:</label>
                    <form className="forma-dokumenti-izbor">
                        <select className="input-tekst input-kreiraj input-kreiraj-aktivnost input-kreiraj-aktivnost-select" name="izlazi" onChange={(e: FormEvent<HTMLSelectElement>) => this._obradiSelect(e, false)}>
                            {
                                this._vratiIzlazneDokumente().map((e, i) => {
                                    return <option key={i} value={i}>{e.sifraDokumenta + " - " + e.naziv}</option>
                                })
                            }
                        </select>
                        <svg className="input" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajDokument(false)}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        <svg className="input svg-obrisi proces-obrisi-podproces" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._obrisiDokument(false)}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                        </svg>
                    </form>
                    <label className="label-kreiraj label-kreiraj-opis">Излазни документи:</label>
                    <textarea className="input-tekst input-kreiraj input-opis input-kreiraj-aktivnost tekst-kreiraj-aktinost" name="izlazi" disabled={true} value={this._vratiVrednostZaTekst(this.props.izlazni)} rows={4} cols={3} />
                </div>
            </div>
        )
    }
}

interface KreirajAktivnostFormaDokumentaLinkStateProps {
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajAktivnostFormaDokumentaProps): KreirajAktivnostFormaDokumentaLinkStateProps => ({

});

export default connect(mapStateToProps)(KreirajAktivnostFormaDokumenta);