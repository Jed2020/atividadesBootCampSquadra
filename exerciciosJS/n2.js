const bus = [2, 8, 9, 5, 4, 6, 0, 7, 1, 3];
let index = bus.indexOf(secondMinimum(bus));

function secondMinimum(arr){
    let minimum = Math.min(...arr)

    let i = 1
    let second

    while(true){
        second = minimum + i

        if(arr.includes(second)){
            return second
        }

        i++
    }
}

console.log("O segundo passageiro mais novo do ônibus tem " + secondMinimum(bus) + " ano(s) e está na cadeira " + index + ".");