/*
 * HTML_SECURE_KEYPAD
 * 2018.02.24
 * Writer : Lee Sun Ho
 * Copyright(C)2018 Lee Sun Ho
 * Version 4.0.2
 */
var Client_host = location.hostname;
var Secure_KeyPad_url = "/lsh/Keypad"
var Secure_KeyPad_Use = true;
var Secure_KeyPad_Con = null;
var Secure_KeyPad_Obj = [];
var Secure_KeyPad_cnt = 0;
var usecheckSecureKeyPad = true;
var PKIModulus = 0;
var PKIExponent = 0;
//Test_license 20180215
var License_debug = true;
var License = "DBXkNTZnpMQWxaYGCpcS/WQu4gKhE2arVKIyGrco2rNxOPkEaHecMOgoNqLxfXcEX7YxoK64UoG33W0F+aJR4g==";
var E2E_data = null;
var idbase = false;
var keypadLayer = "keypadLayer";
//RSA Script Load
if(typeof jQuery != 'function'){
	document.write('<script type="text/javascript" src="/Keypad/js/jquery-1.7.2.min.js"></script>');
}
document.write('<script type="text/javascript" src="'+Secure_KeyPad_url+'/js/RSA/Keypad_jsbn.js"></script>');
document.write('<script type="text/javascript" src="'+Secure_KeyPad_url+'/js/RSA/Keypad_rsa.js"></script>');
document.write('<script type="text/javascript" src="'+Secure_KeyPad_url+'/js/RSA/Keypad_prng4.js"></script>');
document.write('<script type="text/javascript" src="'+Secure_KeyPad_url+'/js/RSA/Keypad_rng.js"></script>');

function Keypad_Loading(){
	if(!Secure_KeyPad_Use)
		return false;
	if(usecheckSecureKeyPad){
		if (document.addEventListener) {
		    document.addEventListener("click", checkSecureKeyPad, false);
		} else if (document.attachEvent) {
		    document.attachEvent("onclick", checkSecureKeyPad);
		}
		usecheckSecureKeyPad=false; //이벤트 리스너 적용  후, 체킹 중지.
	}
	var htmlAllColl = document.all;
    for (var j = 0; j < htmlAllColl.length; j++) {
        if (htmlAllColl[j].tagName == "INPUT" && (htmlAllColl[j].getAttribute("Number_keypad") == "on" || htmlAllColl[j].getAttribute("Qwerty_keypad") == "on") && (htmlAllColl[j].type == "text" || htmlAllColl[j].type == "password")) {
        	Secure_KeyPad_Obj[Secure_KeyPad_cnt] = htmlAllColl[j].id;
        	Secure_KeyPad_cnt++;
        	htmlAllColl[j].setAttribute("onclick", "showKeypad();");
        	htmlAllColl[j].setAttribute("readonly", "readonly");
        }
    }
    if(!idbase){
    	 for (var i = 0; i < document.forms.length; i++) {
  	        var frm = document.forms[i];
  	        DrawHiddenElements(frm);
  	    }
    }else{
    	//ID기반의 DOM구조
    	DrawHiddenElementsId();
    }
}

function showKeypad(){
	if(PKIModulus == 0 || PKIExponent == 0){
		alert("Secure KeyPad Setting Error.\n Error Code : -1 ");
	}
	Secure_KeyPad_Con = document.activeElement;
	if(Secure_KeyPad_Con.form == null){
		idbase = true;
	}
	if(document.activeElement.getAttribute("Number_keypad") != null){
		Draw_Number_KeyPad();
	}else if(document.activeElement.getAttribute("Qwerty_keypad") != null){
		Draw_Qwerty_KeyPad();
	}else
		alert("SetKeyboard ERROR");
}

function closeKeypad(){
	document.body.removeChild(document.getElementById(Secure_KeyPad_Con.id + "_keypadLayer"));
	usecheckSecureKeyPad=false; //키패드 제거 후, 체킹 종료.
}

function Draw_Number_KeyPad() {
	//이전 키패드가 있는 경우, 지우고 다시 그린다.
	if(document.getElementById("KeyPadLayer")!=null){
		document.body.removeChild(document.getElementById(document.getElementById("KeyPadLayer").parentNode.id));
	}
    var div1 = document.createElement("DIV");
    div1.id = Secure_KeyPad_Con.id + "_keypadLayer";
    //키패드 형태
	var inn = '<div class="keypad" id="KeyPadLayer">';
	inn += '<table id="Number_keypad">';
	inn += '<colgroup><col width="25%"><col width="25%"><col width="25%"><col width="25%"></colgroup>';
	inn += '<tbody>';
	inn += '<tr><td><button onclick="PressKey('+"1"+');">1</button></td> <td><button onclick="PressKey('+"2"+');">2</button></td> <td><button onclick="PressKey('+"3"+');">3</button></td> <td><button onclick="PressKey('+"'@'"+');" id="dummy"></button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"4"+');">4</button></td> <td><button onclick="PressKey('+"'@'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"5"+');">5</button></td> <td><button onclick="PressKey('+"6"+');">6</button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"7"+');">7</button></td> <td><button onclick="PressKey('+"8"+');">8</button></td> <td><button onclick="PressKey('+"9"+');">9</button></td> <td><button onclick="PressKey('+"0"+');">0</button></td></tr>';
	inn += '<tr><td><button class="keypad_div1" onclick="PressKey('+"'Back'"+');">←</button></td> <td><button onclick="PressKey('+"'Cancle'"+');">취소</button></td> <td colspan="2"><button class="keypad_div1" onclick="PressKey('+"'done'"+');">완료</button></td></tr>';
	inn += '</tbody>';
	inn += '</table>';
	inn += '</div>';
	div1.innerHTML=inn;
	 
    document.body.appendChild(div1);
    //is already in DOM
    usecheckSecureKeyPad = true; //이벤트 리스너를 통한, 이벤트 체킹 시작
}

function Draw_Qwerty_KeyPad() {
	//이전 키패드가 있는 경우, 지우고 다시 그린다.
	if(document.getElementById("KeyPadLayer")!=null){
		document.body.removeChild(document.getElementById(document.getElementById("KeyPadLayer").parentNode.id));
	}
    var div1 = document.createElement("DIV");
    div1.id = Secure_KeyPad_Con.id + "_keypadLayer";
    //키패드 형태
    var inn = '<div class="keypad" id="KeyPadLayer">';
	inn += '<table id="Qwerty_keypad">';
	inn += '<colgroup><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"></colgroup>';
	inn += '<tbody>';
	inn += '<tr class="keypad_div2"><td><button onclick="PressKey('+"1"+');">1</button></td> <td><button onclick="PressKey('+"2"+');">2</button></td> <td><button onclick="PressKey('+"3"+');">3</button></td> <td><button onclick="PressKey('+"4"+');">4</button></td> <td><button onclick="PressKey('+"5"+');">5</button></td> <td><button onclick="PressKey('+"6"+');">6</button></td> <td><button onclick="PressKey('+"7"+');">7</button></td> <td><button onclick="PressKey('+"8"+');">8</button></td> <td><button onclick="PressKey('+"9"+');">9</button></td> <td><button onclick="PressKey('+"0"+');">0</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"'q'"+');">q</button></td> <td><button onclick="PressKey('+"'w'"+');">w</button></td> <td><button onclick="PressKey('+"'e'"+');">e</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'r'"+');">r</button></td> <td><button onclick="PressKey('+"'t'"+');">t</button></td> <td><button onclick="PressKey('+"'y'"+');">y</button></td> <td><button onclick="PressKey('+"'u'"+');">u</button></td> <td><button onclick="PressKey('+"'i'"+');">i</button></td> <td><button onclick="PressKey('+"'o'"+');">o</button></td> <td><button onclick="PressKey('+"'p'"+');">p</button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"'a'"+');">a</button></td> <td><button onclick="PressKey('+"'s'"+');">s</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'d'"+');">d</button></td> <td><button onclick="PressKey('+"'f'"+');">f</button></td> <td><button onclick="PressKey('+"'g'"+');">g</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'h'"+');">h</button></td> <td><button onclick="PressKey('+"'j'"+');">j</button></td> <td><button onclick="PressKey('+"'k'"+');">k</button></td> <td><button onclick="PressKey('+"'l'"+');">l</button></td></tr>';
	inn += '<tr><td><button class="keypad_div1" onclick="PressKey('+"'Caps'"+');">↑</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'z'"+');">z</button></td> <td><button onclick="PressKey('+"'x'"+');">x</button></td> <td><button onclick="PressKey('+"'c'"+');">c</button></td> <td><button onclick="PressKey('+"'v'"+');">v</button></td> <td><button onclick="PressKey('+"'b'"+');">b</button></td> <td><button onclick="PressKey('+"'n'"+');">n</button></td> <td><button onclick="PressKey('+"'m'"+');">m</button></td> <td colspan="2"><button class="keypad_div1" onclick="PressKey('+"'Back'"+');">←</button></td></tr>';
	inn += '<tr><td colspan="3"><button class="keypad_div1" onclick="PressKey('+"'Special'"+');">a/@</button></td> <td colspan="3"><button onclick="PressKey('+"'Cancle'"+');">취소</button></td> <td colspan="5"><button class="keypad_div1" onclick="PressKey('+"'done'"+');">완료</button></td>';
	inn += '</tbody>';
	inn += '</table>';
	inn += '<table id="Capital_keypad">';
	inn += '<colgroup><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"></colgroup>';
	inn += '<tbody>';
	inn += '<tr class="keypad_div2"><td><button onclick="PressKey('+"1"+');">1</button></td> <td><button onclick="PressKey('+"2"+');">2</button></td> <td><button onclick="PressKey('+"3"+');">3</button></td> <td><button onclick="PressKey('+"4"+');">4</button></td> <td><button onclick="PressKey('+"5"+');">5</button></td> <td><button onclick="PressKey('+"6"+');">6</button></td> <td><button onclick="PressKey('+"7"+');">7</button></td> <td><button onclick="PressKey('+"8"+');">8</button></td> <td><button onclick="PressKey('+"9"+');">9</button></td> <td><button onclick="PressKey('+"0"+');">0</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"'Q'"+');">Q</button></td> <td><button onclick="PressKey('+"'W'"+');">W</button></td> <td><button onclick="PressKey('+"'E'"+');">E</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'R'"+');">R</button></td> <td><button onclick="PressKey('+"'T'"+');">T</button></td> <td><button onclick="PressKey('+"'Y'"+');">Y</button></td> <td><button onclick="PressKey('+"'U'"+');">U</button></td> <td><button onclick="PressKey('+"'I'"+');">I</button></td> <td><button onclick="PressKey('+"'O'"+');">O</button></td> <td><button onclick="PressKey('+"'P'"+');">P</button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"'A'"+');">A</button></td> <td><button onclick="PressKey('+"'S'"+');">S</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'D'"+');">D</button></td> <td><button onclick="PressKey('+"'F'"+');">F</button></td> <td><button onclick="PressKey('+"'G'"+');">G</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'H'"+');">H</button></td> <td><button onclick="PressKey('+"'J'"+');">J</button></td> <td><button onclick="PressKey('+"'K'"+');">K</button></td> <td><button onclick="PressKey('+"'L'"+');">L</button></td></tr>';
	inn += '<tr><td><button class="keypad_div1" onclick="PressKey('+"'Nomal'"+');">↑</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'Z'"+');">Z</button></td> <td><button onclick="PressKey('+"'X'"+');">X</button></td> <td><button onclick="PressKey('+"'C'"+');">C</button></td> <td><button onclick="PressKey('+"'V'"+');">V</button></td> <td><button onclick="PressKey('+"'B'"+');">B</button></td> <td><button onclick="PressKey('+"'N'"+');">N</button></td> <td><button onclick="PressKey('+"'M'"+');">M</button></td> <td colspan="2"><button class="keypad_div1" onclick="PressKey('+"'Back'"+');">←</button></td></tr>';
	inn += '<tr><td colspan="3"><button class="keypad_div1" onclick="PressKey('+"'Special'"+');">a/@</button></td> <td colspan="3"><button onclick="PressKey('+"'Cancle'"+');">취소</button></td> <td colspan="5"><button class="keypad_div1" onclick="PressKey('+"'done'"+');">완료</button></td>';
	inn += '</tbody>';
	inn += '</table>';
	inn += '<table id="Special_keypad">';
	inn += '<colgroup><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"><col width="9%"></colgroup>';
	inn += '<tbody>';
	inn += '<tr class="keypad_div2"><td><button onclick="PressKey('+"'`'"+');">`</button></td> <td><button onclick="PressKey('+"'~'"+');">~</button></td> <td><button onclick="PressKey('+"'!'"+');">!</button></td> <td><button onclick="PressKey('+"'@'"+');">@</button></td> <td><button onclick="PressKey('+"'#'"+');">#</button></td> <td><button onclick="PressKey('+"'$'"+');">$</button></td> <td><button onclick="PressKey('+"'%'"+');">%</button></td> <td><button onclick="PressKey('+"'^'"+');">^</button></td> <td><button onclick="PressKey('+"'&'"+');">&</button></td> <td><button onclick="PressKey('+"'*'"+');">*</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"'('"+');">(</button></td> <td><button onclick="PressKey('+"')'"+');">)</button></td> <td><button onclick="PressKey('+"'-'"+');">-</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'_'"+');">_</button></td> <td><button onclick="PressKey('+"'+'"+');">+</button></td> <td><button onclick="PressKey('+"'['"+');">[</button></td> <td><button onclick="PressKey('+"'{'"+');">{</button></td> <td><button onclick="PressKey('+"'}'"+');">}</button></td> <td><button onclick="PressKey('+"']'"+');">]</button></td> <td><button onclick="PressKey('+"'='"+');">=</button></td></tr>';
	inn += '<tr><td><button onclick="PressKey('+"'|'"+');">|</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"';'"+');">;</button></td> <td><button onclick="PressKey('+"':'"+');">:</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'/'"+');">/</button></td> <td><button onclick="PressKey('+"'?'"+');">?</button></td> <td><button onclick="PressKey('+"','"+');">,</button></td> <td><button onclick="PressKey('+"'<'"+');"><</button></td> <td><button onclick="PressKey('+"'.'"+');">.</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td></tr>';
	inn += '<tr><td><button class="keypad_div1" onclick="PressKey('+"'Caps'"+');">↑</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'>'"+');">></button></td> <td><button onclick="PressKey('+"'+'"+');">+</button></td> <td><button onclick="PressKey('+"'-'"+');">-</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'*'"+');">*</button></td> <td><button onclick="PressKey('+"'dummy'"+');" id="dummy"></button></td> <td><button onclick="PressKey('+"'/'"+');">/</button></td> <td colspan="2"><button class="keypad_div1" onclick="PressKey('+"'Back'"+');">←</button></td></tr>';
	inn += '<tr><td colspan="3"><button class="keypad_div1" onclick="PressKey('+"'Nomal'"+');">a/@</button></td> <td colspan="3"><button onclick="PressKey('+"'Cancle'"+');">취소</button></td> <td colspan="5"><button class="keypad_div1" onclick="PressKey('+"'done'"+');">완료</button></td>';
	inn += '</tbody>';
	inn += '</table>';
	inn += '</div>';
	div1.innerHTML=inn;
	 
    document.body.appendChild(div1);
    //is already in DOM
    document.getElementById("Qwerty_keypad").style.display = "";
    document.getElementById("Capital_keypad").style.display = "none";
    document.getElementById("Special_keypad").style.display = "none";
    usecheckSecureKeyPad = true; //이벤트 리스너를 통한, 이벤트 체킹 시작
}
/*
 * 2017.04.02 Lee Sun Ho
 * Input KeyPad Dialog
 */
function PressKey(key){
	
    var code = Secure_KeyPad_Con;
    var EncCode = document.getElementById(code.id+"_hid_enc_data");
    var Secure_maxlegth = 0; 
    if(code.maxLength != "-1"){
    	Secure_maxlegth = code.maxLength; //input Element max Length
    }
    if(key == "Back"){
        var Back = "";
        var Enc_Back = "";
        var Enc_Blank = "";
        for(i=0;i<=code.value.length-2;i++){
        	Back = Back + code.value[i];
        }
        code.value = Back;
        EncCode.value = EncCode.value.slice(0, -1);
        Enc_Back = EncCode.value.split("&");
        for(i=0; i< Enc_Back.length-1; i++){
        	Enc_Blank = Enc_Blank + Enc_Back[i] + "&";
        	
        }
        EncCode.value = Enc_Blank;
    }else if(key == "Cancle"){
    	closeKeypad();
    }else if(key == "done"){
    	closeKeypad();
    }else if(key == "dummy"){
    	//dummy 처리
    }else if(key == "Nomal"){
        document.getElementById("Qwerty_keypad").style.display = "";
        document.getElementById("Capital_keypad").style.display = "none";
        document.getElementById("Special_keypad").style.display = "none";
    }else if(key == "Caps"){
        document.getElementById("Qwerty_keypad").style.display = "none";
        document.getElementById("Capital_keypad").style.display = "";
        document.getElementById("Special_keypad").style.display = "none";
    }else if(key == "Special"){
        document.getElementById("Qwerty_keypad").style.display = "none";
        document.getElementById("Capital_keypad").style.display = "none";
        document.getElementById("Special_keypad").style.display = "";
    }else{
    	if(Secure_maxlegth != 0){
    		if(code.value.length < Secure_maxlegth){
            	code.value = code.value + "*";
            	EncCode.value = EncCode.value + makeEncData(key.toString()) + "&";
            }else
            	alert(Secure_maxlegth+"자릿수를 모두 입력하셨습니다.");
    	}else{
    		code.value = code.value + "*";
        	EncCode.value = EncCode.value + makeEncData(key.toString()) + "&";
    	}
    }
}
/*
 * 2016.03.08 Lee Sun Ho
 * Draw hidden Field Auto
 */
function DrawHiddenElements(form) {
    try {
    	for(var k = 0; k < Secure_KeyPad_cnt; k++){
    		var e2eEle = findElementByName(form, Secure_KeyPad_Obj[k] + "_hid_enc_data");
    	    if (e2eEle == null) {
    	    	var newEle = document.createElement("input");
    	        newEle.type = "hidden";
    	        newEle.name = Secure_KeyPad_Obj[k] + "_hid_enc_data";
    	        newEle.id = Secure_KeyPad_Obj[k] + "_hid_enc_data";
    	        newEle.value = "";
    	        form.appendChild(newEle);
    	    }else {
    	    	e2eEle.value = "";
    	    }	
    	}
    	//license Draw 20170507
    	var licEle = findElementByName(form, "hid_lic_data");
        if(licEle == null){
        	var newEle = document.createElement("input");
	        newEle.type = "hidden";
	        newEle.name = "hid_lic_data";
	        newEle.id = "hid_lic_data";
	        newEle.value = Client_host + "$" + License + "$" + License_debug;
	        form.appendChild(newEle);
        }
        //PKI hidden Element Draw 20180107
    	var SR_Pub_Ele = findElementByName(form, "SR_Pub");
        if(SR_Pub_Ele == null){
        	var newEle = document.createElement("input");
	        newEle.type = "hidden";
	        newEle.name = "SR_Pub";
	        newEle.id = "Pub_Module";
	        newEle.value = PKIModulus;
	        form.appendChild(newEle);
        }
    	var SR_Ex_Ele = findElementByName(form, "SR_Ex");
        if(SR_Ex_Ele == null){
        	var newEle = document.createElement("input");
	        newEle.type = "hidden";
	        newEle.name = "SR_Ex";
	        newEle.id = "Pub_Exponent";
	        newEle.value = PKIExponent;
	        form.appendChild(newEle);
        }
    } catch (e) {
    	for(var k = 0; k < Secure_KeyPad_cnt; k++){
    		var e2eEle2 = document.getElementById(Secure_KeyPad_Obj[k] + "_hid_enc_data");
    		if(e2eEle2 != null){
    			break;
    		}else{
    			var newEle = document.createElement("input");
    	        newEle.type = "hidden";
    	        newEle.name = Secure_KeyPad_Obj[k] + "_hid_enc_data";
    	        newEle.id = Secure_KeyPad_Obj[k] + "_hid_enc_data";
    	        newEle.value = "";
    	        form.appendChild(newEle);
    		}
    	}
    }
}
function DrawHiddenElementsId() {
    try {
    	for(var k = 0; k < Secure_KeyPad_cnt; k++){
    		var e2eEle = document.getElementById(Secure_KeyPad_Obj[k] + "_hid_enc_data");
    		if (e2eEle == null) {
    			var newEle = document.createElement("input");
    			newEle.type = "hidden";
    			newEle.name = Secure_KeyPad_Obj[k] + "_hid_enc_data";
    			newEle.id = Secure_KeyPad_Obj[k] + "_hid_enc_data";
    			newEle.value = "";
    			document.body.appendChild(newEle);
   			}else {
   				e2eEle.value = "";
    		}
    	}
    	//license Draw 20170507
    	var licEle = document.getElementById("hid_lic_data");
    	if(licEle == null){
	        var newEle = document.createElement("input");
 	        newEle.type = "hidden";
 	        newEle.name = "hid_lic_data";
 	        newEle.id = "hid_lic_data";
 	        newEle.value = Client_host + "$" + License + "$" + License_debug;
 	        document.body.appendChild(newEle);
	    }
    	 //PKI hidden Element Draw 20180107
    	var SR_Pub_Ele = document.getElementById("Pub_Module");
        if(SR_Pub_Ele == null){
        	var newEle = document.createElement("input");
	        newEle.type = "hidden";
	        newEle.name = "SR_Pub";
	        newEle.id = "Pub_Module";
	        newEle.value = PKIModulus;
	        document.body.appendChild(newEle);
        }
    	var SR_Ex_Ele = document.getElementById("Pub_Exponent");
        if(SR_Ex_Ele == null){
        	var newEle = document.createElement("input");
	        newEle.type = "hidden";
	        newEle.name = "SR_Ex";
	        newEle.id = "Pub_Exponent";
	        newEle.value = PKIExponent;
	        document.body.appendChild(newEle);
        }
    } catch (e) {
    }
}
function findElementByName(formObj, eleName) {
    try {
    	if (eleName == null) {
            return null;
        }
        var findEle = null;
        var len = formObj.elements.length;
        for (var k = 0; k < len; k++) {
            if (eleName == formObj.elements[k].name) {
                findEle = formObj.elements[k];
            }
        }
        return findEle;
    } catch (e) {

    }
}
/*
 * 2016.02.28 Lee Sun Ho
 */
function makeEncData(key){
	var rsa = new RSAKey();
	rsa.setPublic(document.getElementById("Pub_Module").value,document.getElementById("Pub_Exponent").value);
	var encrypt = rsa.encrypt(key);
	E2E_data = encrypt;
	return E2E_data;
}
/*
 * 2016.09.16 Lee Sun Ho
 * Add click Event
 */
function checkSecureKeyPad(nsEvent) {
	if(usecheckSecureKeyPad == false)
		return false;
	if(nsEvent.srcElement.getAttribute("onclick") == "showKeypad();" || nsEvent.srcElement.getAttribute("onfocus") == "showKeypad();"){
		return false;
	}
    var inputObj;
    if (nsEvent.type == "text" || nsEvent.type == "password") {
          inputObj = event;
    } else {
          nsEvent = nsEvent ? nsEvent : window.event;
          inputObj = nsEvent.target ? nsEvent.target : nsEvent.srcElement;
    }
    var SecureKeyPad_Div = document.getElementById(Secure_KeyPad_Con.id + "_keypadLayer");
    if (SecureKeyPad_contains(SecureKeyPad_Div, inputObj, true) == false) {
    	closeKeypad();
    }
}
function SecureKeyPad_contains(parent, child, deep)
{
	try{
	    if (parent == child)
	          return true;
	    var items = parent.children;
	    var count = items.length;
	
	    for ( var i = 0; i < count; i++) {
	          if (items[i] == child)
	                 return true;
	          if (deep == true && SecureKeyPad_contains(items[i], child, deep))
	                 return true;
	    }
	    return false;
	}catch(e){
		console.log("erroe : " + e );
	}
}
function mobileOSCheck(){
	var resultmobile = false;
	if(navigator.userAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		resultmobile = true;
	}
	return resultmobile;
}
/*
 * 2016.12.02 Lee Sun Ho
 * Auto Solution Load
 */
if(typeof jQuery == 'function'){
	$(document).ready(function(){
		if (typeof Secure_KeyPad_page != "string" && Secure_KeyPad_Use){
			Keypad_Loading();
		}else{
		}
	});
}else{
	window.onload = function () {
		if (typeof Secure_KeyPad_page != "string" && Secure_KeyPad_Use){
			Keypad_Loading();
		}else{
		} 
	}
	console.log("jQuery is not Use");
}