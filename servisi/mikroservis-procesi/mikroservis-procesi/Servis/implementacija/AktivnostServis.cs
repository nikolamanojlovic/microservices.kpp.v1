﻿using System;
using System.Collections.Generic;
using mikroservisprocesi.Domen;
using mikroservisprocesi.OPP;

namespace mikroservisprocesi.Servis.implementacija
{
    public class AktivnostServis : IAktivnostServis
    {
        private IAktivnostOPP _aktivnostOPP;

        public AktivnostServis(IAktivnostOPP aktivnostOPP)
        {
            _aktivnostOPP = aktivnostOPP;
        }

        public Aktivnost VratiKrajnjuAktivnost()
        {
            return _aktivnostOPP.VratiKrajnjuAktivnost();
        }

        public Aktivnost VratiPocetnuAktivnost()
        {
            return _aktivnostOPP.VratiPocetnuAktivnost();
        }

        public List<Aktivnost> VratiSveAktivnosti()
        {
            return _aktivnostOPP.VratiSveAktivnostiSistema();
        }
    }
}
