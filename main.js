var method;
var rowSize = 1;
var colSize = 1;
var table = document.getElementById('tab');
var map = [];
var same = [];
var arr = [];

function changeVars(value){
    var val = parseInt(value);
    colSize = Math.pow(2,Math.ceil(val/2));
    rowSize = Math.pow(2,Math.floor(val/2));
    generate2();
}
function generate2(){
    clearTable();
    var grayRow = generateGrayarr(Math.log2(rowSize));
    var grayCol = generateGrayarr(Math.log2(colSize));
    var tr2 = document.createElement('tr');
    tr2.appendChild(document.createElement('th'));
    for(var head=1; head<colSize+1; head++){
        var th = document.createElement('th');
        var text2 = document.createTextNode(grayCol[head-1]);
        th.appendChild(text2);
        tr2.appendChild(th);
    }
    table.appendChild(tr2);
    for(var i=0; i<rowSize; i++){
        var tr = document.createElement('tr');
        for(var j=0; j<colSize+1; j++){
            if(j==0){
                var th = document.createElement('th');
                var text2 = document.createTextNode(grayRow[i]);
                th.appendChild(text2);
                tr.appendChild(th);
                continue;
            }
            var td = document.createElement('td');
            var input = document.createElement('input');
            input.type = "text";
            input.className = "my-input";
            input.style = "width:25px";
            td.append(input)
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function pad(size,n) {
    var s = String(n);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }
  function dec2bin(dec){
      return (dec >>> 0).toString(2);
  }
  function  generateGrayarr(n){
      var N = 1 << n;
      var result = [];
      
      for ( i = 0; i < N; i++) {
          var x = i ^ (i >> 1);
          var r = dec2bin(x);
          result.push(pad(n,r)); 
      }
      return result;
    }
function clearTable(){
    var table = document.getElementById('tab');
    for(var i = table.rows.length - 1; i > -1; i--){
        table.deleteRow(i);
    }
}
function calculate(){
    map2 = new Array(rowSize);
    for(var r=0; r<rowSize; r++){
        map2[r] = new Array(colSize);
    }
    for(var r=0; r<rowSize; r++){
        for(var c=0; c<colSize; c++){
            var results = document.getElementsByClassName("my-input");
            var ch = parseInt(results[(r*colSize)+c].value);
            if(ch!=0 && ch!=1 && ch!=-1){
    //            throw alert("Please insert valid numbers");
                ch = 0; //TO DELETE THIS!!! to add maybe autofill!!!
            }
            map2[r][c] = ch;
        }
    }
    return map2;
}
function retres(){
    if(method != 0 && method != 1){
        throw alert("Please choose a method");
    }
    arr = [];
    map = calculate();
    for(var row=0; row<rowSize; row++){
        for(var col=0; col<colSize; col++){
            for(var i=1; i<rowSize+1 && (row+i)<(rowSize+1); i=i*2){
                for(var j=1; j<colSize+1 && (col+j)<(colSize+1); j=j*2){
                    if(isAllSame(row,col,i,j)){
                        var mul = i*j;
                        arr.push({col,row,i,j,mul});
                    }
                }
            }
        }
    }
    arr.sort(function(a,b) {return b.mul - a.mul});
    cleanArr(arr);
    joinArr(arr);
    calculateVar(arr);
    console.log(arr);
}
function isAllSame(row,col,i,j){
    for(var a=0; a<i; a++){
        for(var b=0; b<j; b++){
            if(map[row+a][col+b] != method & map[row+a][col+b] != -1){
                return false;
            }
        }
    }
    return true;
}
function joinArr(arr){
    var y = 0;
    var x = 0;
    same = [];
    toRem1 = new Set();
    while(y<arr.length){
        if(hasSymCol(arr[y])){
            var col = arr[y].col;
            var row = arr[y].row;
            var i = arr[y].i;
            var j = arr[y].j;
            var mul = 2*arr[y].mul;
            var symcol = true;
            var symrow = false;
            same.push({col,row,i,j,mul,symcol,symrow});
            toRem1.add(y);
        }
        y++;
    }
    while(x<arr.length){
        if(hasSymRow(arr[x])){
            var col = arr[x].col;
            var row = arr[x].row;
            var i = arr[x].i;
            var j = arr[x].j;
            var mul = 2*arr[x].mul;
            var symcol = false;
            var symrow = true;
            same.push({col,row,i,j,mul,symcol,symrow});
            toRem1.add(x);
      }
        x++;
    }
    var v = 0;
    for(var item of toRem1){
        arr.splice(item-v,1);
        v++;
    }
    cleanSame(same);
    debugger;
    mergeSame(same); //here it dissapears!!
    cleanOneLastTime(same);
    removeOverlap();
    console.log(same);
}
function cleanArr(arr){
    for(var x=0 ; x<arr.length; x++){
        var y = x+1;
        while(y<arr.length){
            if((arr[x].col <= arr[y].col & arr[x].col + arr[x].j >= arr[y].col + arr[y].j) && 
                (arr[x].row <= arr[y].row & arr[x].row + arr[x].i >= arr[y].row + arr[y].i)){
                    arr.splice(y,1);
                }
            else{
                y++;
            }
        }
    }
}
function hasSymCol(value){
    if(colSize-value.col-value.j != value.col &&
         isAllSame(value.row, colSize-value.col-value.j,value.i,value.j)){
        return true;
    }
    return false;
}
function hasSymRow(value){
    if(rowSize-value.row-value.i != value.row &&
         isAllSame(rowSize-value.row-value.i, value.col, value.i, value.j)){
        return true;
    }
    return false;
}
function cleanSame(same){
    for(var i=0; i<same.length; i++){
        var j = i+1;
        while(j<same.length){
            if(areSame(same[i], same[j])){
                same.splice(j,1);
            }
            else{
                j++;
            }
        }
    }
}
function areSame(value1,value2){
    if (value1.col + value2.col + value1.j == colSize && value1.row == value2.row &&
        value1.j == value2.j && value1.i == value2.i && value1.mul == value2.mul &&
        value1.symcol == value2.symcol && value1.symrow == value2.symrow){
            return true;
        }
        return false;
}
function mergeSame(same){
    for(var i=0; i<same.length; i++){
        var j = i+1;
        while(j<same.length){
            if(areMergeable(same[i],same[j])){
                same[i].symrow = true;
                same[i].mul = 2*same[i].mul; //return to this, why x2???
                same.splice(j,1);
            }
            else{
                j++;
            }
        }
    }
}
function areMergeable(value1,value2){
    if(value1.row + value2.row + value1.i == rowSize &&  value1.col + value2.col + value1.j == colSize &&
        value1.i == value2.i && value1.j == value2.j && value1.mul == value2.mul &&
        value1.symcol == value2.symcol && value1.symrow == value2.symrow){
            return true;
        }
        return false;
}
function cleanOneLastTime(same){
    for(var k=0; k<same.length; k++){
        var v = k+1;
        while(v<same.length){
            if(same[k].col==same[v].col & same[k].row==same[v].row & same[k].i==same[v].i & same[k].j==same[v].j &
                same[k].symcol==true & same[k].symrow==true & same[v].symrow==true & same[v].symcol==false){
                    same.splice(v,1);
                }
            else if(same[k].col==same[v].col & same[k].row==same[v].row & same[k].i==same[v].i & same[k].j==same[v].j &
                same[k].symcol==true & same[k].symrow==true & same[v].symrow==false & same[v].symcol==true){
                    same.splice(v,1);
                }
            else{
                v++;
            }
        }
    }
}
function calculateVar(arr){
    for(var i=0; i<arr.length; i++){

    }
}
function changeMethod(value){
    method = parseInt(value);
}
function removeOverlap(){
    var overlap = new Array(rowSize);
    for(var r=0; r<rowSize; r++){
        overlap[r] = new Array(colSize);
    }
    for(var i=0; i<rowSize; i++){
        for(var j=0; j<colSize; j++){
            overlap[i][j] = 0;
        }
    }
    for(var k=0; k<arr.length; k++){
        for(var h=0; h<arr[k].i; h++){
            for(var g=0; g<arr[k].j; g++){
                overlap[arr[k].row+h][arr[k].col+g] = overlap[arr[k].row+h][arr[k].col+g] + 1;
            }
        }
    }
//    var changedCol = false;
//    var changedRow = false;
    for(var f=0; f<same.length; f++){
        debugger;
        addOverlap(same[f].row,same[f].col,same[f].i,same[f].j,overlap);
        if(same[f].symcol==true){
            addOverlap(same[f].row,colSize-same[f].col-same[f].j,same[f].i,same[f].j,overlap);
        }
        if(same[f].symrow==true){
            addOverlap(rowSize-same[f].row-same[f].i,same[f].col,same[f].i,same[f].j,overlap);
        }
        if(same[f].symrow==true && same[f].symcol==true){
            addOverlap(rowSize-same[f].row-same[f].i,colSize-same[f].col-same[f].j,same[f].i,same[f].j,overlap);
        }
    }
    var k=0;
    while(k<arr.length){
        var x = true;
        for(var h=0; x==true && h<arr[k].i; h++){
            for(var g=0; x==true && g<arr[k].j; g++){
                overlap[arr[k].row+h][arr[k].col+g] = overlap[arr[k].row+h][arr[k].col+g] - 1;
                if(overlap[arr[k].row+h][arr[k].col+g] == 0){
                    x=false;
                }
                overlap[arr[k].row+h][arr[k].col+g] = overlap[arr[k].row+h][arr[k].col+g] + 1;
                if(x==true && h==arr[k].i-1 && g==arr[k].j-1){
                    arr.splice(k,1);
                    x=false;
                }
            }
        }
        if(x==false){
            k++;
        }
    }
    var w=0;
    console.log(overlap);
}
function addOverlapSym(row,col,i,j,overlap){
    for(var h=0; h<i; h++){
        for(var g=0; g<j; g++){
            overlap[row+h][col+g] = overlap[row+h][col+g] + 1;
        }
    }
}