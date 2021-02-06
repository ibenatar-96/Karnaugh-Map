var btnGen = document.getElementById("generate");
var btnCl = document.getElementById("generate");
var method;
var rowSize = 1;
var colSize = 1;
var table = document.getElementById('tab');
var map = [];

function generate2(){
    clearTable();
    var grayRow = generateGrayarr(rowSize);
    var grayCol = generateGrayarr(colSize);
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
            console.log(results);
            var ch = parseInt(results[(r*colSize)+c].value);
            if(ch!=0 && ch!=1 && ch!=-1){
                throw alert("Please insert correct numbers");
            }
            map2[r][c] = ch;
        }
    }
    console.log(map2);
    return map2;
}
function retres(){
    map = calculate();
    for(var row=0; row<rowSize; row++){
        for(var col=0; col<colSize; col++){
        }
    }
}
function pos(){
    method = 0;
}
function sop(){
    method = 1;
}
function changeVars(value){
    if(value=="Var2"){
        rowSize = Math.pow(2,1);
        colSize = Math.pow(2,1);
    }
    if(value=="Var3"){
        rowSize = Math.pow(2,1);
        colSize = Math.pow(2,2);
    }
    if(value=="Var4"){
        rowSize = Math.pow(2,2);
        colSize = Math.pow(2,2);
    }
    if(value=="Var5"){
        rowSize = Math.pow(2,2);
        colSize = Math.pow(2,3);
    }
    if(value=="Var6"){
        rowSize = Math.pow(2,3);
        colSize = Math.pow(2,3);
    }
    generate2();
}
console.log(map);