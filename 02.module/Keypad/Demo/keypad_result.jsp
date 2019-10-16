<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="KeyPad_Crypto.*"%>
<%@ page import="java.security.PrivateKey"%>
<%
/*Encdata*/		String encrypt_1 = request.getParameter("p_txt1_hid_enc_data");
				String encrypt_2 = request.getParameter("p_txt2_hid_enc_data");
/*License*/		String hid_lic_data = request.getParameter("hid_lic_data");
/*Library*/	
				String decrypt_1 = KeyPad_E2ECrypto.KeyPad_decrypt_block((PrivateKey)request.getSession().getAttribute("__rsaPrivateKey__"), encrypt_1, hid_lic_data);
				String decrypt_2 = KeyPad_E2ECrypto.KeyPad_decrypt_block((PrivateKey)request.getSession().getAttribute("__rsaPrivateKey__"), encrypt_2, hid_lic_data);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
	<form name="result_form">
		<b>E2E Check</b><br>
		<%
			out.println("Number : " + "<BR>");
			out.println("E2E_Enc_Pass : " + encrypt_1 + "<BR>");
			out.println("E2E_Dec_Pass : " + decrypt_1 + "<BR>");
			out.println("Qwerty : " + "<BR>");
			out.println("E2E_Enc_Pass : " + encrypt_2 + "<BR>");
			out.println("E2E_Dec_Pass : " + decrypt_2 + "<BR>");
		%>
	</form>
</body>
</html>