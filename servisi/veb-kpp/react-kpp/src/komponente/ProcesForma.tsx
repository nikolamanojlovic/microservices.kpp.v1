import React, { Component, FormEvent } from "react";
import { TIP_PROCESA } from "../pomocnici/Konstante";
import { SacuvajProces } from "../store/proces/akcije";
import { IProces } from "../store/proces/tipovi";
import { ObrisiPoruku } from "../store/poruke/akcije";

interface ProcesFormaProps {
    proces?: IProces
}

interface ProcesFormaStanje {
    naziv: string,
    kategorija: number,
    opis: string
}

type Props = ProcesFormaProps;

export class ProcesForma extends Component<Props, ProcesFormaStanje> {

    state: Readonly<ProcesFormaStanje> = {
        naziv: this.props.proces ? this.props.proces.naziv : "",
        kategorija: this.props.proces ? TIP_PROCESA.findIndex(e => {return e === this.props.proces!.kategorija}) : 0,
        opis: this.props.proces ? this.props.proces.opis : "",
    };

    _sacuvajProces = (e: FormEvent<any>) => {
        e.preventDefault();
        ObrisiPoruku();
        const naziv = this.state.naziv;
        const kategorija = TIP_PROCESA[this.state.kategorija];
        const opis = this.state.opis;

        SacuvajProces({ naziv, kategorija, opis });
    }

    _obradiPromenu(e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        this.setState({ ...this.state, [e.currentTarget.name]: e.currentTarget.value })
    }

    render() {
        const onemoguciUnos = this.props.proces !== undefined;

        return (
            <form className="forma-proces">
                <div className="forma-proces-naziv-kategorija">
                    <label className="input-naziv-kategorija-opis">
                        <label className="label-kreiraj">Назив процеса:</label>
                        <input className="input-tekst input-kreiraj" name="naziv" type="text" value={this.state.naziv} disabled={onemoguciUnos} onChange={(e: FormEvent<HTMLInputElement>) => this._obradiPromenu(e)} />
                    </label>
                    <label className="input-naziv-kategorija-opis">
                        <label className="label-kreiraj">Категорија процеса:</label>
                        <select className="input-tekst input-kreiraj" name="kategorija" value={this.state.kategorija} disabled={onemoguciUnos} onChange={(e: FormEvent<HTMLSelectElement>) => this._obradiPromenu(e)}>
                            {
                                TIP_PROCESA.map(function (e, i) {
                                    return <option key={i} value={i}>{e}</option>
                                })
                            }
                        </select>
                    </label>
                </div>
                <div className="forma-proces-opis">
                    <label className="input-naziv-kategorija-opis">
                        <label className="label-kreiraj label-kreiraj-opis">Опис процеса:</label>
                        <textarea className="input-tekst input-kreiraj input-opis" name="opis" disabled={onemoguciUnos} rows={4} cols={3} value={this.state.opis} onChange={(e: FormEvent<HTMLTextAreaElement>) => this._obradiPromenu(e)} />
                    </label>
                </div>
                <div>
                    <input className={"input-dugme input-kreiraj-sacuvaj " + (onemoguciUnos ? "input-sakriveno" : "")} type="button" value="Сачувај" onClick={(e: FormEvent<any>) => this._sacuvajProces(e)} />
                </div>
            </form>
        )
    }
}

export default ProcesForma;
