

//https://bgrins.github.io/spectrum/

//http://blogzinet.free.fr/blog/index.php?post/2013/05/17/Blocage-du-contenu-mixte-dans-Mozilla-Firefox-23-Aurora
//https://davidsimpson.me/2013/10/10/how-to-allow-not-block-mixed-content-in-web-browsers/
//https://bugzilla.mozilla.org/show_bug.cgi?id=886663
// > https://bugzilla.mozilla.org/show_bug.cgi?id=866522
// > https://bugzilla.mozilla.org/show_bug.cgi?id=1014545
//https://www.eff.org/https-everywhere/
//http://stackoverflow.com/questions/14367711/bookmarklet-on-https-page
//http://content-security-policy.com/

/*  Bookmarks */
/* Node */
var ABBDbrushCanvas = "";
var ABBDcanvas = "";
var ABBDbrush = "";
var ABBDslider = "";
var ABBDcolorpicker = "";
var ABBDgomme = "";

/* Variables */
var nodraw = 0;
var drawing = false;
var lastpos = {x:-1,y:-1};
var sizeBrush = 1;
var exa = "#000000";
var eraser = false;
var type = "round"
var firstPos = {x:0,y:0};
var startDrawForms = false;
var modefusion = "source-over";
var hauteurcv = 0;
var largeurcv = 0;

/* Text mod */
var createtextarea = false;
var realCalculation = false;
var editingtxt = false;
var ffamily = "Times, serif";

function on_change(){
  var biggness = ABBDslider.firstChild.value;
  nodraw = 1;
  percent(biggness);
  //toslide(ABBDbrush);
}

function previsuBrush(){
  ABBDslider.addEventListener("mousemove", on_change, true);
}

function offset(elt) {
  var rect = elt.getBoundingClientRect(), bodyElt = document.body;
  return {
      top: rect.top + bodyElt.scrollTop,
      left: rect.left + bodyElt.scrollLeft
  }
}

// Get the context for the canvas brush representation and draw it
function percent(value){
  var ctxBrush = ABBDbrush.getContext("2d");
  sbs(value,ctxBrush);
  sizeBrush = value;
  ABBDbrushCanvas.style.zIndex = 4;
}

/*
* Canvas for brush size
*/
function sbs(size,ctxBrush){
  ctxBrush.lineWidth = 1;
  ctxBrush.strokeStyle = "rgba(100,100,100,1)";
  ctxBrush.fillStyle = "rgba(100,100,100,0.5)";
  ctxBrush.beginPath();
  ctxBrush.clearRect(0,0,200,200);
  if(type == "round"){
      ctxBrush.arc(75, 75, (size/2), 0, Math.PI*2, true);
  }else if(type == "miter"){
      ctxBrush.strokeRect(75-(size/2), 75-(size/2), size, size);
  }
  ctxBrush.stroke();
  ctxBrush.closePath();
}

function stopBrush(ctxBrush){
  //if(editingtxt == false){nodraw = false;}else{nodraw = true;}
  ABBDslider.removeEventListener("mousemove", on_change, true);
  nodraw = editingtxt !== false;
  ctxBrush.clearRect(0,0,200,200);
}

// Git to variable exa the right value
function setColors(){exa = ABBDcolorpicker.value;}

// Set Gum behavior
function setGum(){
  initSoft();
  ABBDgomme.classList.add("active");
  ABBDgomme.nextSibling.classList.remove("on","active");
  var othersNodesTool = document.querySelectorAll(".drawtrait, .drawsquare, .drawcircle, .p6 a");
  for(var nodeTool of othersNodesTool){
    nodeTool.classList.remove("active");
  }
  nodraw = false;
  startDrawForms = false;
  eraser = true;
  modefusion = "destination-out";
}


function runNext(){

  ABBDbrushCanvas = document.getElementById("brush");
  ABBDcanvas = document.getElementById("fwABBDwindow");
  ABBDbrush = document.getElementById("ABBDbrush");
  ABBDslider = document.getElementById("ABBDslider");
  ABBDcolorpicker = document.getElementById("colorpicker");
  ABBDgomme = document.getElementById("gomme");

  hauteurcv = document.documentElement.scrollHeight;
  largeurcv = document.documentElement.scrollWidth;
  var ctxBrush = ABBDbrush.getContext("2d");
  initCV(largeurcv,hauteurcv);
  ABBDcanvas.width  = largeurcv;
  ABBDcanvas.height = hauteurcv;

  ABBDslider.addEventListener("mousedown", previsuBrush, true);
  ABBDslider.addEventListener("mouseup", function(){stopBrush(ctxBrush);}, true);
  window.addEventListener("resize", resizeCanvas, true);
  ABBDcolorpicker.addEventListener("change", setColors, true);
  ABBDgomme.addEventListener("click", setGum, true);

  inittools();
  
  /*

  $b(".p5 span").click(function(e){
      initSoft();
      e.preventDefault();
      $b(".p5 span,.p4 a, .p6 a").removeClass("active").removeClass("on");
      $b(this).addClass("active");
      nodraw = true;
      drawForm();
  })

  $b("#entertext").click(function(e){
      reinitxt();
      $b(".p4 a,.p5 span").removeClass("active").removeClass("on");
      $b(".p6 span").removeClass("hide");
      $b(this).addClass("active");
      $b(".fwABBDcanvas").addClass("crosshairstyle");
      nodraw = true;
      drawing = false;
      startDrawForms = false;         
      editingtxt = true;
      createtextarea = true;
      initTextarea(0,0);
  })

  $b("#eraseall").click(function(e){
      e.preventDefault();
      $b(".ABBDtxtarea").remove();
      clearAll(largeurcv,hauteurcv);
  })

  $b(".close").click(function(e){
      $b(".fwABBDcanvas").remove();
      removeEventListener("mousedown", on_mousedown, true);
      removeEventListener("mousemove", on_mousemove, true);
      removeEventListener("mouseup", on_mouseup, true);
  })
  */
}

function initType(e){
  initSoft();
  typeSelected = e.target;
  typeSelected.classList.add("active");
  ABBDgomme.classList.remove("active");
  startDrawForms = false;
  eraser = false;
  drawing = false;
  if(typeSelected.classList.contains("on")){
    console.log(e.target.notthisone);
    console.log(e.target.usethisclass);
    typeSelected.classList.remove(e.target.notthisone);
    typeSelected.classList.add(e.target.usethisclass);
    type = (e.target.usethisclass == "crayon") ? "round" : "miter";
  }else{
    console.log("end 1");
    typeSelected.classList.add("on");
  }
  typeSelected.removeEventListener("click", initType, false);
  inittools();
}

function initPencilandFeutre(){
  var IconCrayon = document.querySelector(".p4 #pencil.crayon");
  var IconFeutre = document.querySelector(".p4 #pencil.feutre");

  if(IconCrayon){IconCrayon.usethisclass = 'feutre';IconCrayon.notthisone = 'crayon';}
  if(IconFeutre){IconFeutre.usethisclass = 'crayon';IconFeutre.notthisone = 'feutre';}

  //passer en mode carré
  if(IconCrayon) IconCrayon.addEventListener('click', initType, true);
  if(IconFeutre) IconFeutre.addEventListener('click', initType, true);
}

function inittools(){
  modefusion = "source-over";
  createtextarea = false;
  editingtxt = false;
  var nodeForms = document.querySelectorAll(".p5 span");
  for(var nodeForm of nodeForms){
    nodeForm.classList.remove("active");
  }

  initPencilandFeutre();
}

function reinitxt(){
  txtareas = document.querySelectorAll(".fwABBDcanvas .ABBDtxtarea");
  for(var txtarea of txtareas){
    txtarea.style.zIndex = 2;
    txtarea.style.border = "none";
    txtarea.removeAttribute("id");
  }
}

function initSoft(){
  //var canvas = document.getElementById("fwABBDwindow");
  if(document.getElementById("fwABBDwindowTemp")){
    console.log(document.removeChild(tmpcanvas));
  }
  //var ctx = canvas.getContext("2d");
  //$("#fwABBDwindowTemp").remove();
  nodraw = false;
  addEventListener("mousedown", on_mousedown, true);
  addEventListener("mousemove", on_mousemove, true);
  addEventListener("mouseup", on_mouseup, true);
}

function initCV(largeurCanvas,hauteurCanvas){
  var canvas = document.getElementById("fwABBDwindow");
  var canvasTmp = document.getElementById("fwABBDwindowTemp");
  canvas.width = largeurCanvas;
  canvas.height = hauteurCanvas;
  var ctx = canvas.getContext("2d");
  if(canvasTmp){canvasTmp.parentNode.removeChild(temporary);}
  addEventListener("mousedown", on_mousedown, true);
  addEventListener("mousemove", on_mousemove, true);
  addEventListener("mouseup", on_mouseup, true);
}

function on_mousedown(e){
  if(createtextarea == false){drawing = true;}else{drawing = false;}
  lastpos = transform_event_coord(e);
  //console.log("");
}

function on_mousemove(e){

  if (!drawing){
    return;
  }
  if(nodraw==true){
    return;
  }

  var pos = transform_event_coord(e);

  var ctx = ABBDcanvas.getContext("2d");

  ctx.globalCompositeOperation = modefusion;//Mode de superposition des éléments -- pour la gomme
  ctx.strokeStyle = exa;//couleur
  ctx.fillStyle = exa;
  ctx.lineWidth = sizeBrush;//Largeur du trait.
  ctx.lineJoin = type;
  ctx.lineCap = "square";
  if(type == "miter"){
    ctx.lineWidth = sizeBrush;
    ctx.fillRect(pos.x-(sizeBrush/2), pos.y-(sizeBrush/2),sizeBrush ,sizeBrush);
    ctx.strokeRect (pos.x-(sizeBrush/2), pos.y-(sizeBrush/2),0 ,0);//Comptour du carré = 0
  }
  ctx.beginPath();
  ctx.moveTo(lastpos.x, lastpos.y);
  ctx.lineTo(pos.x, pos.y);
  ctx.closePath();
  ctx.stroke();
 
  lastpos = pos;
}

//Call when user release mouse of when he manipulate brush size
function on_mouseup(){
    drawing = false;
}


function transform_event_coord(e){
  var coord = offset(ABBDcanvas);
  //var coordx = window.pageXOffset;//For knowing how much has been scrolled
  //var coordy = window.pageYOffset;
  return{
      //x: coordy - coord.left+e.clientX,
      //y: coordx - coord.top+e.clientY
      x: 0 - coord.left+e.clientX,
      y: 0 - coord.top+e.clientY
  };
}


// Resize the canvas size when user change window size
function resizeCanvas(){
  var wheight = window.innerHeight;
  var wwidth = window.innerWidth;

  var context = ABBDcanvas.getContext("2d");
  var previousDrawing = context.getImageData(0, 0, wwidth, wheight);

  if(wheight>hauteurcv){
      ABBDcanvas.height = wheight;
      hauteurcv = wheight;
      context.putImageData(previousDrawing,0,0);
  }
  if(wwidth>largeurcv){
      canvas.width = wwidth+"px";
      largeurcv = wwidth;
      context.putImageData(previousDrawing,0,0);
  }
}

function addCSS(source){
	var head = document.getElementsByTagName('HEAD')[0];
	var css = document.createElement('link');
	css.setAttribute('type','text/css');
	css.setAttribute('media','screen');
	css.setAttribute('rel','stylesheet');
	css.href = source;
	head.appendChild(css);
}

function defineBehavior(params){
  if(document.getElementById("ABBDbrush")){
    alert("toHide");
  }else{
    runthis(params[0]);
  }

}

function runthis(cssToLoad){
	var wrapper = document.createElement('div');

	wrapper.innerHTML= '<div class="fwABBDcanvas"><div class="fwABBDconsol">'+
      '<div class="part p1">'+
          '<span class="legend">Taille :</span>'+
          '<div id="ABBDslider">'+
              '<input type="range" min="1" max="150" value="1" />'+
          '</div>'+
      '</div>'+
      '<div class="part p2">'+
          '<span class="legend">Couleur :</span>'+
          '<div class="cp"><input type="color" name="colorpicker" id="colorpicker"></div>'+
      '</div>'+
      '<div class="part p4">'+
          '<a href="#" id="gomme" class="off">Mode Gomme</a>'+
          '<a href="#" id="pencil" class="on active crayon">Mode Gomme</a>'+
      '</div>'+
      '<div class="part p5">'+
          '<span class="drawsquare">Carré</span>'+
          '<span class="drawcircle">Cercle</span>'+
          '<span class="drawtrait">Trait</span>'+
          '<span class="drawsquarempty">Trait</span>'+
      '</div>'+
      '<div class="part p3">'+
          '<a href="#" id="eraseall" class="legend">Tout effacer</a>'+
      '</div>'+
      '<div class="part p6">'+
          '<span class="hide active" title="typo a empattement" id="abbdTimes">Sans serif</span>'+
          '<span class="hide" title="typo sans empattement" id="abbdArial">Serif</span>'+
          '<a href="#" id="entertext">Entrer un texte</a>'+
      '</div>'+
      '</div><canvas id="fwABBDwindow">'+
      '</canvas><canvas id="ABBDbrush" height="150" width="150"></canvas>'+
      '</div>';

	var canevas = wrapper.firstChild;
  document.body.appendChild(canevas);
  addCSS(cssToLoad);
  runNext();

  /*
  $b("embed").attr('wmode','transparent');
  */

}

function toslide(){
  console.log("in toslide");
}

/*
(function(){

function loadScript(url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


var isIE = !!window.ActiveXObject;
if(isIE){
    alert("Désolé, la technologie des canvas n'est pas supportÃ© sur votre navigateur :(");
}else{
    if(typeof jQuery == 'undefined'){
        //includeJq();
        loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", function(){
            $b = jQuery.noConflict();
            runthis();
        });
    }else{
        //Si la version de jquery est infÃ©rieur a la 1.2.6., on la met en plus rÃ©cente
        version = jQuery.fn.jquery;
        unit = version.split('.');
        var ok = 0;
        if(unit[0]==1){
            ok = 0;
            if(unit[1]==2){//Si jquery v1.2. et infÃ©rieur
                var ok = 1;
                //includeJq();
                loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", function(){
                    $b = jQuery.noConflict(true);
                    runthis();
                });
            }
        }
        if(ok == 0){
            $b = jQuery.noConflict();
            runthis();
        }
    }
}


//* Fonction canvas Paint *//*

function clearAll(largeurCanvas,hauteurCanvas){
    $b("#fwABBDwindow, #fwABBDwindowTemp").remove();
    $b("#ABBDbrush").before('<canvas id="fwABBDwindow" width="'+largeurCanvas+'" height="'+hauteurCanvas+'"></canvas>');
    init(largeurCanvas,hauteurCanvas);
    if($b("#pencil").hasClass("active") == false && $b("#gomme").hasClass("active") == false){
        nodraw = true;
        if($b(".drawsquare").hasClass("active")==true){
            drawForm();
        }else if($b(".drawcircle").hasClass("active")==true){
            drawForm();
        }else if($b(".drawtrait").hasClass("active")==true){
            drawForm();
        }else if($b(".drawsquarempty").hasClass("active")==true){
            drawForm();
        }else if($b(".p6 span").hasClass("active")==true){
            nodraw = true;
            drawing = false;
            startDrawForms = false;         
            editingtxt = true;
            createtextarea = true;
            initTextarea(0,0);
        }
    }
}


function init(largeurCanvas,hauteurCanvas){
  var canvas = document.getElementById("fwABBDwindow");
  canvas.width=largeurCanvas;
  canvas.height=hauteurCanvas;
  var ctx = canvas.getContext("2d");
  $b("#fwABBDwindowTemp").remove();

    addEventListener("mousedown", on_mousedown, true);
    addEventListener("mousemove", on_mousemove, true);
    addEventListener("mouseup", on_mouseup, true);
}

function initSoftTxt(){
  var canvas = document.getElementById("fwABBDwindow");
  var ctx = canvas.getContext("2d");
  $b("#fwABBDwindowTemp").remove();
}

function drawForm(){
    var canvasRoot = document.getElementById("fwABBDwindow");
    var container = canvasRoot.parentNode;
    canvasTemp = document.createElement('canvas');
    canvasTemp.id     = 'fwABBDwindowTemp';
    canvasTemp.width  = canvasRoot.width;
    canvasTemp.height = canvasRoot.height;
    container.appendChild(canvasTemp);

    exa = $b(".cp div").css("background-color");

    canvasTemp.addEventListener("mousedown", startForm, true);
    canvasTemp.addEventListener("mousemove", CalculForm, true);
    canvasTemp.addEventListener("mouseup", EndForm, true);

}

function startForm(e){
  if(editingtxt==false){startDrawForms = true;}else{startDrawForms = false;}
  nodraw = true;
  eraser = false;
  drawing = false;
  firstPos = transform_event_coord(e);
  var canvasTp = document.getElementById("fwABBDwindowTemp");
  var ctx = canvasTp.getContext("2d");
}

function CalculForm(e){
    if(startDrawForms == true){
        CurPos = transform_event_coord(e);
        var canvasTp = document.getElementById("fwABBDwindowTemp");
        var ctx = canvasTp.getContext("2d");
        ctx.clearRect(0, 0, largeurcv, hauteurcv );
        if($b(".drawsquare").hasClass("active")==true){
            drawRectangle(firstPos,CurPos,ctx);
        }else if($b(".drawcircle").hasClass("active")==true){
            drawCircle(firstPos,CurPos,ctx);
        }else if($b(".drawsquarempty").hasClass("active")==true){
            drawRectanglempty(firstPos,CurPos,ctx);
        }else{
            drawLine(firstPos,CurPos,ctx);
        }
    }
}

function EndForm(e){
    var drawTemp = document.getElementById("fwABBDwindowTemp");
    var canvasRoot = document.getElementById("fwABBDwindow").getContext("2d");
    canvasRoot.globalCompositeOperation = "source-over";
    startDrawForms = false;
    nodraw = true;
    canvasRoot.drawImage(drawTemp,0,0);
}

function drawCircle(pntFrom, pntTo, ctx){
    var centerX = Math.max(pntFrom.x,pntTo.x) - Math.abs(pntFrom.x - pntTo.x)/2;
    var centerY = Math.max(pntFrom.y,pntTo.y) - Math.abs(pntFrom.y - pntTo.y)/2;
    ctx.strokeStyle = exa;//couleur
    ctx.fillStyle = exa;
    ctx.beginPath();
    var distance = Math.sqrt(Math.pow(pntFrom.x - pntTo.x,2) + Math.pow(pntFrom.y - pntTo.y,2));
    ctx.arc(centerX, centerY, distance/2,0,Math.PI*2 ,true);
    ctx.fill();
    ctx.closePath();
}

function drawRectangle(pntFrom, pntTo, ctx){
    ctx.strokeStyle = exa;//couleur
    ctx.fillStyle = exa;
    ctx.beginPath();
    if(pntTo.x > pntFrom.x && pntTo.y > pntFrom.y){
        ctx.fillRect(pntFrom.x, pntFrom.y, pntTo.x - pntFrom.x, pntTo.y - pntFrom.y);
    }else if(pntTo.x > pntFrom.x && pntTo.y < pntFrom.y){
        ctx.fillRect(pntFrom.x, pntTo.y, pntTo.x - pntFrom.x, pntFrom.y - pntTo.y);
    }else if(pntTo.x < pntFrom.x && pntTo.y > pntFrom.y){
        ctx.fillRect(pntTo.x, pntFrom.y, pntFrom.x - pntTo.x, pntTo.y - pntFrom.y);
    }else{
        ctx.fillRect(pntTo.x, pntTo.y, pntFrom.x - pntTo.x , pntFrom.y - pntTo.y );
    }
    ctx.closePath();
}

function drawRectanglempty(pntFrom, pntTo, ctx){
    ctx.strokeStyle = exa;//couleur
    ctx.fillStyle = exa;
    ctx.beginPath();
    ctx.lineWidth = sizeBrush;
    if(pntTo.x > pntFrom.x && pntTo.y > pntFrom.y){
        ctx.strokeRect(pntFrom.x, pntFrom.y, pntTo.x - pntFrom.x, pntTo.y - pntFrom.y);
    }else if(pntTo.x > pntFrom.x && pntTo.y < pntFrom.y){
        ctx.strokeRect(pntFrom.x, pntTo.y, pntTo.x - pntFrom.x, pntFrom.y - pntTo.y);
    }else if(pntTo.x < pntFrom.x && pntTo.y > pntFrom.y){
        ctx.strokeRect(pntTo.x, pntFrom.y, pntFrom.x - pntTo.x, pntTo.y - pntFrom.y);
    }else{
        ctx.strokeRect(pntTo.x, pntTo.y, pntFrom.x - pntTo.x , pntFrom.y - pntTo.y );
    }
    ctx.closePath();
}


function drawLine(pntFrom, pntTo, ctx){
    ctx.strokeStyle = exa;//couleur
    ctx.fillStyle = exa;
    ctx.lineWidth = sizeBrush;//Largeur du trait.
    ctx.beginPath();
    ctx.moveTo(pntFrom.x,pntFrom.y);
    ctx.lineTo(pntTo.x,pntTo.y);
    ctx.stroke();
    ctx.closePath();
}

function initTextarea(txtpntFromx,txtpntFromy){

    initSoftTxt();

    $b("#abbdArial").click(function(){
        $b(this).addClass("active").prev().removeClass("active");
        ffamily = "Arial, sans-serif";
        $b("#thisActive").css("font-family",ffamily).focus();
    })

    $b("#abbdTimes").click(function(){
        $b(this).addClass("active").next().removeClass("active");
        ffamily = "Times, serif";
        $b("#thisActive").css("font-family",ffamily).focus();
    })

    if(createtextarea==true){
        $b("#fwABBDwindow").bind("mousedown",function(e){
            $b(".fwABBDcanvas").append('<div id="ABBDenteringtxt" class="ABBDtxtarea" ></div>');
            $b("#ABBDenteringtxt").css({"top":e.clientY,"left":e.clientX});
            txtpntFromx = e.clientX;
            txtpntFromy = e.clientY;
            realCalculation = true;
            createtextarea = false;
            $b(this).unbind();
            //initSoftTxt();
            initTextarea(e.clientX, e.clientY);
        })
    }

    if(realCalculation==true){
        createtextarea = false;
        $b("#fwABBDwindow").bind("mousemove",function(e){
            var pntTo = transform_event_coord(e);
            //console.log((txtpntFromx-pntTo.x)+"-"+(txtpntFromy-pntTo.y));
            $b("#ABBDenteringtxt").css({"width":(pntTo.x-txtpntFromx)+"px","height":(pntTo.y-txtpntFromy)+"px"});
        })
     
        $b(this).mouseup(function(e){
            var ABBDwrapall = $b("#fwABBDwindow");
            var ABBDpseudoTxtAra = $b("#ABBDenteringtxt");
            ABBDwrapall.unbind("mousemove");
            $b(this).unbind("mouseup");
            $b(this).unbind("mousemove");
            realCalculation = false;
            createtextarea = false;
            editingtxt = true;
            var txtawidth = ABBDpseudoTxtAra.width();
            var txtaheight = ABBDpseudoTxtAra.height();
            var txtapos = ABBDpseudoTxtAra.position();
            if(5>sizeBrush){sizeTxt=12;}else{sizeTxt=sizeBrush;}
            //$b("#ABBDenteringtxt").css({"width":txtawidth+"px","color":exa,"font-size":sizeTxt+'px',"height":txtaheight+'px',"top":txtapos.top+"px","left":txtapos.left+"px"}).addClass("ABBDtxtarea").attr("contentEditable","true").text("Entrez votre texte ici");
            $b("#ABBDenteringtxt").replaceWith('<textarea style="width:'+txtawidth+'px !important;color:'+exa+';font-size:'+sizeTxt+'px;height:'+txtaheight+'px !important;top:'+txtapos.top+'px;left:'+txtapos.left+'px;" id="thisActive" class="ABBDtxtarea">Entrez ici votre texte</textarea>');
            $b("#thisActive").focus();
            $b(".fwABBDcanvas").removeClass("crosshairstyle");
            initTextarea(0,0);
        })
    }

}

})()
*/


self.port.on("init", function(params){

  //console.log(params);
  if(document.doctype != null){
    defineBehavior(params);
  }else{
    alert("Sorry, but this plugin works only on webpage");
    //params[1].disabled = true;
  }
  
});