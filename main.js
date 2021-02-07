var btnGen = document.getElementById("generate");
var btnCl = document.getElementById("generate");
var method;
var rowSize = 1;
var colSize = 1;
var table = document.getElementById('tab');
var map = [];

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
                throw alert("Please insert valid numbers");
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
    var arr = [];
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
 //   joinArr(arr);
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
    while(y<arr.length){
        if(hasSymCol(arr[y])){
      }
      y++;
    }
    while(x<arr.length){
        if(hasSymRow(arr[x])){
      }
      x++;
    }
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
    if(isAllSame(value.row, colSize-1-value.col,value.i,value.j)){
        return true;
    }
    return false;
}
function hasSymRow(value){
    if(isAllSame(rowSize-1-value.row, value.col, value.i, value.j)){
        return true;
    }
    return false;
}
function calculateVar(arr){
    for(var i=0; i<arr.length; i++){

    }
}
function changeMethod(value){
    method = parseInt(value);
    console.log(method);
}