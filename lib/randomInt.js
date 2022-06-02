module.exports = function() {
    const getRandomInt = (max) => { 
        return Math.floor(Math.random() * (max - 1) + 1);
      
    }

    return {
        getRandomInt

    }
}