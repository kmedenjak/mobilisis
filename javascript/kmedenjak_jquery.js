$(document).ready(function () {
    naslov = $(document).find("title").text();
    switch (naslov) {
        case "Početna stranica":
            $("#tablica1").dataTable();
            break;
        case "Registracija":

            window.addEventListener("keyup", datumVrijeme);
            function datumVrijeme()
            {
                var datumVrijeme = document.getElementById("datumVrijeme").value;
                var regEx = /^([1-9]|[12][0-9]|3[01])[.]([1-9]|1[012])[.](19\d{2}|[2-9][0-9]\d{2})[.]\s([1-2]?[0-9])[:]([1-5]?[0-9])$/;
                var regExAMPM = /^(19\d{2}|[2-9][0-9]\d{2})[/]([1-9]|[12][0-9]|3[01])[/]([1-9]|1[012])\s([1-9]|1[012])[:]([1-5]?[0-9])\s(AM|PM)$/
                if (regEx.test(datumVrijeme) === true || regExAMPM.test(datumVrijeme) === true)
                {
                    document.getElementById("datumVrijeme").style.borderColor = "green";
                } else
                {
                    document.getElementById("datumVrijeme").style.borderColor = "red";
                }
            }


            if (`${document.cookie}`.length !== 0)
            {
                var kolac = `${document.cookie}`.split(" ");
                var imeKorisnika = kolac[1];
                var prezimeKorisnika = kolac[3];
                var korisnickoIme = kolac[5];

                var ime = document.getElementById("ime");
                var prezime = document.getElementById("prezime");
                var korIme = document.getElementById("korisnickoIme");

                ime.value = imeKorisnika;
                ime.disabled = true;
                prezime.value = prezimeKorisnika;
                prezime.disabled = true;
                korIme.value = korisnickoIme;
                korIme.disabled = true;
                
                $.ajax({
                    url: 'http://barka.foi.hr/WebDiP/2020/materijali/zadace/dz3/korisnici.json',
                    type: 'GET',
                    datatype: 'json',
                    success: function (data){
                        $.each(data, function (key, korisIme){
                            var korisIme = $(this).attr("korisnicko_ime");
                            if(korisIme === korisnickoIme)
                            {
                                var lozinka = document.getElementById("lozinka");
                                var potvrdaLozinke = document.getElementById("potvrdaLozinke");
                                lozinka.value = $(this).attr("lozinka");
                                potvrdaLozinke.value = $(this).attr("lozinka");
                                lozinka.disabled = true;
                                potvrdaLozinke.disabled = true;
                            }
                            
                            
                        });
                    }
                });
                
            } else
            {
                var podaci = new Array();
                var ime = new Array();
                var prezime = new Array();
                $.getJSON("../json/imena.json",
                        function (data) {
                            $.each(data, function (key, val) {
                                podaci = val.split(" ");
                                for (var i = 0; i < podaci.length / 2; i++)
                                {
                                    ime.push(podaci[0]);
                                    prezime.push(podaci[1]);                             
                                }
                            });
                        });
                $('#ime').autocomplete({
                    source: ime
                });
                $('#prezime').autocomplete({
                    source:
                            prezime
                });
            }
            break;
        case "Galerija":
            $("#gumbSlike").click(function ()
            {
                $.ajax({
                    type: "GET",
                    url: "https://barka.foi.hr/WebDiP/2020/materijali/zadace/dz3/userNameSurname.php?all",
                    dataType: "xml",
                    success: function (xml)
                    {
                        var div = $("#galSlike");
                        $(xml).find('korisnik').each(function ()
                        {
                            var imePrezime = $(this).find("imePrezime").text();
                            if ($(this).find('slika').attr('url').split('/')[2] === "default.jpg")
                            {
                                div.append("<figure><img class='slike' src='multimedija/default.jpg' alt='slika'><figcaption>" + imePrezime + "</figcaption></figure>");
                            }
                        });
                    }
                });
            });

            $("#galSlike").on("click", "figure", function ()
            {
                var odabrani = this;
                var imeKorisnika = $(this).text().split(" ")[0];
                var prezimeKorisnika = $(this).text().split(" ")[1];
                $.ajax({
                    url: `https://barka.foi.hr/WebDiP/2020/materijali/zadace/dz3/userNameSurname.php?ime=${imeKorisnika}&prezime=${prezimeKorisnika}`,
                    type: 'GET',
                    dataType: 'xml',
                    success: function (data) {
                        var korisnickoIme = $(data).find("username").text();
                        var tipKorisnika = $(data).find("tip").text();

                        if (korisnickoIme === 0 && tipKorisnika === -1)
                        {
                            alert("Greška kod učitavanja!");
                        } else
                        {
                            document.cookie = "Ime: " + imeKorisnika + " prezime: " + prezimeKorisnika + " korisničkoIme: " + korisnickoIme + " tip: " + tipKorisnika;
                            $(odabrani).css('border-width', `${tipKorisnika * 2}px`);
                            $(odabrani).css('border-color', 'red');
                        }
                    }
                });
            });
            break;
        default:
            alert("Ne postoji ta stranica s tim naslovom");
            break;
    }
});


