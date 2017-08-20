<script>
var pat = /Subscribe|Playlist|link|Check us out on/ig;
function convert_time(duration) {
    var a = duration.match(/\d+/g);
    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) { a = [0, a[0], 0];}
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {    a = [a[0], 0, a[1]];    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {        a = [a[0], 0, 0];    }
    duration = 0;
    if (a.length == 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
    }
    if (a.length == 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
    }
    if (a.length == 1) {
        duration = duration + parseInt(a[0]);
    }
    var h = Math.floor(duration / 3600);
    var m = Math.floor(duration % 3600 / 60);
    var s = Math.floor(duration % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
} 

function randomDate(year,startm, endm) {
 var m = 0;
 while(m<startm || m>endm) {m = Math.floor(Math.random()*endm)+1;}
 var d= 0;
 while (d==0) {d = Math.floor(Math.random()*29)};
 var h = Math.floor(Math.random()*12);
 var min = Math.floor(Math.random()*60);
 var sec = Math.floor(Math.random()*60);
 if(m.toString().length<2){m="0"+m.toString();}
 if(d.toString().length<2){d="0"+d.toString();}
 if(h.toString().length<2){h="0"+h.toString();}
 if(min.toString().length<2){min="0"+min.toString();}
 if(sec.toString().length<2){sec="0"+sec.toString();}
 dat = year+"-"+m+"-"+d+"T"+h+":"+min+":"+sec+".000-07:00";
 return dat;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function sel() {
 var title = document.getElementById("ttl");
 title.select();
}


// --------------
function  getinf() {
var ids;
var str="";
var ids = document.getElementById("yid").value.split("\n");
ids = ids.filter(function(x){return (x !== (undefined || ''));});
 var l = document.getElementById("tap");
 var tap = l.options[l.selectedIndex].value;
 if(tap=="single") {n=ids.length;} else {n=1;}
if (ids.length>50){alert("Maximun 50 ids please!"); return false;}
for (j=0; j<n; j++){if(j==0){str=ids[0];} else{str=str+","+ids[j];}}
$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+str+'&key=AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw&part=snippet,contentDetails&callback=?',function(data){
var all ="";
var it, y;
var t="";
for(i=0; i<data.items.length; i++){
 if (typeof(data.items[i]) != "undefined") {
 if(data.items[i].snippet.title != "Rejected video"){
 var du = data.items[i].contentDetails.duration;
 if(typeof(data.items[i].snippet.tags) != "undefined"){
 var tag = data.items[i].snippet.tags;
 var at = "," + tag.toString() + ",";
 var p = /,\S+,/g;
 var st = at.replace(p,",");
 if(st[st.length-1] == ","){st = st.substring(0,st.length-1);}
 if(st[0] == ","){st = st.substring(1,st.length-1);}
 } else { var st = "-"; }
 //  var time = convert_time(du);
 var t= data.items[i].snippet.title;
 var d = data.items[i].snippet.description;
  d = d.replace(/\r/ig," ");
  d = d.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
  d = d.replace(/\s\S+(\.net$|\.com$|\.vn$)/gi,'');
  d = d.replace(pat,"");
  d = d.replace(/\n/ig,"&lt;br\/&gt;");
  d = d.trim();
     var id = data.items[i].id;
  it = id+"@"+t+"@"+d+"@"+st;
 } else {it =id+"@"+"DELETED";}
  if(i==0){all=it;} else { all =all+ "\n"+ it ; }
   } else {
    alert('video not exists');
 } 
}
 document.getElementById("info").innerHTML = all;
 document.getElementById("info").select();
});
}


function getout() {
    var y = document.getElementById("info");
    var t = document.getElementById("ttl");
    var c = document.getElementById("out");
    var s = y.value;
 var  s = s.split("\n");
 s = s.filter(function(x){return (x !== (undefined || ''));});
 var aa=[];
 for(i=0; i<s.length; i++){
  var ds =s[i].split("@");
  var ao={};
  ao.id=ds[0];
  ao.title=ds[1];
  ao.des=ds[2];
  ao.tag=ds[3];
  aa.push(ao);
 }
//date 
 var today = new Date();
 var yy = today.getFullYear();
 var mm = today.getMonth();
 var d = document.getElementById("syear");
 var ms= document.getElementById("smonth");
 var ye = document.getElementById("eyear");
 var me = document.getElementById("emonth");
 ms.options[mm].defaultSelected = true;
 me.options[mm+1].defaultSelected = true;
 var ye = d.options[d.selectedIndex].value;
 var smonth = ms.options[ms.selectedIndex].value;
 var emonth = ms.options[ms.selectedIndex].value;

// categories
 var cate = document.getElementById("cats");
 var ca="";
 if(cate.innerHTML !=""){ 
 var cat = cate.value.split("\n");
 cat = cat.filter(function(x){return (x !== (undefined || ''));});
 for(i=0; i<cat.length; i++){ca += cat[i]+",";}
 } else {ca="";}
 
// site
   var b = document.getElementById("site");
 var blogid=b.options[b.selectedIndex].value;
 var htag=b.options[b.selectedIndex].text;
 var site="";
 switch (htag) {
  case "phimhoathinh":
  site="<a href=\"http:\/\/www.phimhoathinh.online\">phim hoạt hình<\/a>";
  break;
 case "phimhot":
  site="<a href=\"http:\/\/www.phimhot.online\">phim hot<\/a>";
  break;
 case "phimtailieu":
  site="<a href=\"http:\/\/www.phimtailieu.info\">phim tài liệu<\/a>";
  break;
 case "phimvn":
  site="<a href=\"http:\/\/www.phimvn.top\">phim Việt Nam<\/a>";
  break;
  }
 
  //select multi
var ids = document.getElementById("yid").value.split("\n");
ids = ids.filter(function(x){return (x !== (undefined || ''));});
var l = document.getElementById("tap");
var tap = l.options[l.selectedIndex].value;
var idstr="";
if(tap=="multi") {
 var q=1;
 for(j=0; j<ids.length; j++){
  if(j<ids.length-1){
   idstr +=j+1+";"+ ids[j] +"|";  
  } else {idstr +=j+1+";"+ids[j];}
  } 
 idstr = "[s]YT[\/s][id]" + idstr + "[\/id]";
} else {var q= s.length;}
  
//code
var h="";
var r=/(\'|Hay Nhất|Full|HD|Hay Nhất|kênh Phim Hoạt Hình Việt Nam|Mới Nhất 2017|Mới Nhất 2016|Cực Hay|Thuyết Minh|vietsub|Vietsub|Đặc Sắc|Full HD| 2017| POPS Kids| Kênh POPS Kids)/ig; //remove unuseful
for(i=0; i<q; i++) { 
var dat = randomDate(ye,smonth,emonth);
var tt = aa[i].title.replace(r,"");
 tt = tt.replace(/\&/g,"and");
 tt = tt.replace(/2016|2017/g,"").trim();
var dd = aa[i].des.replace(r,"");
 dd = dd.replace(/\&/g,"and");

var ta = aa[i].tag.replace(r,"");
if(tap=="multi") { tt = tt + " - Trọn bộ " + ids.length + " tập"; }; // title
var code="";
var  x= document.getElementById("codetype");
var z = x.options[x.selectedIndex].value;
if(z==="xml"){
code += "<entry><id>tag:blogger.com,1999:blog-";
code += blogid; //add blogid
code += ".post-191666821862665498<\/id><published>";
code += dat; //add date
code += "<\/published><updated>";
code += dat; //add date
code += "<\/updated><category scheme='http:\/\/schemas.google.com\/g\/2005#kind' term='http:\/\/schemas.google.com\/blogger\/2008\/kind#post'\/><category scheme='http:\/\/www.blogger.com\/atom\/ns#' term='";
code += ca; //categories
code += "'\/><title type='text'>";
code += tt; // title
code += "<\/title><content type='html'>"
 
var te="";
te += "&lt;div class=\"post-pic\"&gt;&lt;img alt=\"";
te += tt; // title
te += "\" src=\"https:\/\/img.youtube.com\/vi\/";
te += aa[i].id; // youtube id
te += "\/0.jpg\" width=\"320\" \/&gt;&lt;\/div&gt;&lt;div class=\"post-text\"&gt;Xem ";
te += site.replace(/</g,"&lt;").replace(/>/g,"&gt;");
te +=" - &lt;strong&gt;";
te += tt;  // title
te += ".&lt;\/strong&gt;";
te += ""; // tap
te += "&lt;\/div&gt;&lt;div class=\"description\"&gt;";
te += dd; // description
te += "&lt;\/div&gt;&lt;div class=\"hashtags\"&gt;Tags: ";
te += ta.replace(/,/g,", ") + ", #" + htag; //tags
te += "&lt;\/div&gt;"
te +="&lt;br \/&gt;&lt;a name='more'&gt;&lt;\/a&gt;&lt;div id=\"idkey\" &gt;";
if(tap==="multi") {te +=window.btoa(idstr);} else {
te +=window.btoa("[id]1;" + aa[i].id + "[\/id]"); // youtube id }
te = te.replace("<","&lt;");
te = te.replace(">","&gt;");
te += "&lt;\/div&gt;";
te = te.replace(/<br\/>/ig,"&lt;br \/&gt;");
}
code = code + te;
code += "<\/content><\/entry>";
h+=code + "\n";
} else {
code += "<div class=\"post-pic\"><img src=\"https:\/\/img.youtube.com\/vi\/";
code += aa[i].id;  //id
code += "\/mqdefault.jpg\" alt=\"";
code += tt; //title
code += "\" width=\"320\"><\/div><div class=\"post-text\"> Xem ";
code += site; //hashtag
code += " -<strong> ";
code += tt; //title
code += "<\/strong><\/div><div class=\"description\" >";
code += dd; //descrition
code += "<\/div><div class=\"hashtags\" >";
code += ta.replace(/,/g,", ") +", #"+ htag; //tags
code += "<\/div><br\/><!-- more --><div id=\"idkey\" >";
if(tap=="multi") {code +=window.btoa(idstr);} else {code +=window.btoa("[id]1;" + aa[i].id + "[\/id]");}
code += "<\/div>";
h+=code + "\n";
document.getElementById("post").innerHTML = h;
}
}
c.value = h;
console.log(h);
c.select();
}

function reset(){window.open(window.location.href,"_self");}
</script>