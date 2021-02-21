$('document').ready(function() {
    level = 1;
    bodovi = 0;
    lives = 3;
    
    idbr = 0;
    dt = 20;
    gamefl = true;
    gameoverfl = false;
    novi_level = false;
    brreflektora = 0;
    time = 0;
    zadnji_padajuci = 0;  // link na timer zadnjeg padajuceg objekta

    document.addEventListener("keydown", pritisak_gumba_down);
    document.addEventListener("keyup", pritisak_gumba_up);
    
    
    // ovo su sve closure funkcije, za zvucne efekte i za updejtanje timera
    zvuk1 = pusti_zvuk(1);
    zvuk2 = pusti_zvuk(2);
    zvuk3 = pusti_zvuk(4);
    updejtaj_vrijeme = updejtaj_time();
    updejtaj_vrijeme1 = updejtaj_time1();
    updejtaj_vrijeme2 = updejtaj_time2();
    
    var xx = [33];
    var yy = [22];
    var xc = [0], yc = [0];
    
    set_up_game(level);
    
})

function set_up_game(level) {
    dt = 20;
    sirina_zidova = 30;
    
    postavi_level(level);
    postavi_bodove(bodovi);
    postavi_zivote(lives);
    
    if (level == -1) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        lopta = new Lopta(10, 300-106.066-50, 300-0, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        if (true) {
            objekti.push(new Objekt(350, 350, 50, 50, 'blue', 0));
            objekti[0].tvrdi = true;
        }
        $('#svg').css('grid-column', '100' + ' / span ' + '1');
        $('#svg').css('grid-row', '100' + ' / span ' + '1');
        
        
        
    } else if (level == 1) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 300-106.066-50, 300-0, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        
        if (false) {
            objekti.push(new Objekt(200, 500, 150, 20, 'blue', 45));
            objekti[0].tvrdi = true;
        }
        
        padajuci_objekti.push(new Padajuci_objekt(500, 500, 50, 50, 50, 'green', 'pravokutnik'));
        //Padajuci_objekt(centarx, centary, sirina, visina, v, boja, tip)
        
        nacrtaj_padajuce_loptice(500, 580, 76, 40, 'yellow');
        
        if (true) {
        dodaj_red_objekata(143, 100, 10, 80, 40, 'red', 10, objekti, 0);
        dodaj_red_objekata(143, 150, 10, 80, 40, 'yellow', 10, objekti, 0);
        dodaj_red_objekata(143, 200, 10, 80, 40, '#246cf2', 10, objekti, 0);
        dodaj_red_objekata(143, 250, 10, 80, 40, '#ce23e0', 10, objekti, 0);
        dodaj_red_objekata(143, 300, 10, 80, 40, 'green', 10, objekti, 0);
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, 0)
        }
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
        
    } else if (level == 2) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 575+100, 640-19, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(-20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
        //lopta.randomfl = false;
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        dodaj_red_objekata(103, 100, 10, 30, 16, 'red', 9, objekti, 0);
        dodaj_red_objekata(683, 100, 10, 30, 16, 'red', 9, objekti, 0);
        
        dodaj_red_objekata(103, 125, 10, 30, 16, 'yellow', 9, objekti, 0);
        dodaj_red_objekata(683, 125, 10, 30, 16, 'yellow', 9, objekti, 0);
        
        dodaj_red_objekata(103, 150, 10, 30, 16, '#246cf2', 9, objekti, 0);
        dodaj_red_objekata(683, 150, 10, 30, 16, '#246cf2', 9, objekti, 0);
        
        dodaj_red_objekata(103, 175, 10, 30, 16, '#ce23e0', 9, objekti, 0);
        dodaj_red_objekata(683, 175, 10, 30, 16, '#ce23e0', 9, objekti, 0);
        
        dodaj_red_objekata(103, 200, 10, 30, 16, 'green', 9, objekti, 0);
        dodaj_red_objekata(683, 200, 10, 30, 16, 'green', 9, objekti, 0);
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, 0)
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
    } else if (level == 3) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 300-106.066-50, 300-0, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        
        if (false) {
            objekti.push(new Objekt(200, 500, 150, 20, 'blue', 45));
            objekti[0].tvrdi = true;
        }
        
        if (true) {
        dodaj_red_objekata(143, 100, 10, 80, 40, 'red', 10, objekti, 30);
        dodaj_red_objekata(143, 150, 10, 80, 40, 'yellow', 10, objekti, 30);
        dodaj_red_objekata(143, 200, 10, 80, 40, '#246cf2', 10, objekti, 30);
        dodaj_red_objekata(143, 250, 10, 80, 40, '#ce23e0', 10, objekti, 30);
        dodaj_red_objekata(143, 300, 10, 80, 40, 'green', 10, objekti, 30);
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, fi)
        }
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
    } else if (level == 4) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 300-106.066-50, 300-0, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        
        if (true) {
            objekti.push(new Objekt(555, 400, 120, 10, 'grey', 45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[0].tvrdi = true;
        }
        
        if (true) {
        
            
        dodaj_red_objekata(143, 110, 7, 35, 15, 'red', 10, objekti, 0);
        dodaj_red_objekata(590, 110, 7, 35, 15, 'red', 10, objekti, 0);
        dodaj_stupac_objekata(143, 132, 7, 35, 15, 'red', 6, objekti, 0);    
        dodaj_stupac_objekata(968, 132, 7, 35, 15, 'red', 6, objekti, 0);
        
        dodaj_red_objekata(185, 132, 7, 35, 15, 'yellow', 9, objekti, 0);
        dodaj_red_objekata(590, 132, 7, 35, 15, 'yellow', 9, objekti, 0);
        dodaj_stupac_objekata(185, 154, 7, 35, 15, 'yellow', 5, objekti, 0);    
        dodaj_stupac_objekata(926, 154, 7, 35, 15, 'yellow', 5, objekti, 0);
        
        dodaj_red_objekata(227, 154, 7, 35, 15, '#246cf2', 8, objekti, 0);
        dodaj_red_objekata(590, 154, 7, 35, 15, '#246cf2', 8, objekti, 0);
        dodaj_stupac_objekata(227, 176, 7, 35, 15, '#246cf2', 4, objekti, 0);    
        dodaj_stupac_objekata(884, 176, 7, 35, 15, '#246cf2', 4, objekti, 0);
        
        dodaj_red_objekata(269, 176, 7, 35, 15, '#ce23e0', 7, objekti, 0);
        dodaj_red_objekata(590, 176, 7, 35, 15, '#ce23e0', 7, objekti, 0);
        dodaj_stupac_objekata(269, 198, 7, 35, 15, '#ce23e0', 3, objekti, 0);    
        dodaj_stupac_objekata(842, 198, 7, 35, 15, '#ce23e0', 3, objekti, 0);
        
        dodaj_red_objekata(311, 198, 7, 35, 15, '#3bf54a', 6, objekti, 0);
        dodaj_red_objekata(590, 198, 7, 35, 15, '#3bf54a', 6, objekti, 0);
        dodaj_stupac_objekata(311, 220, 7, 35, 15, '#3bf54a', 2, objekti, 0);    
        dodaj_stupac_objekata(800, 220, 7, 35, 15, '#3bf54a', 2, objekti, 0);
        
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, fi)
        //dodaj_stupac_objekata(x, pocetniy, udaljenost, sirina, visina, boja, n, objekti, fi)
        }
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
    } else if (level == 5) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 300-106.066-50, 300-0, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        
        if (true) {
            objekti.push(new Objekt(555, 400, 120, 10, 'grey', 45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[0].tvrdi = true;
        }
        
        if (true) {
        
            
        dodaj_red_objekata(143, 110, 7, 35, 15, 'red', 10, objekti, 30);
        dodaj_red_objekata(590, 110, 7, 35, 15, 'red', 10, objekti, 30);
        dodaj_stupac_objekata(143, 132, 7, 35, 15, 'red', 6, objekti, 30);    
        dodaj_stupac_objekata(968, 132, 7, 35, 15, 'red', 6, objekti, 30);
        
        dodaj_red_objekata(185, 132, 7, 35, 15, 'yellow', 9, objekti, 30);
        dodaj_red_objekata(590, 132, 7, 35, 15, 'yellow', 9, objekti, 30);
        dodaj_stupac_objekata(185, 154, 7, 35, 15, 'yellow', 5, objekti, 30);    
        dodaj_stupac_objekata(926, 154, 7, 35, 15, 'yellow', 5, objekti, 30);
        
        dodaj_red_objekata(227, 154, 7, 35, 15, '#246cf2', 8, objekti, 30);
        dodaj_red_objekata(590, 154, 7, 35, 15, '#246cf2', 8, objekti, 30);
        dodaj_stupac_objekata(227, 176, 7, 35, 15, '#246cf2', 4, objekti, 30);    
        dodaj_stupac_objekata(884, 176, 7, 35, 15, '#246cf2', 4, objekti, 30);
        
        dodaj_red_objekata(269, 176, 7, 35, 15, '#ce23e0', 7, objekti, 30);
        dodaj_red_objekata(590, 176, 7, 35, 15, '#ce23e0', 7, objekti, 30);
        dodaj_stupac_objekata(269, 198, 7, 35, 15, '#ce23e0', 3, objekti, 30);    
        dodaj_stupac_objekata(842, 198, 7, 35, 15, '#ce23e0', 3, objekti, 30);
        
        dodaj_red_objekata(311, 198, 7, 35, 15, '#3bf54a', 6, objekti, 30);
        dodaj_red_objekata(590, 198, 7, 35, 15, '#3bf54a', 6, objekti, 30);
        dodaj_stupac_objekata(311, 220, 7, 35, 15, '#3bf54a', 2, objekti, 30);    
        dodaj_stupac_objekata(800, 220, 7, 35, 15, '#3bf54a', 2, objekti, 30);
        
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, fi)
        //dodaj_stupac_objekata(x, pocetniy, udaljenost, sirina, visina, boja, n, objekti, fi)
        }
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
    } else if (level == 6) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 300-106.066-50, 300-0, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        
        if (true) {
            objekti.push(new Objekt(300, 400, 120, 10, 'grey', 45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[0].tvrdi = true;
            objekti.push(new Objekt(790, 400, 120, 10, 'grey', -45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[1].tvrdi = true;
        }
        
        if (true) {
        
        dodaj_red_objekata(220, 110, 7, 35, 15, 'red', 8, objekti, 0);
        dodaj_red_objekata(580, 110, 7, 35, 15, 'red', 8, objekti, 0);
        
        dodaj_red_objekata(220, 132, 7, 35, 15, 'yellow', 8, objekti, 0);
        dodaj_red_objekata(580, 132, 7, 35, 15, 'yellow', 8, objekti, 0);
        
        dodaj_red_objekata(262, 154, 7, 35, 15, '#246cf2', 7, objekti, 0);
        dodaj_red_objekata(580, 154, 7, 35, 15, '#246cf2', 7, objekti, 0);
        
        dodaj_red_objekata(304, 176, 7, 35, 15, '#ce23e0', 6, objekti, 0);
        dodaj_red_objekata(580, 176, 7, 35, 15, '#ce23e0', 6, objekti, 0);
        
        dodaj_red_objekata(346, 198, 7, 35, 15, '#3bf54a', 5, objekti, 0);
        dodaj_red_objekata(580, 198, 7, 35, 15, '#3bf54a', 5, objekti, 0);
        
        dodaj_red_objekata(388, 220, 7, 35, 15, 'red', 4, objekti, 0);
        dodaj_red_objekata(580, 220, 7, 35, 15, 'red', 4, objekti, 0);
        
        dodaj_red_objekata(430, 242, 7, 35, 15, 'yellow', 3, objekti, 0);
        dodaj_red_objekata(580, 242, 7, 35, 15, 'yellow', 3, objekti, 0);
        
        dodaj_red_objekata(472, 264, 7, 35, 15, '#246cf2', 2, objekti, 0);
        dodaj_red_objekata(580, 264, 7, 35, 15, '#246cf2', 2, objekti, 0);
        
        dodaj_red_objekata(514, 286, 7, 35, 15, '#ce23e0', 1, objekti, 0);
        dodaj_red_objekata(580, 286, 7, 35, 15, '#ce23e0', 1, objekti, 0);
        
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, fi)
        //dodaj_stupac_objekata(x, pocetniy, udaljenost, sirina, visina, boja, n, objekti, fi)
        }
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
    } else if (level == 7) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 300-106.066-50, 300-0, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(20, 0);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        
        if (true) {
            objekti.push(new Objekt(553, 127, 195, 10, '#cccccc', 90));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[0].tvrdi = true;
            
            objekti.push(new Objekt(70, 240, 120, 10, '#cccccc', 45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[1].tvrdi = true;
            
            objekti.push(new Objekt(1030, 240, 120, 10, '#cccccc', -45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[2].tvrdi = true;
        }
        
        if (true) {
        
        dodaj_red_objekata(120, 110, 7, 35, 15, 'red', 9, objekti, 0);
        dodaj_red_objekata(650, 110, 7, 35, 15, 'red', 9, objekti, 0);
        
        dodaj_red_objekata(120, 132, 7, 35, 15, 'yellow', 9, objekti, 0);
        dodaj_red_objekata(650, 132, 7, 35, 15, 'yellow', 9, objekti, 0);
        
        dodaj_red_objekata(120, 154, 7, 35, 15, '#246cf2', 9, objekti, 0);
        dodaj_red_objekata(650, 154, 7, 35, 15, '#246cf2', 9, objekti, 0);
        
        dodaj_red_objekata(120, 176, 7, 35, 15, '#ce23e0', 9, objekti, 0);
        dodaj_red_objekata(650, 176, 7, 35, 15, '#ce23e0', 9, objekti, 0);
        
        dodaj_red_objekata(120, 198, 7, 35, 15, '#3bf54a', 9, objekti, 0);
        dodaj_red_objekata(650, 198, 7, 35, 15, '#3bf54a', 9, objekti, 0);
        
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, fi)
        //dodaj_stupac_objekata(x, pocetniy, udaljenost, sirina, visina, boja, n, objekti, fi)
        }
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
    } else if (level == 8) {
        zidovi = new Zidovi(sirina_zidova, '#cccccc');
        console.log('zidovi su dani sljedecim pravcima: ' + zidovi.lijevi + ' ' + zidovi.desni + " " + zidovi.gornji + ' ' + zidovi.donji);
    
        lopta = new Lopta(10, 560, 40, 500);
        //Lopta(radijus, centarx, centary, vl)
        lopta.postavi_brzinu(301, 231);
    
        reket = new Reket(500, 650, 600, 100, 20, 'blue', 25);
        //          Reket(centarx, centary, brzina, sirina, visina, boja, zakrivljenost)
    
        lopta.postavi_na_reket(reket);
    
        list = true;
        dest = true;
    
        objekti = [];
        padajuci_objekti = [];
        
        if (true) {
            objekti.push(new Objekt(500, 80, 150, 10, '#cccccc', 45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[0].tvrdi = true;
            
            objekti.push(new Objekt(600, 80, 150, 10, '#cccccc', -45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[1].tvrdi = true;
            
            objekti.push(new Objekt(507, 230, 130, 10, '#cccccc', -45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[2].tvrdi = true;
            
            objekti.push(new Objekt(593, 230, 130, 10, '#cccccc', 45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[3].tvrdi = true;
            
            objekti.push(new Objekt(550, 245, 110, 10, '#cccccc', 90));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[4].tvrdi = true;
            
            objekti.push(new Objekt(120, 490, 100, 10, '#cccccc', -45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[5].tvrdi = true;
            
            objekti.push(new Objekt(980, 490, 100, 10, '#cccccc', 45));
                           //Objekt(centarx, centary, sirina, visina, boja, fi)
            objekti[6].tvrdi = true;
        }
        
        if (true) {
        
        dodaj_red_objekata(120, 110, 7, 35, 15, 'red', 9, objekti, 0);
        dodaj_red_objekata(650, 110, 7, 35, 15, 'red', 9, objekti, 0);
        
        dodaj_red_objekata(120, 132, 7, 35, 15, 'yellow', 9, objekti, 0);
        dodaj_red_objekata(650, 132, 7, 35, 15, 'yellow', 9, objekti, 0);
        
        dodaj_red_objekata(120, 154, 7, 35, 15, '#246cf2', 9, objekti, 0);
        dodaj_red_objekata(650, 154, 7, 35, 15, '#246cf2', 9, objekti, 0);
        
        dodaj_red_objekata(120, 176, 7, 35, 15, '#ce23e0', 9, objekti, 0);
        dodaj_red_objekata(650, 176, 7, 35, 15, '#ce23e0', 9, objekti, 0);
        
        dodaj_red_objekata(120, 198, 7, 35, 15, '#3bf54a', 9, objekti, 0);
        dodaj_red_objekata(650, 198, 7, 35, 15, '#3bf54a', 9, objekti, 0);
        
        
        dodaj_red_objekata(120, 110+190, 7, 35, 15, 'red', 9, objekti, 0);
        dodaj_red_objekata(650, 110+190, 7, 35, 15, 'red', 9, objekti, 0);
        
        dodaj_red_objekata(120, 132+190, 7, 35, 15, 'yellow', 9, objekti, 0);
        dodaj_red_objekata(650, 132+190, 7, 35, 15, 'yellow', 9, objekti, 0);
        
        dodaj_red_objekata(120, 154+190, 7, 35, 15, '#246cf2', 9, objekti, 0);
        dodaj_red_objekata(650, 154+190, 7, 35, 15, '#246cf2', 9, objekti, 0);
        
        dodaj_red_objekata(120, 176+190, 7, 35, 15, '#ce23e0', 9, objekti, 0);
        dodaj_red_objekata(650, 176+190, 7, 35, 15, '#ce23e0', 9, objekti, 0);
        
        dodaj_red_objekata(120, 198+190, 7, 35, 15, '#3bf54a', 9, objekti, 0);
        dodaj_red_objekata(650, 198+190, 7, 35, 15, '#3bf54a', 9, objekti, 0);
        
        //dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, fi)
        //dodaj_stupac_objekata(x, pocetniy, udaljenost, sirina, visina, boja, n, objekti, fi)
        }
        
        for (var i = 0; i < objekti.length; i++) {
            if (objekti[i].tvrdi) brreflektora++;
        }
    }
    
    id = setInterval(engine, dt);
    console.log('POSTAVIO sam interval');
    
    brrr = 0;  // razvojna varijabla, na kraju je obrisi
}

function engine() {
    if (!list) reket.pomakni('l', dt); 
    if (!dest) reket.pomakni('d', dt); 
    
    var flag = true;
    if (!reket.sticked || lopta.stickyball) {
        if (lopta.interakcija_zidovi(zidovi, dt)) flag = false;
        if (reket.interakcija(lopta, dt))  flag = false;
        
        var dulj = objekti.length;
        if (dulj == brreflektora) {
            setTimeout(function() {document.getElementById("applause").play();}, 500);
            novi_level = true;
            clearInterval(id);
            zavrsi_gem(1);
        }
        
        for (var i = dulj-1; i > -1; i--) {
            var obje = objekti[i];
            if (obje.interakcija(lopta, dt)) {
                flag = false;
                if (!obje.aktivan) {
                    //if (brrr == 2) obje.stvori_padajuci(padajuci_objekti, 'jaka_lopta');
                    //if (brrr == 3) obje.stvori_padajuci(padajuci_objekti, 'spora_lopta');
                    //if (brrr == 1) obje.stvori_padajuci(padajuci_objekti, 'extra_zivot');
                    //if (brrr == 0) obje.stvori_padajuci(padajuci_objekti, 'ljepljiva_lopta');
                    if (brrr == 0) obje.stvori_padajuci(padajuci_objekti, 'dvije_lopte');
                    brrr++;
                    objekti.splice(i, 1);
                }
            }
        }
        
        var dulj1 = padajuci_objekti.length;
        if (dulj1 > 0) {
            for (var i = dulj1-1; i > -1; i--) {
                var obje1 = padajuci_objekti[i];
                if (obje1.pomakni(dt, reket))  {
                    obje1.ukloni(); 
                    padajuci_objekti.splice(i, 1);
                    console.log('upravo je padajuci objekt pobjegao van domasaja');
                } else if (obje1.interakcija(reket)) {
                    padajuci_objekti.splice(i, 1);
                }
            }
        }
        
        if (reket.game_over(lopta)) {
            clearInterval(id);
            gamefl = false;
            console.log('UGASIO sam interval');
            lives--;
            postavi_zivote(lives);
            setTimeout(function() {document.getElementById("zvuk11").play();}, 100);
            
            for (var i = padajuci_objekti.length-1; i > -1; i--)  {
                var obje1 = padajuci_objekti[i];
                obje1.ukloni();
            }
            padajuci_objekti = [];
            
            if (lives == 0) {
                gameoverfl = true;
                zavrsi_gem(gameoverfl);
            }
            else zavrsi_gem(gameoverfl);
        }
        if (flag) lopta.pomakni(dt);
    }
    
}

function poruka(tekst) {
// ova funkcija ispisuje poruku na ekranu kada igrac reketom pokupi padajuci objekt
    var el = $("<div></div>");
    el.attr('id', 'poruka');
    var el1 = $("<p>" + tekst + "</p>");
    el.append(el1);
    
    var sirina = parseInt($('#prostor').css('width'));
    var visina = parseInt($('#prostor').css('height'));
    console.log(sirina + ' / ' + visina);
    visina = (visina - 100)/2;
    sirina = (sirina - 300)/2;
    el.css('top', visina + 'px');
    el.css('left', sirina-50 + 'px');
    
    $('#prostor').append(el);
}

function zavrsi_gem(flag) {
// za flag true je gameover, za false je izgubljen zivot, nastavlja se level, za strogo 1 je novi level
    var el = $("<div></div>");
    el.attr('id', 'kraj');
    
    if (flag === 1) {
        var el1 = $("<p id='poruka1'>Level " + (level+1).toString() + "!</p>");
        var el2 = $("<p>Press S to begin.</p>");
    } else if (flag) {
        var el1 = $("<p id='poruka1'>Game over!</p>");
        var el2 = $("<p>Press S to start new game.</p>");
    } else {
        var el1 = $("<p id='poruka1'>You missed!</p>");
        var el2 = $("<p>Press S to continue.</p>");
    }
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

function dodaj_red_objekata(pocetnix, y, udaljenost, sirina, visina, boja, n, objekti, fi) {
// ova funkcija u polje objekti dodaje red n objekata zadane boje, sirine i visine
// pocetnix je centarx koordinata prvog objekta, y je centary koordinata objekata, a n je horizontalna x-udaljenost u pikselima izmedu objekata
// dodaje n objekata ako stanu na ekran, ako ne onda maksimalan broj koji stane
// kut fi je maksimalan raspon random kuta, od -fi do fi, pojedinog objekta. ako stavis nulu, 
// tada dobijes klasicni postav sa svim paralelnim objektima
    var br = 0;
    for (var i = pocetnix; i+sirina/2 < parseInt($('#prostor').css('width')); i += sirina + udaljenost) {
        var kut = (Math.random() * 2 - 1) * fi;
        objekti.push(new Objekt(i, y, sirina, visina, boja, kut));
        //objekt(centarx, centary, sirina, visina, boja)
        br++;
        if (br == n) break;
    }
    
    
    
    //console.log(parseInt($('#prostor').css('width')));
}

function dodaj_stupac_objekata(x, pocetniy, udaljenost, sirina, visina, boja, n, objekti, fi) {
// ova funkcija u polje objekti dodaje stupac n objekata zadane boje, sirine i visine
// x je centarx koordinata prvog objekta, pocetniy je centary koordinata objekata, a udaljenost je vertikalna y-udaljenost u pikselima izmedu objekata
// dodaje n objekata ako stanu na ekran, ako ne onda maksimalan broj koji stane
// kut fi je maksimalan raspon random kuta, od -fi do fi, pojedinog objekta. ako stavis nulu, 
// tada dobijes klasicni postav sa svim paralelnim objektima
    var br = 0;
    for (var i = pocetniy; i+visina/2 < parseInt($('#prostor').css('height')); i += visina + udaljenost) {
        var kut = (Math.random() * 2 - 1) * fi;
        objekti.push(new Objekt(x, i, sirina, visina, boja, kut));
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
    this.randomfl = true; // za true random ispaljivanje, za false ravno ispaljivanje
    this.power = false; // za true je lopta probojna i ne odbija se od objekata.
    this.stickyball = false; // za true lopta se zalijepi za reket i ceka ponovo ispaljivanje
    this.spora = false;  // za true je lopta spora
    
    this.el = $("<div></div>");
    this.el.attr('id', 'lopta');
    this.el.css('grid-column', Math.floor(this.centarx-radijus).toString() + ' / span ' + (2*radijus).toString());
    this.el.css('grid-row', Math.floor(this.centary-radijus).toString() + ' / span ' + (2*radijus).toString());
    
    $('#prostor').append(this.el);
    
    this.upit = function() {
        console.log("trenutna brzina loptice je (" + this.vx + ', ' + this.vy + ')');
        console.log("trenutna pozicija loptice je (" + this.centarx + ', ' + this.centary + ')');
        if (lopta.spora) console.log("lopta je trenutno spora");
        else console.log("lopta je trenutno brza");
    }
    
    this.random_brzina = function() {
        var max_otklon = 45; // maksimalni otklon od vertikale u stupnjevima
        if (this.stickyball)  max_otklon = 0;
        var fii = (Math.random() * 2 - 1) * max_otklon / 180 * Math.PI;
        if (!this.randomfl) fii = 0;
        this.vx = Math.sin(fii) * vl;
        this.vy = -1 * Math.cos(fii) * vl;
        if (this.spora) {
            this.vx *= 300 / vl;
            this.vy *= 300 / vl;
        }
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
                zvuk1();
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
                zvuk1();
            }
        }
        
        if (this.vy > 0) {
           //if (zid.donji == -1) return false;
           if (zid.donji != -1) {
            
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
                zvuk1();
            }
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
                zvuk1();
            }
        }
        
        return flag;
    }

}

function Padajuci_objekt(centarx, centary, sirina, visina, v, tip) {
// konstruktor padajuceg objekta. v je brzina propadanja u pikselima po sekundi
    this.centarx = centarx;
    this.centary = centary;
    this.sirina = sirina;
    this.visina = visina;
    this.v = v;
    this.tip = tip;
    
    if (tip == 'spora_lopta') this.id = nacrtaj_padajucu_lopticu(centarx, centary, sirina, visina, 'yellow');
    else if (tip == 'dvije_lopte') this.id = nacrtaj_padajuce_loptice(centarx, centary, sirina, visina, 'yellow');
    else if (tip == 'jaka_lopta') this.id = nacrtaj_padajucu_lopticu(centarx, centary, sirina, visina, 'red');
    else if (tip == 'extra_zivot') this.id = nacrtaj_prvu_pomoc(centarx, centary, sirina, visina);
    else if (tip == 'ljepljiva_lopta') this.id = nacrtaj_ljepilo(centarx, centary, sirina, visina, 'blue');
    else this.id = nacrtaj_pravokutnik(centarx, centary, sirina, visina, 'green', 0);
    
    this.pomakni = function(dt, reket) {
    // metoda pomice objekt, i vraca true ako je objekt prosao reket i ne moze se vise dohvatiti    
        this.centary = this.centary + dt / 1000 * this.v;
        var el = $('#element_' + this.id.toString());
        var kor2 =  Math.floor(this.centary - this.visina/2);
        if (kor2 < 1) kor2 = 1;
        el.css('grid-row', kor2.toString() + ' / span ' + this.visina.toString());
        
        if (this.centary - reket.centary > (this.visina + reket.visina)/2) return true;
        return false;
    } 
    
    this.interakcija = function(reket) {
        var udaljenostx = reket.centarx - this.centarx;
        var udaljenosty = reket.centary - this.centary;
        if (udaljenostx < 0) udaljenostx *= -1;
        if (udaljenosty < 0) udaljenosty *= -1;

        if (udaljenostx < (this.sirina + reket.sirina)/2 && udaljenosty < (this.visina + reket.visina)/2) {
            if (this.tip == 'spora_lopta') {
                console.log('AKTIVIRANA je spora lopta');
                time = 20;
                postavi_vrijeme(time);
                lopta.vx *= 300 / lopta.vl;
                lopta.vy *= 300 / lopta.vl;
                lopta.spora = true;
                if (typeof id_vrijeme !== 'undefined') clearTimeout(id_vrijeme);
                id_vrijeme = setTimeout(updejtaj_vrijeme, 1000, true);
                zadnji_padajuci = id_vrijeme;
                makni_poruku();
                poruka('Slow ball!');
                document.getElementById("zvuk8").play();
                if (typeof id_poruka !== 'undefined') clearTimeout(id_poruka);
                id_poruka = setTimeout(makni_poruku, 2000);
            } else if (this.tip == 'dvije_lopte') {
                
                
                makni_poruku();
                poruka('Double ball!');
                //document.getElementById("zvuk7").play();
                if (typeof id_poruka !== 'undefined') clearTimeout(id_poruka);
                id_poruka = setTimeout(makni_poruku, 2000);
            } else if (this.tip == 'jaka_lopta') {
                time = 40;
                postavi_vrijeme(time);
                lopta.power = true;
                $('#lopta').css('background-color', 'red');
                if (typeof id_vrijeme1 !== 'undefined') clearTimeout(id_vrijeme1);
                id_vrijeme1 = setTimeout(updejtaj_vrijeme1, 1000, true);
                zadnji_padajuci = id_vrijeme1;
                makni_poruku();
                poruka('Power ball!');
                document.getElementById("zvuk7").play();
                if (typeof id_poruka !== 'undefined') clearTimeout(id_poruka);
                id_poruka = setTimeout(makni_poruku, 2000);
            } else if (this.tip == 'extra_zivot') {
                makni_poruku();
                poruka('Extra life!');
                document.getElementById("zvuk6").play(); 
                lives++;
                postavi_zivote(lives);
                if (typeof id_poruka !== 'undefined') clearTimeout(id_poruka);
                id_poruka = setTimeout(makni_poruku, 2000);
            } else if (this.tip == 'ljepljiva_lopta') {
                lopta.stickyball = true;
                makni_poruku();
                poruka('Sticky ball!');
                document.getElementById("zvuk10").play();
                $('#lopta').css('background-color', '#03f8fc');
                id_poruka = setTimeout(makni_poruku, 2000);
                time = 20;
                postavi_vrijeme(time);
                if (typeof id_vrijeme2 !== 'undefined') clearTimeout(id_vrijeme2);
                id_vrijeme2 = setTimeout(updejtaj_vrijeme2, 1000, true);
            }
            
            this.ukloni();
            return true;
        }
        return false;
    }
    
    this.ukloni = function() {
        var v = '#element_' + this.id;
        console.log('uklanjam ' + this.id);
        $(v).remove();
    }
    
}

function Objekt(centarx, centary, sirina, visina, boja, fi) {
// konstruktor objekta-mete koju gadamo. prva cetiri parametra zadaju polozaj i dimenzije objekta    
// fi je kut nagiba objekta u stupnjevima, za strogo nula imamo klasicni objekt
    this.id = nacrtaj_pravokutnik(centarx, centary, sirina, visina, boja, fi);
    if (fi === 0) {
        this.centarx = centarx;
        this.centary = centary;
    } else {
        var t1 = [centarx]; var t2 = [centary]; var t3 = [0]; var t4 = [0];
        transform1(t1, t2, t3, t4, fi / 180 * Math.PI);
        this.centarx = t3[0];
        this.centary = t4[0];
    }
    this.sirina = sirina;
    this.visina = visina;
    this.aktivan = true; // za false objekt ne postoji
    this.tvrdi = false; // za true je objekt fiksan i ne moze ga lopta ponistiti
    this.fi = fi/180 * Math.PI;
}

Objekt.prototype.ukloni_objekt = function() {
    var v = '#element_' + this.id;
    if (!this.tvrdi) {
        $(v).remove();
        this.aktivan = false;
    }
}

Objekt.prototype.stvori_padajuci = function(objekti, tip) {
    var sir = 40;
    var vis = 40;
    if (tip == 'spora_lopta') {
        var obj = new Padajuci_objekt(this.centarx, this.centary + (this.visina+vis)/2, sir, vis, 100, tip);
    } else if (tip == 'jaka_lopta') {
        var obj = new Padajuci_objekt(this.centarx, this.centary + (this.visina+vis)/2, sir, vis, 100, tip);
    } else if (tip == 'dvije_lopte') {
        sir = 80;
        var obj = new Padajuci_objekt(this.centarx, this.centary + (this.visina+vis)/2, sir, vis, 100, tip);
    } else if (tip == 'extra_zivot') {
        sir = 50;
        vis = 50;
        var obj = new Padajuci_objekt(this.centarx, this.centary + (this.visina+vis)/2, sir, vis, 100, tip);
    } else if (tip == 'ljepljiva_lopta') {
        sir = 50;
        vis = 50;
        var obj = new Padajuci_objekt(this.centarx, this.centary + (this.visina+vis)/2, sir, vis, 100, tip);
    } 
    objekti.push(obj);
}

Objekt.prototype.interakcija = function(lopta, dt) {
// ova funkcija gleda da li dolazi do interakcije objekta i lopte i vraca u tom slucaju true, inace false.
// u slucaju interakcije proracunava poziciju lopte u sljedecem dt intervalu, a u suprotnom ne mjenja poziciju lopte
// ova metoda koristi realisticni model zakrivljenog kruznog luka za proracun kuta odbijanja
    if (!this.aktivan) return false;
        
    var radijus = lopta.radijus;
    
    if (this.fi === 0) {
        var loptavx = lopta.vx;
        var loptavy = lopta.vy;
        var loptax = lopta.centarx;
        var loptay = lopta.centary;
        var novax = loptax + loptavx * dt / 1000;
        var novay = loptay + loptavy * dt / 1000;
    } else {
        var vx = [lopta.vx]; var vy = [lopta.vy];
        var vxc = [0]; var vyc = [0];
        transform1(vx, vy, vxc, vyc, this.fi);
        var loptavx = vxc[0];
        var loptavy = vyc[0];
        vx = [lopta.centarx]; vy = [lopta.centary];
        transform1(vx, vy, vxc, vyc, this.fi);
        var loptax = vxc[0];
        var loptay = vyc[0];
        var novax = loptax + loptavx * dt / 1000;
        var novay = loptay + loptavy * dt / 1000;
    }
        
    if (loptavy > 0 && novay < this.centary && novay + radijus > this.centary - this.visina/2) {
        if (novax >= this.centarx - this.sirina / 2 && novax <= this.centarx + this.sirina / 2) {
        // odbijanje od gornje plohe
            var d1 = this.centary - this.visina/2 - loptay - radijus;
            var dt1 = d1 / loptavy * 1000;
                
            loptay += dt1 / 1000 * loptavy;
            loptax += dt / 1000 * loptavx;
            
            if (!(lopta.power && !this.tvrdi))  loptavy *= -1;
            loptay += (dt-dt1) / 1000 * loptavy;
            console.log('ODBIJENO od gornje stranice');        
            this.ukloni_objekt();
            zvuk3();
            vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
            
            return true;
        }
    }
        
    if (loptavx > 0 && novax < this.centarx && novax + radijus > this.centarx - this.sirina/2) {
        if (novay >= this.centary - this.visina / 2 && novay <= this.centary + this.visina / 2) {
        // odbijanje od lijeve plohe
            var d1 = this.centarx - this.sirina/2 - loptax - radijus;
            var dt1 = d1 / loptavx * 1000;
                
            loptax += dt1 / 1000 * loptavx;
            //loptavx *= -1;
            if (!(lopta.power && !this.tvrdi))  loptavx *= -1;
            
            loptax += (dt-dt1) / 1000 * loptavx;
            loptay += dt / 1000 * loptavy;
                
            this.ukloni_objekt();
            zvuk3();
            vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
            return true;
        }
    }
        
    if (loptavx < 0 && novax > this.centarx && novax - radijus < this.centarx + this.sirina/2) {
        if (novay >= this.centary - this.visina / 2 && novay <= this.centary + this.visina / 2) {
        // odbijanje od desne plohe
            var d1 = loptax - radijus - this.centarx - this.sirina/2;
            var dt1 = -1 * d1 / loptavx * 1000;
                
            loptax += dt1 / 1000 * loptavx;
            //loptavx *= -1;
            if (!(lopta.power && !this.tvrdi))  loptavx *= -1;
            loptax += (dt-dt1) / 1000 * loptavx;
            loptay += dt / 1000 * loptavy;
            this.ukloni_objekt();
            zvuk3();
            
            vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
            return true;
        }
    }
        
    if (loptavy < 0 && novay > this.centary && novay - radijus < this.centary + this.visina/2) {
        if (novax >= this.centarx - this.sirina / 2 && novax <= this.centarx + this.sirina / 2) {
        // odbijanje od donje plohe
            var d1 = loptay - radijus - this.centary - this.visina/2;
            var dt1 = -1 * d1 / loptavy * 1000;
                
            loptay += dt1 / 1000 * loptavy;
            loptax += dt / 1000 * loptavx;
                
            //loptavy *= -1;
            if (!(lopta.power && !this.tvrdi))  loptavy *= -1;
            loptay += (dt-dt1) / 1000 * loptavy;
            this.ukloni_objekt();
            zvuk3();
            
            vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
            return true;
        }
    }
        
    if (Math.pow(novax-this.centarx+this.sirina/2, 2) + Math.pow(novay-this.centary-this.visina/2, 2) < radijus * radijus) {
        // interakcija sa donjim lijevim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, loptavx, loptavy, this.centarx-this.sirina/2, this.centary+this.visina/2);
        loptay += dt1 / 1000 * loptavy;
        loptax += dt1 / 1000 * loptavx;
        var fi = Math.atan( (loptay-this.centary-this.visina/2)/(this.centarx-this.sirina/2-loptax) );
        fi = -1*fi;
        //console.log('udario si u lijevi donji rub ' + dt1);
        //console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + loptavx + ' / ' + loptavy  );
            
        var vx = [loptavx], vy = [loptavy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        //vxc[0] *= -1;
        if (!(lopta.power && !this.tvrdi))  vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        loptavx = vx[0]; loptavy = vy[0];
            
        loptax += (dt-dt1) / 1000 * loptavx;
        loptay += (dt-dt1) / 1000 * loptavy;
            
        this.ukloni_objekt();
        zvuk3();
        
        vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
        return true;
    }
        
    if (Math.pow(novax-this.centarx-this.sirina/2, 2) + Math.pow(novay-this.centary-this.visina/2, 2) < radijus * radijus) {
        // interakcija sa donjim desnim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, loptavx, loptavy, this.centarx+this.sirina/2, this.centary+this.visina/2);
        loptay += dt1 / 1000 * loptavy;
        loptax += dt1 / 1000 * loptavx;
        var fi = Math.atan( (loptay-this.centary-this.visina/2)/(this.centarx+this.sirina/2-loptax) );
        fi = -1*fi;
        //console.log('udario si u desni donji rub ' + dt1);
        //console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + loptavx + ' / ' + loptavy  );
            
        var vx = [loptavx], vy = [loptavy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        //vxc[0] *= -1;
        if (!(lopta.power && !this.tvrdi))  vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        loptavx = vx[0]; loptavy = vy[0];
            
        loptax += (dt-dt1) / 1000 * loptavx;
        loptay += (dt-dt1) / 1000 * loptavy;
            
        this.ukloni_objekt();
        zvuk3();
        
        vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
        return true;
    }
        
    if (Math.pow(novax-this.centarx+this.sirina/2, 2) + Math.pow(novay-this.centary+this.visina/2, 2) < radijus * radijus) {
        // interakcija sa gornjim lijevim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, loptavx, loptavy, this.centarx-this.sirina/2, this.centary-this.visina/2);
        loptay += dt1 / 1000 * loptavy;
        loptax += dt1 / 1000 * loptavx;
        var fi = Math.atan( (loptay-this.centary+this.visina/2)/(this.centarx-this.sirina/2-loptax) );
        fi = -1*fi;
        //console.log('udario si u lijevi gornji rub ' + dt1);
        //console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + loptavx + ' / ' + loptavy  );
            
        var vx = [loptavx], vy = [loptavy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        //vxc[0] *= -1;
        if (!(lopta.power && !this.tvrdi))  vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        loptavx = vx[0]; loptavy = vy[0];
            
        loptax += (dt-dt1) / 1000 * loptavx;
        loptay += (dt-dt1) / 1000 * loptavy;
            
        this.ukloni_objekt();
        zvuk3();
        
        vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
        return true;
    }
        
    if (Math.pow(novax-this.centarx-this.sirina/2, 2) + Math.pow(novay-this.centary+this.visina/2, 2) < radijus * radijus) {
        // interakcija sa gornjim desnim kutom
        var dt1 = vrijeme_udara_u_rub(loptax, loptay, radijus, loptavx, loptavy, this.centarx+this.sirina/2, this.centary-this.visina/2);
        loptay += dt1 / 1000 * loptavy;
        loptax += dt1 / 1000 * loptavx;
        var fi = Math.atan( (loptay-this.centary+this.visina/2)/(this.centarx+this.sirina/2-loptax) );
        fi = -1*fi;
        //console.log('udario si u lijevi gornji rub ' + dt1);
        //console.log( loptax + ' / ' + loptay + ' / ' + radijus + ' / ' + loptavx + ' / ' + loptavy  );
            
        var vx = [loptavx], vy = [loptavy];
        var vxc = [0], vyc = [0];
        transform1(vx, vy, vxc, vyc, fi);
        //vxc[0] *= -1;
        if (!(lopta.power && !this.tvrdi))  vxc[0] *= -1;
        transform2(vx, vy, vxc, vyc, fi);
        loptavx = vx[0]; loptavy = vy[0];
            
        loptax += (dt-dt1) / 1000 * loptavx;
        loptay += (dt-dt1) / 1000 * loptavy;
            
        this.ukloni_objekt();
        zvuk3();
        
        vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, this.fi);
        return true;
    }
        
    return false;  
}

function vrati_lopti_varijable(lopta, loptax, loptay, loptavx, loptavy, fi) {
    if (fi === 0) {
        lopta.vx = loptavx;
        lopta.vy = loptavy;
        lopta.centarx = loptax;
        lopta.centary = loptay;
    } else {
        var vxc = [loptavx]; var vyc = [loptavy];
        var vx = [0]; var vy = [0];
        transform2(vx, vy, vxc, vyc, fi);
        lopta.vx = vx[0];
        lopta.vy = vy[0];
                
        vxc = [loptax]; vyc = [loptay];
        transform2(vx, vy, vxc, vyc, fi);
        lopta.centarx = vx[0];
        lopta.centary = vy[0];
    }
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
                
                if (lopta.stickyball) {
                    lopta.vx = 0;
                    lopta.vy = 0;
                    this.sticked = true;
                } else {
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
                }
                zvuk2();
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
                zvuk2();
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
                zvuk2();
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
            
            zvuk2();
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
            
            zvuk2();
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
    nacrtaj_pravokutnik(centarx, centary, sirina, vis, boja, 0);
    
    //gornji zid
    centarx = Math.floor(sir/2);
    centary = Math.floor(sirina/2);
                                    this.gornji = sirina;
    console.log('centar je ' + centarx + ' / ' + centary);
    nacrtaj_pravokutnik(centarx, centary, sir, sirina, boja, 0);
    
    //desni zid
    centarx = Math.floor(sir - sirina/2);
    centary = Math.floor(vis/2);
                                    this.desni = sir - sirina;
    console.log('centar je ' + centarx + ' / ' + centary);
    nacrtaj_pravokutnik(centarx, centary, sirina, vis, boja, 0);
    
                                    this.donji = -1;
    if (false) {  // za true crta donji zid
        centarx = Math.floor(sir/2);
        centary = Math.floor(vis - sirina/2);
                                    this.donji = vis - sirina;
        console.log('centar je ' + centarx + ' / ' + centary);
        nacrtaj_pravokutnik(centarx, centary, sir, sirina, boja, 0);
    }
}

function nacrtaj_prvu_pomoc(centarx, centary, sirina, visina) {
// ova funkcija crta kutiju prve pomoci za extra zivot padajuci objekt
    
    var t1 = Math.floor(52/75*sirina);
    var t2 = Math.floor(14/75*sirina);
    var t3 = Math.floor(sirina/10);
    var t4 = Math.floor(sirina/30);
    var t5 = Math.floor(sirina/7.5);
    var el = $("\
        <svg width='" + Math.floor(sirina/5*6) + "' height='" + Math.floor(visina/5*6) + "'> \
            <rect \
                style='opacity:0.5;fill:#ff0000;stroke:#000000;stroke-width:" + t4 + "' \
                height='" + visina + "' \
                width='" + sirina + "' \
                ry='" + t5 + "' \
                rx='" + t5 + "' \
                y = '" + t3 +"' \
                x = '" + t3 +"' />\
            <rect \
                y='" + Math.floor((sirina-t2)/2 + t3) + "' \
                x='" + Math.floor((sirina-t1)/2 + t3) + "' \
                height='" + t2 + "'\
                width='" + t1 + "' \
                style='fill:#ffffff;stroke:none' /> \
                <rect \
                y='" + Math.floor((sirina-t1)/2 + t3) + "' \
                x='" + Math.floor((sirina-t2)/2 + t3) + "' \
                height='" + t1 + "' \
                width='" + t2 + "' \
                style='fill:#ffffff;stroke:none' /> \
        </svg>");
    el.attr('id', 'element_' + idbr);
    idbr++; 
    
    var kor1 =  Math.floor(centarx - sirina/2 - t3 - t4);
    if (kor1 < 1) kor1 = 1;  
    var kor2 =  Math.floor(centary - visina/2 - t3 - t4);
    if (kor2 < 1) kor2 = 1;  
    el.css('grid-column', kor1.toString() + ' / span 1');
    el.css('grid-row', kor2.toString() + ' / span 1');
    
    $('#prostor').append(el);
    return idbr - 1; 
}

function nacrtaj_padajuce_loptice(centarx, centary, sirina, visina, boja) {
// ovu funkciju koristimo za crtanje padajuce loptice koja daje opciju super lopte i opciju extra lopte    
    
    var radijus = Math.floor(visina/2);
    
    var el = $("<svg width='" + Math.floor(sirina*1.2) + "' height='" + Math.floor(visina*1.2) + "'><circle cx='" + Math.floor(sirina*1.2/4) + "' cy='" + Math.floor(visina*1.2/2) + "' r='" + radijus + "' stroke='green' stroke-width='4' fill='" + boja + "' /> \
    <circle cx='" + Math.floor(sirina*2.8/4) + "' cy='" + Math.floor(visina*1.2/2) + "' r='" + radijus + "' stroke='green' stroke-width='4' fill='" + boja + "' /> \
    </svg>");
    
    el.attr('id', 'element_' + idbr);
    idbr++;
    console.log('prosao');
    
    var kor1 =  Math.floor(centarx - 1.0*sirina/2);
    if (kor1 < 1) kor1 = 1;  
    var kor2 =  Math.floor(centary - 1.2*visina/2);
    if (kor2 < 1) kor2 = 1;
    el.css('grid-column', kor1.toString() + ' / span 1');
    el.css('grid-row', kor2.toString() + ' / span 1');
    
    $('#prostor').append(el);
    return idbr - 1;
}

function nacrtaj_padajucu_lopticu(centarx, centary, sirina, visina, boja) {
// ovu funkciju koristimo za crtanje padajuce loptice koja daje opciju super lopte i opciju extra lopte    
    
    var radijus = Math.floor(sirina+visina)/4;
    
    var el = $("<svg width='" + Math.floor(sirina*1.2) + "' height='" + Math.floor(visina*1.2) + "'><circle cx='" + Math.floor(sirina*1.2/2) + "' cy='" + Math.floor(visina*1.2/2) + "' r='" + radijus + "' stroke='green' stroke-width='4' fill='" + boja + "' /></svg>");
    el.attr('id', 'element_' + idbr);
    idbr++;
    
    var kor1 =  Math.floor(centarx - 50/2);
    if (kor1 < 1) kor1 = 1;  
    var kor2 =  Math.floor(centary - 50/2);
    if (kor2 < 1) kor2 = 1;
    el.css('grid-column', kor1.toString() + ' / span 1');
    el.css('grid-row', kor2.toString() + ' / span 1');
    
    $('#prostor').append(el);
    return idbr - 1;
}

function nacrtaj_ljepilo(centarx, centary, sirina, visina, boja) {
// ovu funkciju koristimo za crtanje sticky_ball padajuceg objekta
    var el = $("<div></div>");
    el.attr('id', 'element_' + idbr);
    idbr++;
    
    el.css('background-color', boja);  
    var kor1 =  Math.floor(centarx - sirina/2);
    if (kor1 < 1) kor1 = 1;  
    var kor2 =  Math.floor(centary - visina/2);
    if (kor2 < 1) kor2 = 1;
    el.css('grid-column', kor1.toString() + ' / span ' + sirina.toString());
    el.css('grid-row', kor2.toString() + ' / span ' + visina.toString());
    el.css('background-image', 'url("ljepilo.svg")');
    el.css('background-repeat', 'no-repeat');
    el.css('background-size', 'cover');
    el.css('border-radius', '5px');
    
    $('#prostor').append(el);
    return idbr - 1;  
}

function nacrtaj_pravokutnik(centarX, centarY, sirina, visina, boja, fi) {
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
    if (fi !== 0)  el.css('transform', 'rotate(' + fi.toString() + 'deg)');  
    
    $('#prostor').append(el);
    //console.log('upravo sam dodao pravokutnik ' + el.attr('id'));
    //console.log('dodali smo element sa id ' + el.attr('id'));
    //console.log('grid-column', kor1.toString() + ' / span ' + sirina.toString());
    //console.log('grid-row', kor2.toString() + ' / span ' + visina.toString());
    return idbr - 1;
}

function pusti_zvuk(broj) {
    var count = 0;
    var br = 10;
    var polje = [];
    for (var i = 0; i < br; i++) {
        polje.push(new Audio('zvuk' + broj + '.mp3'));
    }
    
    function fun() {
        polje[count%br].play();
        count++;
    }
    return fun;
}

function postavi_level(level) {$('#level > .brojac').html(level.toString());}
function postavi_bodove(bodovi) {$('#bodovi > .brojac').html(bodovi.toString());}
function postavi_zivote(lives) {$('#zivoti > .brojac').html(lives.toString());}
function postavi_vrijeme(time) {$('#vrijeme > .brojac').html(time.toString());}

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

function updejtaj_time2() {
// za flag=true se radi o prvom pozivu funkcije i postavljas unutarnji timer, za false se
// unutarnji timer vrti prema nuli
    var tim = 0;
    
    function fun(flag) {
        console.log('pokrenuli smo FUN. ' + tim);
        if (flag) tim = time;
        tim--;
        if (zadnji_padajuci == 0)  zadnji_padajuci = id_vrijeme2;
        if (zadnji_padajuci == id_vrijeme2)  postavi_vrijeme(tim);
        if (tim == 0) {
            console.log('timer je gotov');
            //clearTimeout(id_vrijeme);
            lopta.stickyball = false;
            $('#lopta').css('background-color', boja(lopta));
            if (zadnji_padajuci == id_vrijeme2)  zadnji_padajuci = 0;
        } else {
            if (zadnji_padajuci == id_vrijeme2) {
                id_vrijeme2 = setTimeout(updejtaj_vrijeme2, 1000, false);
                zadnji_padajuci = id_vrijeme2;
            } else  setTimeout(updejtaj_vrijeme2, 1000, false);
        }
    }
    return fun;
}

function updejtaj_time1() {
// za flag=true se radi o prvom pozivu funkcije i postavljas unutarnji timer, za false se
// unutarnji timer vrti prema nuli
    var tim = 0;
    
    function fun(flag) {
        console.log('pokrenuli smo FUN. ' + tim);
        if (flag) tim = time;
        tim--;
        if (zadnji_padajuci == 0)  zadnji_padajuci = id_vrijeme1;
        if (zadnji_padajuci == id_vrijeme1)  postavi_vrijeme(tim);
        if (tim == 0) {
            console.log('timer je gotov');
            //clearTimeout(id_vrijeme);
            lopta.power = false;
            $('#lopta').css('background-color', boja(lopta));
            if (zadnji_padajuci == id_vrijeme1)  zadnji_padajuci = 0;
        } else {
            if (zadnji_padajuci == id_vrijeme1) {
                id_vrijeme1 = setTimeout(updejtaj_vrijeme1, 1000, false);
                zadnji_padajuci = id_vrijeme1;
            } else  setTimeout(updejtaj_vrijeme1, 1000, false);
        }
    }
    return fun;
}

function updejtaj_time() {
// za flag=true se radi o prvom pozivu funkcije i postavljas unutarnji timer, za false se
// unutarnji timer vrti prema nuli
    var tim = 0;
    
    function fun(flag) {
        console.log('pokrenuli smo FUN. ' + tim);
        if (flag) tim = time;
        tim--;
        if (zadnji_padajuci == 0)  zadnji_padajuci = id_vrijeme;
        if (zadnji_padajuci == id_vrijeme)  postavi_vrijeme(tim);
        if (tim == 0) {
            console.log('timer je gotov');
            //clearTimeout(id_vrijeme);
            var v = Math.sqrt(lopta.vx*lopta.vx + lopta.vy*lopta.vy);
            if (v != 0) {
                lopta.vx *= lopta.vl / v;
                lopta.vy *= lopta.vl / v;
            }
            $('#lopta').css('background-color', boja(lopta));
            document.getElementById("zvuk9").play();
            lopta.spora = false;
            if (zadnji_padajuci == id_vrijeme)  zadnji_padajuci = 0;
        } else {
            if (zadnji_padajuci == id_vrijeme) {
                id_vrijeme = setTimeout(updejtaj_vrijeme, 1000, false);
                zadnji_padajuci = id_vrijeme;
            } else  setTimeout(updejtaj_vrijeme, 1000, false);
        }
    }
    return fun;
}

function boja(lopta) {
// ova funkcija nakon isteka bonusa gleda da li je jos neki bonus prisutan i daje pripadajucu boju lopti    
    if (lopta.power) return 'red'; 
    else if (lopta.stickyball) return '#03f8fc';
    return 'yellow';
}

function makni_poruku() {  $('#poruka').remove() }

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
            if (novi_level) {
                novi_level = false;
                $('#prostor').empty();
                level++;
                set_up_game(level);
                break;
            }
        
            if (gameoverfl) {
                $('#prostor').empty();
                level = 1;
                bodovi = 0;
                lives = 3;
                
                set_up_game(level);
                //id = setInterval(engine, dt);
                console.log('POSTAVIO sam interval');
                gamefl = true;
                gameoverfl = false;
                break;
            } else if (!gamefl) {
                $('#kraj').remove();
                
                lopta.postavi_na_reket(reket);
                //set_up_game(1);
                id = setInterval(engine, dt);
                console.log('POSTAVIO sam ponovo lopticu na reket');
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
