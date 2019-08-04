import React, { Component, FormEvent } from "react";
import { TIP_PROCESA } from "../pomocnici/Konstante";

interface ProcesFormaProps {
}

interface ProcesFormaStanje {
    naziv: string,
    kategorija: string,
    opis: string
}

type Props = ProcesFormaProps;

export class ProcesForma extends Component<Props, ProcesFormaStanje> {

    _sacuvajProces = (e : FormEvent<any>) => {
        e.preventDefault();
    }

    render() {
        return (
            <form className="forma-proces">
                <div className="forma-proces-naziv-kategorija">
                    <label className="input-naziv-kategorija-opis">
                        <label className="label-kreiraj">Назив процеса:</label>
                        <input className="input-tekst input-kreiraj" name="naziv" type="text" />
                    </label>
                    <label className="input-naziv-kategorija-opis">
                        <label className="label-kreiraj">Категорија процеса:</label>
                        <select className="input-tekst input-kreiraj" name="kategorija">
                            {
                                TIP_PROCESA.map(function (e, i) {
                                    return <option value={i}>{e}</option>
                                })
                            }
                        </select>
                    </label>
                </div>
                <div className="forma-proces-opis">
                    <label className="input-naziv-kategorija-opis">
                        <label className="label-kreiraj label-kreiraj-opis">Опис процеса:</label>
                        <textarea className="input-tekst input-kreiraj input-opis" name="opis" rows={4} cols={3}/>
                    </label>
                </div>
                <div>
                    <input className="input-dugme input-kreiraj-sacuvaj" type="button" value="Сачувај" onClick={(e : FormEvent<any>) => this._sacuvajProces(e)}/>
                </div>
            </form>
        )
    }
}

export default ProcesForma;
