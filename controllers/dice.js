const setup = require('../lib/randomInt')

const {getRandomInt} = setup();


module.exports = function() {
    const lancer = (req, res, next) => {
        // console.log(req.body.lancer);

        Des = req.body.lancer;
        regexDes = Des.replace("d", ",")

        // console.log(regexDes);
        DiffDes = regexDes.split(',')
        // console.log(DiffDes);
        result = []
        total = 0;
        nbDices = parseInt(DiffDes[0])
        console.log(nbDices);

        for (let i = 0; i < nbDices; i++) {
            resDes = getRandomInt(DiffDes[1])
            total += resDes;
            result[i+1] = resDes
            // result.push(resDes+1)
            
        }
        result[0] = total;
        // for (i in DiffDes){
            
        //     for (let j = 1; j < parseInt(nbDesnbFace[0])+1; j++){
                
        //     }
        // }
        resultString = result.join(',')
        // console.log(resu);
        res.status(201).json({
            message : resultString
          })
        //   return result;
        
    }

    return {
        lancer

    }
}
