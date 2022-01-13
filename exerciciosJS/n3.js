const bus = [2, 8, 9, 5, 4, 6, 0, 7, 1, 3];
let index = bus.indexOf(sixthMinimum(bus));

function sixthMinimum(arr){
    let maximum = Math.max(...arr)

    let i = 3
    let six

    while(true){
        six = maximum - i

        if(arr.includes(six)){
            return six
        }

        i++
    }
}

console.log("O quarto menor número do array é: " + sixthMinimum(bus) + " e está na posição " + index + ".");