//var btn = document.getElementById("generate");
var rowSize = 1;
var colSize = 1;
var Map = [];
function changeVars(value){
    if(value=="Var2"){
        rowSize = 1;
        colSize = 1;
    }
    if(value=="Var3"){
        rowSize = 1;
        colSize = 2;
    }
    if(value=="Var4"){
        rowSize = 2;
        colSize = 2;
    }
    if(value=="Var5"){
        rowSize = 2;
        colSize = 3;
    }
    if(value=="Var6"){
        rowSize = 3;
        colSize = 3;
    }
    generate2();
}

function generate2(){
    var table = document.getElementById('tab');
    clearTable();
    var grayRow = generateGrayarr(rowSize);
    var grayCol = generateGrayarr(colSize);
    var tr2 = document.createElement('tr');
    tr2.appendChild(document.createElement('th'));
    for(var head=1; head<Math.pow(2,colSize)+1; head++){
        var th = document.createElement('th');
        var text2 = document.createTextNode(grayCol[head-1]);
        console.log(grayCol);
        th.appendChild(text2);
        tr2.appendChild(th);
    }
    table.appendChild(tr2);
    for(var i=0; i<Math.pow(2,rowSize); i++){
        var tr = document.createElement('tr');
        for(var j=0; j<Math.pow(2,colSize)+1; j++){
            if(j==0){
                var th = document.createElement('th');
                var text2 = document.createTextNode(grayRow[i]);
                console.log(text2);
                th.appendChild(text2);
                tr.appendChild(th);
                continue;
            }
            var td = document.createElement('td');
            var input = document.createElement('input');
            input.type = "text";
            input.style = "width:25px";
            td.append(input)
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    console.log(grayRow,grayCol);
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
console.log(Map);