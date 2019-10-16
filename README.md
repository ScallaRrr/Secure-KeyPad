# Secure-KeyPad v4.0
Made By ScallaRrr

/*
 * HTML_SECURE_KEYPAD
 * 2018.01.07
 * writer : Lee Sun Ho
 * Copyright(C)2018 Lee Sun Ho
 * Version 4.0
 */

본 제품은 HTML5 웹표준에 의거 하여 만들어진, 보안 가상키패드입니다.

솔루션 적용 가이드를 아래와 같이 작성합니다.

1) SECURE_KEYPAD 암복호화
   
   입력 웹페이지 --> 키패드 레이아웃 --> 서버 --> 결과 웹페이지 까지 각 전달 구간에서 입력값이 탈취 당하지 않도록 암호화하여 전달합니다.

아래는 사용법에 관한 간단한 GUIDE를 정리합니다.

1) 보안을 적용 시킬 페이지에 Keypad.js 및 jQuery를 호출합니다.
   이후, 페이지에 자바코드 및 스크립트로 암호보안키를 세팅합니다.

   //샘플가이드와 같이 필수로 코딩합니다.
   KeyPad_E2ECrypto rsa = KeyPad_E2ECrypto.getEncKey();
   request.setAttribute("publicKeyModulus", rsa.getPublicKeyModulus());
   request.setAttribute("publicKeyExponent", rsa.getPublicKeyExponent());
   request.getSession().setAttribute("__rsaPrivateKey__", rsa.getPrivateKey()); 
   String PKIModulus = rsa.getPublicKeyModulus();
   String PKIExponent = rsa.getPublicKeyExponent();

   <script src="Keypad/js/Keypad.js" type="text/javascript"></script>
   <script src="Keypad/js/jQuery-1.7.2.min.js" type="text/javascript"></script>
   <script>
   //공개키 기반의 모듈값을 세팅
   var PKIModulus = '<%=PKIModulus%>';
   var PKIExponent = '<%=PKIExponent%>';
   </script>

2) 보안을 적용할 input필드의 속성에 원하는 키패드 타입명_keypad="on" attribute를 삽입하여, 키패드를 적용시킵니다.
   - Number_keypad="on"
   - Qwerty_keypad="on"

3) 본 솔루션에서 제공하는 라이브러리를 추가합니다.
   - Secure_KeyPad_v4.0.jar
   - commons-codec-1.10 

4) 복호화 페이지 상단에 암호화 라이브러리 사용방식을 그대로 적용합니다.  
ex) <%@ page import="KeyPad_Crypto.*"%>
    <%@ page import="java.security.PrivateKey"%>
    String encrypt = request.getParameter("보안필드ID_hid_enc_data"); <-- 입력페이지에서 전달받을 암호화 데이터
    String License = KeyPad_E2E.License_Check(request.getParameter("hid_lic_data")); <-- 라이선스키

    // 암호화 라이브러리 사용법
    String decrypt = KeyPad_E2ECrypto.KeyPad_decrypt_block((PrivateKey)request.getSession().getAttribute("__rsaPrivateKey__"), encrypt, License);

5) 복호화는 decrypt값을 그대로 받아 사용합니다.
   decrypt값이 String이므로, 바로 사용하실 수 있습니다.
   
** 라이선스 기능이 있으므로, 사용시 라이선스 발급을 받아야합니다.
   라이선스는 메일로 요청주시면 발급하여 드립니다.
   tjsghman@gmail.com
