<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="KeyPad_Crypto.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
	//라이브러리를 적용하며, 암호세팅을 위한 설정구간
	KeyPad_E2ECrypto rsa = KeyPad_E2ECrypto.getEncKey();
	request.setAttribute("publicKeyModulus", rsa.getPublicKeyModulus());
	request.setAttribute("publicKeyExponent", rsa.getPublicKeyExponent());
	request.getSession().setAttribute("__rsaPrivateKey__", rsa.getPrivateKey());
	String PKIModulus = rsa.getPublicKeyModulus();
	String PKIExponent = rsa.getPublicKeyExponent();
%>
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
<script type="text/javascript" src="/lsh/Keypad/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/lsh/Keypad/js/Keypad.js" ></script>
<link type="text/css" href="/lsh/Keypad/css/Keypad.css" rel="stylesheet" />
<script>
//공개키 기반의 모듈값을 세팅
var PKIModulus = '<%=PKIModulus%>';
var PKIExponent = '<%=PKIExponent%>';
</script>
<script>
/*Demo Submit Function*/
function SubmitData(formObj) {
	formObj.target = "inner1";	
	formObj.submit();
}
</script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>HTML_KeyPad</title>
</head>
<body>
	<div id="wrap">
			<center>HTML_KeyPad v4.0</center><br>		
			<form method="post" name="input_form" action="keypad_result.jsp">
				<p align="center">
					<b>Number : </b>
					<input type="password" id="p_txt1" name="p_txt1" size="5" Number_keypad="on"><br>
					<b>Qwerty : </b>
					<input type="password" id="p_txt2" name="p_txt2" size="5" maxlength="4" Qwerty_keypad="on">
				</p>
			</form>
			<span class="btn_type01">
			<p align="center">
	           <button type="button" onClick='SubmitData(input_form);' value="결제 진행">결제 진행</button>          
		   </p>
		   </span>
	</div>
		   <li>Submit parameter 확인</li>
	       <div class="box01">
	       		<iframe name="inner1" id="inner1" style="width:95%; height:50%" src=""></iframe>
	       </div>
</body>
<footer><p>&copy; <a href="http://blog.naver.com/tjsgh9000"> Copyright(C)2017 Lee Sun Ho</a></p></footer>
</html>