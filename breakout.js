$('document').ready(function() {
    idbr = 0;
    dt = 20;
    gamefl = true;

    document.addEventListener("keydown", pritisak_gumba_down);
    document.addEventListener("keyup", pritisak_gumba_up);
    
    var xx = [33];
    var yy = [22];
    var xc = [0], yc = [0];
    
    set_up_game();
})

function set_up_game() {
    dt = 20;
    sirina_zidova = 30;
    
    zidovi = new Zidovi(sirina_zidova, '#cccccc');

    console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
    
    lopta = new Lopta(20, 575+100, 640-19, 200);
    //Lopta(radijus, centarx, centary, vl)
    lopta.postavi_brzinu(-20, 0);
    
    reket = new Reket(500, 650, 450, 150, 20, 'blue', 25);
    //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
    lopta.postavi_na_reket(reket);
    
    objekt = new Objekt(500, 300, 150, 150, 'red');
    //objekt(centarx, centary, sirina, visina, boja)
    //objekt.ukloni_objekt();
    
    list = true;
    dest = true;
    
    objekti = [];
    dodaj_red_objekata(110, 100, 10, 100, 50, 'blue', 10, objekti);
    //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti)
    
    
    id = setInterval(engine, dt);
    console.log('POSTAVIO sam interval');
}

function engine() {
    if (!list) reket.pomakni('l', dt); 
    if (!dest) reket.pomakni('d', dt); 
    
    var flag = true;
    if (!reket.sticked) {
        if (lopta.interakcija_zidovi(zidovi, dt)) flag = false;
        if (reket.interakcija(lopta, dt))  flag = false;
        if (objekt.interakcija(lopta, dt)) flag = false;
        
        for (var i = objekti.length-1; i > -1; i--) {
            var obje = objekti[i];
            if (obje.interakcija(lopta, dt)) {
                flag = false;
                objekti.splice(i, 1);
            }
        }
        
        if (reket.game_over(lopta)) {
            clearInterval(id);
            gamefl = false;
            console.log('UGASIO sam interval');
            zavrsi_gem();
        }
        if (flag) lopta.pomakni(dt);
    }
    
}


function zavrsi_gem() {
    var el = $("<div></div>");
    el.attr('id', 'kraj');
    
    var el1 = $("<p id='poruka1'>You lost!</p>");
    var el2 = $("<p>Press S to restart.</p>");
    el.append(el1);
    el.append(el2);
    
    
    var sirina = parseInt($('#prostor').css('width'));
    var visina = parseInt($('#prostor').css('height'));
    console.log(sirina + ' / ' + visina);
    visina = (visina - 300)/2;
    sirina = (sirina - 400)/2;
    el.css('top', visina + 'px');
    el.css('left', sirina + 'px');
    
    $('#prostor').append(el);
}


function dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti) {
// ova funkcija u polje objekti dodaje red n objekata zadane boje, sirine i visine
// pocetnix je centarx koordinata prvog objekta, y je centary koordinata objekata, a n je horizontalna x-udaljenost u pikselima izmedu objekata
// dodaje n objekata ako stanu na ekran, ako ne onda maksimalan broj koji stane
    var br = 0;
    for (var i = pocetnix; i+sirina/2 < parseInt($('#prostor').css('width')); i += sirina + udaljenost) {
        objekti.push(new Objekt(i, y, sirina, visina, boja));
        //objekt(centarx, centary, sirina, visina, boja)
        br++;
        if (br == n) break;
    }
    
    
    
    //console.log(parseInt($('#prostor').css('width')));
}

function Lopta(radijus, centarx, centary, vl) {
// vl je brzina lansiranja loptice
    this.centarx = centarx;
    this.centary = centary;
    this.radijus = Math.floor(radijus);
    this.vx = 0;
    this.vy = 0;
    this.vl = vl;
    
    this.el = $("<div></div>");
    this.el.attr('id', 'lopta');
    this.el.css('grid-column', Math.floor(this.centarx-radijus).toString() + ' / span ' + (2*radijus).toString());
    this.el.css('grid-row', Math.floor(this.centary-radijus).toString() + ' / span ' + (2*radijus).toString());
    
    $('#prostor').append(this.el);
    
    this.upit = function() {
        console.log("trenutna brzina loptice je (" + this.vx + ', ' + this.vy + ')');
    }
    
    this.random_brzina = function() {
        var max_otklon = 45; // maksimalni otklon od vertikale u stupnjevima
        var fii = (Math.random() * 2 - 1) * max_otklon / 180 * Math.PI;
        //fii = 0;
        this.vx = Math.sin(fii) * vl;
        this.vy = -1 * Math.cos(fii) * vl;
        console.log('fi je ' + fii + ' / ' + this.vx + ' ' + this.vy);
    }
    
    this.postavi_brzinu = function(vx, vy) {  // brzine su broj piksela po sekundi
        this.vx = vx;
        this.vy = vy;
    }
    
    this.postavi_poziciju = function(centarx, centary) {  //  postavi loptu na poziciju u pikselima
        this.centarx = centarx;
        this.centary = centary;
        this.el.css('grid-column', Math.floor(this.centarx-radijus).toString() + ' / span ' + (2*radijus).toString());
        this.el.css('grid-row', Math.floor(this.centary-radijus).toString() + ' / span ' + (2*radijus).toString());
    }
    
    this.postavi_na_reket = function(reket) {  //  postavi loptu na reket
        this.vx = 0;
        this.vy = 0;
        this.centarx = reket.centarx;
        this.centary = reket.centary - reket.visina/2 - this.radijus;
        reket.sticked = true;
        this.el.css('grid-column', Math.floor(this.centarx-radijus).toString() + ' / span ' + (2*radijus).toString());
        this.el.css('grid-row', Math.floor(this.centary-radijus).toString() + ' / span ' + (2*radijus).toString());
    }
    
    this.pomakni = function(dt) {
        this.centarx += this.vx * dt/1000;
        this.centary += this.vy * dt/1000;
        this.el.css('grid-column', Math.floor(this.centarx-radijus).toString() + ' / span ' + (2*radijus).toString());
        this.el.css('grid-row', Math.floor(this.centary-radijus).toString() + ' / span ' + (2*radijus).toString());
    }
    
    this.pomakni_na_reketu = function(dt, v) {
        this.centarx += v * dt / 1000;
        this.el.css('grid-column', Math.floor(this.centarx-radijus).toString() + ' / span ' + (2*radijus).toString());
    }
    
    this.interakcija_zidovi = function(zid, dt) {
    // ova funkcija ce updejtati novu poziciju kuglice ako je doslo do interakcije sa zidovima i vratit ce true
    // ukoliko nije doslo do interakcije, vraca false i ne mjenja poziciju loptice
        var flag = false;
        
        if (this.vx > 0) {
            var pomak = this.vx * dt / 1000;
            var novix = this.centarx + pomak;
            if (zid.desni-novix < this.radijus) {
                var d1 = zid.desni - this.centarx - this.radijus;
                var dt1 = d1 / pomak * dt;
                this.centarx += this.vx * dt1/1000;
                this.vx *= -1;
                this.centarx += this.vx * (dt-dt1)/1000;        
                this.centary += this.vy * dt/1000;
                flag = true;
            }
        } else {
            var pomak = this.vx * dt / 1000;
            var novix = this.centarx + pomak;
            if (novix-zid.lijevi < this.radijus) {
                var d1 = this.centarx - zid.lijevi - this.radijus;
                var dt1 = -1 * d1 / pomak * dt;
                this.centarx += this.vx * dt1/1000;
                this.vx *= -1;
                this.centarx += this.vx * (dt-dt1)/1000;        
                this.centary += this.vy * dt/1000;
                flag = true;
            }
        }
        
        if (this.vy > 0) {
            if (zid.donji == -1) return false;
            
            var pomak = this.vy * dt / 1000;
            var noviy = this.centary + pomak;
            if (zid.donji-noviy < this.radijus) {
                var d1 = zid.donji - this.centary - this.radijus;
                var dt1 = d1 / pomak * dt;
                this.centary += this.vy * dt1/1000;
                this.vy *= -1;
                this.centary += this.vy * (dt-dt1)/1000;        
                this.centarx += this.vx * dt/1000;
                flag = true;
            }
        } else {
            var pomak = this.vy * dt / 1000;
            var noviy = this.centary + pomak;
            if (noviy-zid.gornji < this.radijus) {
                var d1 = this.centary - zid.gornji - this.radijus;
                var dt1 = -1 * d1 / pomak * dt;
                this.centary += this.vy * dt1/1000;
                this.vy *= -1;
                this.centary += this.vy * (dt-dt1)/1000;        
                this.centarx += this.vx * dt/1000;
                flag = true;
            }
        }
        
        
        return flag;
    }

}

function vrijeme_udara_u_rub(centarx, centary, radijus, vx, vy, rubx, ruby) {
    
    if (vx > -1 && vx < 1) {  // efektivno je vx = 0
        var y1 = ruby;
        var y2 = ruby;
        var kor = Math.sqrt(radijus*radijus - Math.pow(centarx-rubx, 2));
        
        //var priv1, priv2;
        
        y1 += kor; y1 -= centary; y1 /= vy;
        y2 -= kor; y2 -= centary; y2 /= vy;
        
        //if (y1 < y2) console.log('y ' + priv1);
        //else console.log('y ' + priv2);
        
        if (y1 < y2) return y1 * 1000;
        else return y2 * 1000;
    }
    
    if (vy > -1 && vy < 1) {  // efektivno je vy = 0
        var x1 = rubx;
        var x2 = rubx;
        var kor = Math.sqrt(radijus*radijus - Math.pow(centary-ruby, 2));
        
        //var priv1, priv2;
        
        x1 += kor; x1 -= centarx; x1 /= vx;
        x2 -= kor; x2 -= centarx; x2 /= vx;
        
        //if (x1 < x2) console.log('x ' + priv1);
        //else console.log('x ' + priv2);
        
        if (x1 < x2) return x1 * 1000;
        else return x2 * 1000;
    }
    
    var a = vy / vx;
    var b = centary - a * centarx;
    var kor = 2 * Math.sqrt( Math.pow(a*b-a*ruby-rubx, 2) - (a*a+1)*(b*b + ruby*ruby + rubx*rubx - 2*b*ruby - radijus*radijus) )
    var t1 = -2*(a*b - a*ruby - rubx);
    var t2 = t1;
    t1 += kor;
    t2 -= kor;
    t1 /= 2*(a*a+1);
    t2 /= 2*(a*a+1);
    t1 -= centarx;
    t2 -= centarx;
    t1 /= vx;
    t2 /= vx;
    if (t2 < t1) return t2*1000;
    else return t1*1000;
}

function transform1(x, y, xc, yc, fi) {
    // transformira koordinate x, y u xc, yc sustav udarenog objekta, fi je kut izmedu osi x i xc dva koordinatna sustava
    xc[0] = x[0] * Math.cos(fi)  +  y[0] * Math.sin(fi);
    yc[0] = -1 * x[0] * Math.sin(fi)  +  y[0] * Math.cos(fi);
}

function transform2(x, y, xc, yc, fi) {
    // transformira koordinate xc, yc udarenog objekta u x, y sustav igraceve plohe, fi je kut izmedu osi x i xc dva koordinatna sustava
    x[0] = xc[0] * Math.cos(fi)  -  yc[0] * Math.sin(fi);
    y[0] = xc[0] * Math.sin(fi)  +  yc[0] * Math.cos(fi);
}

function Objekt(centarx, centary, sirina, visina, boja) {
// konstruktor objekta-mete koju gadamo. prva cetiri parametra zadaju polozaj i dimenzije objekta    
    this.centarx = centarx;
    this.centary = centary;
    this.sirina = sirina;
    this.visina = visina;
    this.id = nacrtaj_pravokutnik(centarx, centary, sirina, visina, boja);
    this.aktivan = true; // za false objekt ne postoji
}

Objekt.prototype.ukloni_objekt = function() {
    var v = '#element_' + this.id;
    $(v).remove();
    this.aktivan = false;
}

Objekt.prototype.interakcija = function(lopta, dt) {
// ova funkcija gleda da li dolazi do interakcije objekta i lopte i vraca u tom slucaju true, inace false.
// u slucaju interakcije proracunava poziciju lopte u sljedecem dt intervalu, a u suprotnom ne mjenja poziciju lopte
// ova metoda koristi realisticni model zakrivljenog kruznog luka za proracun kuta odbijanja
    if (!this.aktivan) return false;
        
    var loptax = lopta.centarx;
    var loptay = lopta.centary;
    var radijus = lopta.radijus;
    var novax = loptax + lopta.vx * dt / 1000;
    var novay = loptay + lopta.vy * dt / 1000;
        
    if (lopta.vy > 0 && novay < this.centary && novay + radijus > this.centary - this.visina/2) {
        if (novax >= this.centarx - this.sirina / 2 && novax <= this.centarx + this.sirina / 2) {
        // odbijanje od gornje plohe
            var d1 = this.centary - this.visina/2 - loptay - radijus;
            var dt1 = d1 / lopta.vy * 1000;
                
            lopta.centary += dt1 / 1000 * lopta.vy;
            lopta.centarx += dt / 1000 * lopta.vx;
                
            lopta.vy *= -1;
            lopta.centary += (dt-dt1) / 1000 * lopta.vy;
                
            this.ukloni_objekt();
            return true;
        }
    }
        
    if (lopta.vx > 0 && novax < this.centarx && novax + radijus > this.centarx - this.sirina/2) {
        if (novay >= this.centary - this.visina / 2 && novay <= this.centary + this.visina / 2) {
        // odbijanje od lijeve plohe
            var d1 = this.centarx - this.sirina/2 - loptax - radijus;
            var dt1 = d1 / lopta.vx * 1000;
                
            lopta.centarx += dt1 / 1000 * lopta.vx;
            lopta.vx *= -1;
            lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
            lopta.centary += dt / 1000 * lopta.vy;
                
            this.ukloni_objekt();
            return true;
        }
    }
        
    if (lopta.vx < 0 && novax > this.centarx && novax - radijus < this.centarx + this.sirina/2) {
        if (novay >= this.centary - this.visina / 2 && novay <= this.centary + this.visina / 2) {
        // odbijanje od desne plohe
            var d1 = loptax - radijus - this.centarx - this.sirina/2;
            var dt1 = -1 * d1 / lopta.vx * 1000;
                
            lopta.centarx += dt1 / 1000 * lopta.vx;
            lopta.vx *= -1;
            lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
            lopta.centary += dt / 1000 * lopta.vy;
                
            this.ukloni_objekt();
            return true;
        }
    }
        
    if (lopta.vy < 0 && novay > this.centary && novay - radijus < this.centary + this.visina/2) {
        if (novax >= this.centarx - this.sirina / 2 && novax <= this.centarx + this.sirina / 2) {
        // odbijanje od donje plohe
            var d1 = loptay - radijus - this.centary - this.visina/2;
            var dt1 = -1 * d1 / lopta.vy * 1000;
                
            lopta.centary += dt1 / 1000 * lopta.vy;
            lopta.centarx += dt / 1000 * lopta.vx;
                
            lopta.vy *= -1;
            lopta.centary += (dt-dt1) / 1000 * lopta.vy;
                
            this.ukloni_objekt();
            return true;
        }
    }
        
    if (Math.pow(novax-this.centarx+this.sirina/2, 2) + Math.pow(novay-this.centary-this.visina/2, 2) < radijus * radijus) {
        // interakcija sa donjim lijevim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, lopta.vx, lopta.vy, this.centarx-this.sirina/2, this.centary+this.visina/2);
        lopta.centary += dt1 / 1000 * lopta.vy;
        lopta.centarx += dt1 / 1000 * lopta.vx;
        var fi = Math.atan( (lopta.centary-this.centary-this.visina/2)/(this.centarx-this.sirina/2-lopta.centarx) );
        fi = -1*fi;
        console.log('udario si u lijevi donji rub ' + dt1);
        console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + lopta.vx + ' / ' + lopta.vy  );
            
        var vx = [lopta.vx], vy = [lopta.vy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        lopta.vx = vx[0]; lopta.vy = vy[0];
            
        lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
        lopta.centary += (dt-dt1) / 1000 * lopta.vy;
            
        this.ukloni_objekt();
        return true;
    }
        
    if (Math.pow(novax-this.centarx-this.sirina/2, 2) + Math.pow(novay-this.centary-this.visina/2, 2) < radijus * radijus) {
        // interakcija sa donjim desnim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, lopta.vx, lopta.vy, this.centarx+this.sirina/2, this.centary+this.visina/2);
        lopta.centary += dt1 / 1000 * lopta.vy;
        lopta.centarx += dt1 / 1000 * lopta.vx;
        var fi = Math.atan( (lopta.centary-this.centary-this.visina/2)/(this.centarx+this.sirina/2-lopta.centarx) );
        fi = -1*fi;
        console.log('udario si u desni donji rub ' + dt1);
        console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + lopta.vx + ' / ' + lopta.vy  );
            
        var vx = [lopta.vx], vy = [lopta.vy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        lopta.vx = vx[0]; lopta.vy = vy[0];
            
        lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
        lopta.centary += (dt-dt1) / 1000 * lopta.vy;
            
        this.ukloni_objekt();
        return true;
    }
        
    if (Math.pow(novax-this.centarx+this.sirina/2, 2) + Math.pow(novay-this.centary+this.visina/2, 2) < radijus * radijus) {
        // interakcija sa gornjim lijevim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, lopta.vx, lopta.vy, this.centarx-this.sirina/2, this.centary-this.visina/2);
        lopta.centary += dt1 / 1000 * lopta.vy;
        lopta.centarx += dt1 / 1000 * lopta.vx;
        var fi = Math.atan( (lopta.centary-this.centary+this.visina/2)/(this.centarx-this.sirina/2-lopta.centarx) );
        fi = -1*fi;
        console.log('udario si u lijevi gornji rub ' + dt1);
        console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + lopta.vx + ' / ' + lopta.vy  );
            
        var vx = [lopta.vx], vy = [lopta.vy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        lopta.vx = vx[0]; lopta.vy = vy[0];
            
        lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
        lopta.centary += (dt-dt1) / 1000 * lopta.vy;
            
        this.ukloni_objekt();
        return true;
    }
        
    if (Math.pow(novax-this.centarx-this.sirina/2, 2) + Math.pow(novay-this.centary+this.visina/2, 2) < radijus * radijus) {
        // interakcija sa gornjim desnim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, lopta.vx, lopta.vy, this.centarx+this.sirina/2, this.centary-this.visina/2);
        lopta.centary += dt1 / 1000 * lopta.vy;
        lopta.centarx += dt1 / 1000 * lopta.vx;
        var fi = Math.atan( (lopta.centary-this.centary+this.visina/2)/(this.centarx+this.sirina/2-lopta.centarx) );
        fi = -1*fi;
        console.log('udario si u lijevi gornji rub ' + dt1);
        console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + lopta.vx + ' / ' + lopta.vy  );
            
        var vx = [lopta.vx], vy = [lopta.vy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        lopta.vx = vx[0]; lopta.vy = vy[0];
            
        lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
        lopta.centary += (dt-dt1) / 1000 * lopta.vy;
            
        this.ukloni_objekt();
        return true;
    }
        
    return false;  
}

function Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost) {
// konstruktor reket objekta. centarx/y su koordinate centram brzina je brzina gibanja reketa u pikselima po sekundi
// sirina i visina su dimenzije reketa, boja je boja reketa u obliku css stringa, zakrivljenost je
// krajnji kut zakrivljenosti u stupnjevima u rubnoj lijevoj i desnoj tocki gornje plohe. moze biti od -90 do 90. 
// pozitivna vrijednost je nagib prema desno na desnoj strani, a prema lijevo na lijevoj (kao kruzni luk). negativne
// vrijednosti daju obrnute nagibe (kao kruzno udubljenje). vrijednost 0 daje klasicnu ravno plohu   
    this.sirina = sirina;
    this.visina = visina;
    this.centarx = centarx;
    this.centary = centary;
    this.brzina = brzina;
    this.medax1 = Math.floor(sirina/2 + sirina_zidova);
    this.medax2 = Math.floor(parseInt($('div#prostor').css('width'))-sirina/2 - sirina_zidova);
    this.grad_zakrivljenosti = zakrivljenost / 180 * Math.PI / this.sirina * 2;
    this.sticked = false; // za true je loptica zalijepljena za reket
    
    console.log('gradijent zakrivljenosti je ' + this.grad_zakrivljenosti);
    
    this.game_over = function(lopta) {
        if (this.centary < lopta.centary) {
            return true;
        }
        return false;
    }
    
    this.pomakni = function(strana, dt) {
        // ova metoda pomice reket lijevo ili desno. za strana = 'l' pomice ga lijevo, za 'd' desno.
        // dt je vremenski interval u milisekundama
        var novix;
        if (strana == 'l') {
            novix = this.centarx - this.brzina * dt / 1000;
            if (novix >= this.medax1) {
                this.centarx = novix;
                var el = $('#reket');
                var kor1 =  Math.floor(this.centarx - this.sirina/2);
                if (kor1 < 1) kor1 = 1;  
                var kor2 =  Math.floor(this.centary - this.visina/2);
                if (kor2 < 1) kor2 = 1;
                el.css('grid-column', kor1.toString() + ' / span ' + sirina.toString());
                el.css('grid-row', kor2.toString() + ' / span ' + visina.toString());
                // ovdje umecemo sticked ball
                if (this.sticked) lopta.pomakni_na_reketu(dt, -1 * this.brzina);
            }
        } else {
            novix = this.centarx + this.brzina * dt / 1000;
            if (novix <= this.medax2) {
                this.centarx = novix;
                var el = $('#reket');
                var kor1 =  Math.floor(this.centarx - this.sirina/2);
                if (kor1 < 1) kor1 = 1;  
                var kor2 =  Math.floor(this.centary - this.visina/2);
                if (kor2 < 1) kor2 = 1;
                el.css('grid-column', kor1.toString() + ' / span ' + sirina.toString());
                el.css('grid-row', kor2.toString() + ' / span ' + visina.toString());
                // ovdje umecemo sticked ball
                if (this.sticked) lopta.pomakni_na_reketu(dt, this.brzina);
            }
        }
    }
    
    this.interakcija = function(lopta, dt) {
        // ova funkcija gleda da li dolazi do interakcije reketa i lopte i vraca u tom slucaju true, inace false.
        // u slucaju interakcije proracunava poziciju lopte u sljedecem dt intervalu, a u suprotnom ne mjenja poziciju lopte
        // ova metoda koristi realisticni model zakrivljenog kruznog luka za proracun kuta odbijanja
        var loptax = lopta.centarx;
        var loptay = lopta.centary;
        var radijus = lopta.radijus;
        var novax = loptax + lopta.vx * dt / 1000;
        var novay = loptay + lopta.vy * dt / 1000;
        
        if (lopta.vy > 0 && novay + radijus > this.centary - this.visina/2) {
            if (novax >= this.centarx - this.sirina / 2 && novax <= this.centarx + this.sirina / 2) {
            // odbijanje od gornje plohe
                var d1 = this.centary - this.visina/2 - loptay - radijus;
                var dt1 = d1 / lopta.vy * 1000;
                
                lopta.centary += dt1 / 1000 * lopta.vy;
                lopta.centarx += dt1 / 1000 * lopta.vx;
                
                var fi = this.grad_zakrivljenosti * (lopta.centarx - this.centarx);
                if (false) {
                    var vx = [lopta.vx], vy = [lopta.vy];
                    var vxc = [0], vyc = [0];
                    transform1(vx, vy, vxc, vyc, fi);
                    vyc[0] *= -1;
                    transform2(vx, vy, vxc, vyc, fi);
                    lopta.vx = vx[0]; lopta.vy = vy[0];
                } else {
                    var v = Math.sqrt(Math.pow(lopta.vx, 2) + Math.pow(lopta.vy, 2));
                    lopta.vx = v * Math.sin(fi);
                    lopta.vy = -1 * v * Math.cos(fi);
                }
                
                //lopta.vy *= -1;
                lopta.centary += (dt-dt1) / 1000 * lopta.vy;
                lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
                return true;
            }
        }
        
        if (lopta.vx > 0 && novax < this.centarx && novax + radijus > this.centarx - this.sirina/2) {
            if (novay >= this.centary - this.visina / 2 && novay <= this.centary + this.visina / 2) {
            // odbijanje od lijeve plohe
                var d1 = this.centarx - this.sirina/2 - loptax - radijus;
                var dt1 = d1 / lopta.vx * 1000;
                
                lopta.centarx += dt1 / 1000 * lopta.vx;
                lopta.vx *= -1;
                lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
                lopta.centary += dt / 1000 * lopta.vy;
                return true;
            }
        }
        
        if (lopta.vx < 0 && novax > this.centarx && novax - radijus < this.centarx + this.sirina/2) {
            if (novay >= this.centary - this.visina / 2 && novay <= this.centary + this.visina / 2) {
            // odbijanje od desne plohe
                var d1 = loptax - radijus - this.centarx - this.sirina/2;
                var dt1 = -1 * d1 / lopta.vx * 1000;
                
                lopta.centarx += dt1 / 1000 * lopta.vx;
                lopta.vx *= -1;
                lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
                lopta.centary += dt / 1000 * lopta.vy;
                return true;
            }
        }
        //ovdje cemo postaviti kod za interakciju rubnih tocaka reketa i lopte
        if (Math.pow(novax-this.centarx+this.sirina/2, 2) + Math.pow(novay-this.centary+this.visina/2, 2) < radijus * radijus) {
        // interakcija sa gornjim lijevim kutom
            var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, lopta.vx, lopta.vy, this.centarx-this.sirina/2, this.centary-this.visina/2);
            lopta.centary += dt1 / 1000 * lopta.vy;
            lopta.centarx += dt1 / 1000 * lopta.vx;
            var fi = Math.atan( (lopta.centary-this.centary+this.visina/2)/(this.centarx-this.sirina/2-lopta.centarx) );
            fi = -1*fi;
            console.log('udario si u lijevi gornji rub ' + dt1);
            console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + lopta.vx + ' / ' + lopta.vy  );
            
            var vx = [lopta.vx], vy = [lopta.vy];
            var vxc = [0], vyc = [0];
            transform1(vx, vy, vxc, vyc, fi);
            vxc[0] *= -1;
            transform2(vx, vy, vxc, vyc, fi);
            lopta.vx = vx[0]; lopta.vy = vy[0];
            
            lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
            lopta.centary += (dt-dt1) / 1000 * lopta.vy;
            
            return true;
        }
        
        if (Math.pow(novax-this.centarx-this.sirina/2, 2) + Math.pow(novay-this.centary+this.visina/2, 2) < radijus * radijus) {
        // interakcija sa gornjim desnim kutom
            var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, lopta.vx, lopta.vy, this.centarx+this.sirina/2, this.centary-this.visina/2);
            lopta.centary += dt1 / 1000 * lopta.vy;
            lopta.centarx += dt1 / 1000 * lopta.vx;
            var fi = Math.atan( (lopta.centary-this.centary+this.visina/2)/(this.centarx+this.sirina/2-lopta.centarx) );
            fi = -1*fi;
            console.log('udario si u lijevi gornji rub ' + dt1);
            console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + lopta.vx + ' / ' + lopta.vy  );
            
            var vx = [lopta.vx], vy = [lopta.vy];
            var vxc = [0], vyc = [0];
            transform1(vx, vy, vxc, vyc, fi);
            vxc[0] *= -1;
            transform2(vx, vy, vxc, vyc, fi);
            lopta.vx = vx[0]; lopta.vy = vy[0];
            
            lopta.centarx += (dt-dt1) / 1000 * lopta.vx;
            lopta.centary += (dt-dt1) / 1000 * lopta.vy;
            
            return true;
        }
        
        
        
        return false;
    }
        
    console.log("meda1/2 za reket su " + this.medax1 + ' / ' + this.medax2);
    
    
    //nacrtaj_pravokutnik(centarx, centary, sirina, visina, 'blue');
    
    var el = $("<div></div>");
    el.attr('id', 'reket');
    
    el.css('background-color', boja);
    
    var kor1 =  Math.floor(this.centarx - this.sirina/2);
    if (kor1 < 1) kor1 = 1;  
    var kor2 =  Math.floor(this.centary - this.visina/2);
    if (kor2 < 1) kor2 = 1;
    el.css('grid-column', kor1.toString() + ' / span ' + sirina.toString());
    el.css('grid-row', kor2.toString() + ' / span ' + visina.toString());
    $('#prostor').append(el);
    
    
    
}
//function nacrtaj_pravokutnik(centarX, centarY, sirina, visina, boja)

function Zidovi(sirina, boja) {
//function napravi_zidove(sirina, boja) {
// ova funkcija ucrtava zidove u igracki prostor i postavlja njihovo polje/parametre. sirina definira
// sirinu zidova u pikselima, boja je css string koji govori o njihovoj boji. Ako zelis/ne zelis zid na donjem bridu
// moras u ovoj funkciji ukljuciti/iskljuciti pripadajuci prekidac
    
    var sir = parseInt($('div#prostor').css('width'));
    var vis = parseInt($('div#prostor').css('height'));
    
    console.log('sirina/visina igrackog polja je ' + sir + ' / ' + vis);
    
    //lijevi zid
    var centarx = Math.floor(sirina/2);
    var centary = Math.floor(vis/2);
                                    this.lijevi = sirina;
    console.log('centar je ' + centarx + ' / ' + centary);
    nacrtaj_pravokutnik(centarx, centary, sirina, vis, boja);
    
    //gornji zid
    centarx = Math.floor(sir/2);
    centary = Math.floor(sirina/2);
                                    this.gornji = sirina;
    console.log('centar je ' + centarx + ' / ' + centary);
    nacrtaj_pravokutnik(centarx, centary, sir, sirina, boja);
    
    //desni zid
    centarx = Math.floor(sir - sirina/2);
    centary = Math.floor(vis/2);
                                    this.desni = sir - sirina;
    console.log('centar je ' + centarx + ' / ' + centary);
    nacrtaj_pravokutnik(centarx, centary, sirina, vis, boja);
    
                                    this.donji = -1;
    if (false) {  // za true crta donji zid
        centarx = Math.floor(sir/2);
        centary = Math.floor(vis - sirina/2);
                                    this.donji = vis - sirina;
        console.log('centar je ' + centarx + ' / ' + centary);
        nacrtaj_pravokutnik(centarx, centary, sir, sirina, boja);
    }
}

function nacrtaj_pravokutnik(centarX, centarY, sirina, visina, boja) {
// ova funkcija crta pravokutnik na igracku povrsinu. koordinate centarX/Y zadaju poziciju centra elementa   
// sirina i visina zadaju te velicine u pikselima, boja je string i govori o boji objekta, zadajes je u css formatu npr. '#f12e34' ili 'blue'
    var el = $("<div></div>");
    el.attr('id', 'element_' + idbr);
    idbr++;
    
    el.css('background-color', boja);
    
    var kor1 =  Math.floor(centarX - sirina/2);
    if (kor1 < 1) kor1 = 1;  
    var kor2 =  Math.floor(centarY - visina/2);
    if (kor2 < 1) kor2 = 1;
    el.css('grid-column', kor1.toString() + ' / span ' + sirina.toString());
    el.css('grid-row', kor2.toString() + ' / span ' + visina.toString());
    
    $('#prostor').append(el);
    //console.log('upravo sam dodao pravokutnik ' + el.attr('id'));
    //console.log('dodali smo element sa id ' + el.attr('id'));
    //console.log('grid-column', kor1.toString() + ' / span ' + sirina.toString());
    //console.log('grid-row', kor2.toString() + ' / span ' + visina.toString());
    return idbr - 1;
}

function pritisak_gumba_up(ev) {
    //console.log("Otpustio si " + ev.code +  " " + Math.floor(Math.random()*4000));
    switch (ev.code) {
        case "ArrowLeft":
            list = true;
            break;
        case "ArrowRight":
            dest = true;
            break;
    }
}

function pritisak_gumba_down(ev) {
    //console.log("Pritisnuo si " + ev.code +  " " + Math.floor(Math.random()*4000));
    switch (ev.code) {
        case "ArrowLeft":
            if (list) {
               list = false;
            }
            break;
        case "ArrowRight":
            if (dest) {
               dest = false;
            }
            break;
        case "KeyS":
            if (!gamefl) {
                $('#prostor').empty();
                set_up_game();
                //id = setInterval(engine, dt);
                console.log('POSTAVIO sam interval');
                gamefl = true;
                break;
            }
            if (reket.sticked) {
               reket.sticked = false;
               lopta.random_brzina();
               lopta.upit();
            }
            break;
        case "KeyU":
            lopta.upit();
            break;
    }
}


