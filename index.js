function generate() {
    const ouput = document.getElementById("output");

    let form = document.forms.input;
    let first_parent = form.elements.p1.value;
    let second_parent = form.elements.p2.value;

    //Check data

    //get gametes
    p1_gametes = getGametes(first_parent);
    p2_gametes = getGametes(second_parent);

    console.log(p1_gametes);
    console.log(p2_gametes);
    
    let table = merge_parents(p1_gametes, p2_gametes);

    let html_table = createHtml(table);

    ouput.innerHTML = html_table;

}

function createHtml(table) {
    let page = "";
    for (let i = 0; i < table.length; i++) {
        let tr = "<tr>";
        for (let j = 0; j < table[i].length; j++ ) {
            tr += `<th>${table[i][j]}</th>`;
        }
        tr += "</tr>";
        page += tr;
    }
    return page;
}


function merge_parents(p1, p2) {
    let childrens = [];
    for (let i = 0; i < p1.length; i++) {
        let elem = p1[i];

        let children_row = [];
        for (let j = 0; j < p2.length; j++) {
            let child = make_child(elem, p2[j]);
            children_row.push(child);
        }
        children_row.unshift(elem);
        childrens.push(children_row);
    }
    
    let table = [p2_gametes];
    table = table.concat(childrens);
    table[0].unshift(" ");
    return table;
}

function make_child(gamete1, gamete2) {
    let child = "";
    for (let i = 0; i < gamete1.length; i++) {
        let letter = "";
        if (gamete1[i] > gamete2[i]) {
            letter = gamete2[i] + gamete1[i];
        } else if (gamete1[i] < gamete2[i]) {
            letter = gamete1[i] + gamete2[i];
        } else {
            letter = gamete1[i] + gamete2[i];
        }
        
        child += letter;
    }
    return child;
}

function getGametes(string) {
    let first = string[0] + string[1];
    let second = string[2] + string[3];

    let third;
    let values;

    if (string.length > 4) {
        third = string[4] + string[5];
        values = [first, second, third];
    }
    values = [first, second];
    
    let arr = [].concat(values);
    let result = [];
    for (let i = 0; i < 2; i++) {
        let symb = first[i];

        for (let j = 1; j < arr.length; j++) {
            let symb1 = symb;
            let symb2 = symb;
            symb1 += arr[j][0];
            symb2 += arr[j][1];

            if (string.length <= 4) {
                result.push(symb1, symb2);
                continue;
            }

            for (let k = j + 1; k < arr.length; k++) {
                let symb3 = symb + symb2[1] + arr[k][0];
                let symb4 = symb + symb1[1] + arr[k][1];

                symb1 += arr[k][0];
                symb2 += arr[k][1];

                result.push(symb1, symb2, symb3, symb4);
            }
        }
        
    }
    let sorted_result = [];
    
    for (let i = 0; i < result.length; i++) {
        let elem = result[i];

        if (i == result.length - 1) {
            sorted_result.push(result[i]);
            break;
        }

        for (let j = i + 1; j < result.length; j++) {
            
            if (result[j] == elem) {
                break;
            } else if (j == result.length - 1) {
                sorted_result.push(elem);
            }
        }
    }

    return sorted_result;

}
