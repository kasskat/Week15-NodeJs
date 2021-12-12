const fs = require('fs'); //võimaldab kasutab arvuti resursse
const path = require('path'); //tuvastab OS tüüpi (Mac, Windows, Linux)
//teekond failini, mida me soovime kasutada et salvestada andmed
const filePath = path.join(path.dirname(require.main.filename), 'data', 'wishes.json');

//kasutada kuskil mujal,
//loome wish klassi
module.exports = class Wish {
    //konstruktor
    constructor(wish){
        this.description = wish;
    }
    //salvestab soovi failisse
    saveWish() {
        //asendame vana sisu uue sisuga:
        //mis faili soovin (filePath), võin saada error või faili sisu
        fs.readFile(filePath, (error, fileContent) => {
            //massiiv kuhu salvestan andmed
            let wishes = [];

            //kui kõik on OK, siis save, kui on ERROR, siis log kuvab seda
            if(!error) {
                wishes = JSON.parse(fileContent);
            } else {
                console.log(error);
            }

            //vana sisu + uu soov
            wishes.push(this);

            //võtan sisu, teen ühendust failiga lahti, konverteerin JSON failiks, kui on OK, siis save, kui on ERROR, siis IFitame
            fs.writeFile(filePath, JSON.stringify(wishes), (error) => {

                if (!error){
                    console.log('wish saved');
                } else {
                console.log(error);
                }
            });
        });
    }

    static fetchAllWishes(callBack) { //ruum kuhu salvestab andmeid, kui saab neid failist kätte
        fs.readFile(filePath, (error, fileContent) => {
            if(error){
                callBack([]);
            };

            callBack(JSON.parse(fileContent));
        });
    }


}

