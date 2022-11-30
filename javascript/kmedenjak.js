/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", pravokutnikPomoc);
function pravokutnikPomoc() {
    var platno = document.getElementById("pravokutnik");
    var platno2 = document.getElementById("pravokutnik2");
    var platno3 = document.getElementById("pravokutnik3");
    var platno4 = document.getElementById("pravokutnik4");

    var sadrzaj = platno.getContext("2d");
    var sadrzaj2 = platno2.getContext("2d");
    var sadrzaj3 = platno3.getContext("2d");
    var sadrzaj4 = platno4.getContext("2d");
    platno.hidden = false;
    platno2.hidden = true;
    platno3.hidden = true;
    platno4.hidden = true;
    platno.style.top = "30%";
    platno.style.left = "40%";
    sadrzaj.beginPath();
    sadrzaj.rect(0, 0, 400, 40);
    sadrzaj.font = '15px Arial';
    sadrzaj.shadowOffsetX = 20;
    sadrzaj.fillText('U obrascu popunjavate dolje tražene podatke', 20, 25);
    sadrzaj.stroke();
    platno.addEventListener("click", function ()
    {
        platno.hidden = true;
        platno2.hidden = false;
        platno3.hidden = true;
        platno4.hidden = true;
        sadrzaj2.clearRect(0, 0, platno.width, platno.height);
        platno2.style.width = "400px";
        platno2.style.height = "40px";
        platno2.style.top = "52%";
        platno2.style.left = "60%";
        sadrzaj2.beginPath();
        sadrzaj2.font = '15px Arial';
        sadrzaj2.fillText('Format datuma: dd.mm.gggg.', 20, 25);
        sadrzaj2.stroke();
        platno2.addEventListener("click", function ()
        {
            platno.hidden = true;
            platno2.hidden = true;
            platno3.hidden = false;
            platno4.hidden = true;
            sadrzaj3.clearRect(0, 0, platno.width, platno.height);
            platno3.style.width = "400px";
            platno3.style.height = "40px";
            platno3.style.top = "63%";
            platno3.style.left = "60%";
            sadrzaj3.beginPath();
            sadrzaj3.font = '15px Arial';
            sadrzaj3.fillText('Format telefona: +(385)99123456', 20, 25);
            sadrzaj3.stroke();
            platno3.addEventListener("click", function ()
            {
                platno.hidden = true;
                platno2.hidden = true;
                platno3.hidden = true;
                platno4.hidden = false;
                sadrzaj4.clearRect(0, 0, platno.width, platno.height);
                platno4.style.width = "400px";
                platno4.style.height = "40px";
                platno4.style.top = "125%";
                platno4.style.left = "60%";
                sadrzaj4.beginPath();
                sadrzaj4.font = '15px Arial';
                sadrzaj4.fillText('Morate odabrati najmanje dvije opcije od ponuđenog.', 20, 25);
                sadrzaj4.stroke();
                platno4.addEventListener("click", function () {
                    platno.hidden = true;
                    platno2.hidden = true;
                    platno3.hidden = true;
                    platno4.hidden = true;
                });
            });
        });
    });

}

window.addEventListener("keyup", provjeraDatuma);
function provjeraDatuma()
{
    var datum = document.getElementById("datum");
    var labelaDatum = document.getElementById("labela");
    var provjera = false;
    if (datum.value[0] <= 3 && datum.value[1] <= 9 && datum.value[2] === "." && datum.value[3] <= 1 && datum.value[4] <= 9 && datum.value[5] === "."
        && datum.value[6] <= 9 && datum.value[7] <= 9 && datum.value[8] <= 9 && datum.value[9] <= 9 && datum.value[10] === ".")
    {
        provjera = true;
    }
    if (!provjera)
    {
        labelaDatum.innerHTML = "* Datum:";
        labelaDatum.style.color = "red";
    } else {
        labelaDatum.innerHTML = "Datum:";
        labelaDatum.style.color = "green";
    }
    return provjera;
}

window.addEventListener("load", provjeraUnesenihPodataka);
function provjeraUnesenihPodataka()
{
    var gumb = document.getElementById("gumbPosalji");

    var labelaVrijeme = document.getElementById("labela1");
    var labelaMin = document.getElementById("labela2");

    document.getElementById("datum").addEventListener("keyup", provjeraDatuma);

    gumb.addEventListener("click", function (event) {

        if (!(provjeraVrijeme()))
        {
            labelaVrijeme.innerHTML = "* Vrijeme:";
            labelaVrijeme.style.color = "red";
            event.preventDefault();
        } else
        {
            labelaVrijeme.innerHTML = "Vrijeme:";
            labelaVrijeme.style.color = "green";
        }

        if (!provjeraMinUnesenih())
        {
            labelaMin.innerHTML = "* Odaberite koje dodatke želite na rođendanu:";
            labelaMin.style.color = "red";
            event.preventDefault();
        } else
        {
            labelaMin.innerHTML = "Odaberite koje dodatke želite na rođendanu:";
            labelaMin.style.color = "green";
        }
    });
}


window.addEventListener("load", pojavaZvijezdica);
function pojavaZvijezdica()
{
    var labela3 = document.getElementById("labela3");
    var labela4 = document.getElementById("labela4");
    var labela5 = document.getElementById("labela5");
    var labela6 = document.getElementById("labela6");

    var gumb = document.getElementById("gumbPosalji");

    var radioButton = document.querySelectorAll('input[name="rodendan"]');
    var selektiranaVrijednost;

    gumb.addEventListener("click", function (event) {

        if (!provjeraTel())
        {
            labela3.innerHTML = "* Telefonski broj:";
            labela3.style.color = "red";
            event.preventDefault();
        } else
        {
            labela3.innerHTML = "Telefonski broj:";
            labela3.style.color = "green";
        }

        var odabrano = false;
        for (var rb of radioButton)
        {
            if (rb.checked)
            {
                odabrano = true;
                selektiranaVrijednost = radioButton.value;

                break;
            } else
            {
                odabrano = false;
            }
        }
        if (odabrano)
        {
            labela4.innerHTML = "Odaberite grupu:";
            labela4.style.color = "green";
        } else
        {
            labela4.innerHTML = "* Odaberite grupu:";
            labela4.style.color = "red";
            event.preventDefault();
        }

        if (!provjeraUrl())
        {
            labela6.innerHTML = "* Stavite link ako želite nešto slično:";
            labela6.style.color = "red";
            event.preventDefault();
        } else
        {
            labela6.innerHTML = "Stavite link ako želite nešto slično:";
            labela6.style.color = "green";
        }

        if (!provjeraText())
        {
            labela5.innerHTML = "* Napišite ako želite neku dodatnu pogodnost:";
            labela5.style.color = "red";
            event.preventDefault();
        } else
        {
            labela5.innerHTML = "Napišite ako želite neku dodatnu pogodnost:";
            labela5.style.color = "green";
        }

    });
}



window.addEventListener("load", popUp);
function popUp()
{
    var gumb = document.getElementById("gumbPosalji");
    gumb.addEventListener("click", function ()
    {
        if (!(provjeraVrijeme() && provjeraDatuma() && provjeraMinUnesenih()) === true)
        {
            if (confirm("Trebate li pomoć?") === true)
            {
                pravokutnikPomoc();
            }
            console.log((provjeraVrijeme() && provjeraDatuma() && provjeraMinUnesenih()));
        }
    });
}

window.addEventListener("load", provjeraMinUnesenih);
function provjeraMinUnesenih()
{
    var odabrani = document.getElementById("odabirDodataka");
    var lista = odabrani.selectedOptions;
    var j = 0;
    for (i = 0; i < lista.length; i++)
    {
        j++;
    }
    if (j < 2)
    {
        return false;
    } else
    {
        return true;
    }
}

window.addEventListener("load", provjeraVrijeme);
function provjeraVrijeme()
{
    var vrijeme = document.getElementById("vrijeme");
    if (vrijeme.value.length === 0)
    {
        return false;
    } else
    {
        return true;
    }
}


window.addEventListener("load", provjeraText);
function provjeraText()
{
    var textarea = document.getElementById("dodatniOpis");
    if (textarea.value === "")
    {
        return false;
    } else
    {
        return true;
    }
}

window.addEventListener("load", provjeraUrl);
function provjeraUrl()
{
    var url = document.getElementById("urlStranice").value;
    if (url !== "") {
        if (url.startsWith("http://") || url.startsWith("https://"))
        {
            return true;
        }
    } else
    {
        return false;
    }
}

window.addEventListener("load", provjeraTel);
function provjeraTel()
{
    var telefonskiBroj = document.getElementById("telefonskiBroj").value;
    if (telefonskiBroj.length === "" || telefonskiBroj.length <= 14)
    {
        if (telefonskiBroj.startsWith("+") || telefonskiBroj.startsWith("00"))
        {
            return true;
        }
    } else
    {
        return false;
    }
}

window.addEventListener("load", zamjena);
function zamjena()
{
    var ikona = document.getElementById("ikonaTeme");
    var tema = document.getElementById("prvaTema");

    ikona.addEventListener("click", function ()
    {
        if (tema.getAttribute("href") === "../css/kmedenjak.css")
        {

            tema.href = "../css/kmedenjak_accesibility.css";
        } else
        {
            tema.href = "../css/kmedenjak.css";
        }
    });
}




