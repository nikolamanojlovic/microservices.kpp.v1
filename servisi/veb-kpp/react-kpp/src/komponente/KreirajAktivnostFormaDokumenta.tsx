import React, { Component } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { TIP_PROCESA } from "../pomocnici/Konstante";
import { VratiSveDokumenteSistema } from "../store/dokument/akcije"
import { IDokument } from "../store/dokument/tipovi";

interface KreirajAktivnostFormaDokumentaProps {

}

type Props = KreirajAktivnostFormaDokumentaProps & KreirajAktivnostFormaDokumentaLinkStateProps;

class KreirajAktivnostFormaDokumenta extends Component<Props> {

    UNSAFE_componentWillMount() {
        console.log("fewfew")
        VratiSveDokumenteSistema();
    }

    render() {
        return (
            <div className="kreiraj-aktivnost-forma kreiraj-aktivnost-forma-dokumenta">
                <div className="forma-dokumenta forma-dokumenta-ulazi">
                    <label className="label-kreiraj">Изабери улазни документ:</label>
                    <form className="forma-dokumenti-izbor">
                        <select className="input-tekst input-kreiraj input-kreiraj-aktivnost input-kreiraj-aktivnost-select" name="ulazni">
                            {
                                this.props.dokumenti.map((e, i) => {
                                    return <option key={i} value={i}>{e.sifraDokumenta + " - " + e.naziv}</option>
                                })
                            }
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                    </form>
                    <label className="label-kreiraj label-kreiraj-opis">Улазни документи:</label>
                    <textarea className="input-tekst input-kreiraj input-opis input-kreiraj-aktivnost" name="ulazi" disabled={true} rows={4} cols={3} />
                </div>
                <div className="forma-dokumenta forma-dokumenta-izlazi">
                    <label className="label-kreiraj">Изабери излазни документ:</label>
                    <form className="forma-dokumenti-izbor">
                        <select className="input-tekst input-kreiraj input-kreiraj-aktivnost input-kreiraj-aktivnost-select" name="izlazi">
                            {
                                this.props.dokumenti.map((e, i) => {
                                    return <option key={i} value={i}>{e.sifraDokumenta + " - " + e.naziv}</option>
                                })
                            }
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                    </form>
                    <label className="label-kreiraj label-kreiraj-opis">Излазни документи:</label>
                    <textarea className="input-tekst input-kreiraj input-opis input-kreiraj-aktivnost" name="izlazi" disabled={true} rows={4} cols={3} />
                </div>
            </div>
        )
    }
}

interface KreirajAktivnostFormaDokumentaLinkStateProps {
    dokumenti: Array<IDokument>
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajAktivnostFormaDokumentaProps): KreirajAktivnostFormaDokumentaLinkStateProps => ({
    dokumenti: state.dokumentReducer.dokumenti
});

export default connect(mapStateToProps)(KreirajAktivnostFormaDokumenta);