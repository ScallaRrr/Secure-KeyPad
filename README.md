/*
 * HTML_SECURE_KEYPAD
 * 2018.01.07
 * writer : Lee Sun Ho
 * Copyright(C)2018 Lee Sun Ho
 * Version 4.0
 */
   
# Secure-KeyPad v4.0
Made By ScallaRrr

본 제품은 HTML5 웹표준에 의거 하여 만들어진, 보안 가상키패드입니다.

솔루션 적용 가이드를 아래와 같이 작성합니다.

## 1. 프로젝트 구성

※ 소프트웨어 구성

    - Java Enc Library
    - JavaScript Library
    - Design CSS
    - License
       
    - Encrypt Algorithm  : RSA with Digital Envelope
    - Library :   
    - Gateway        : API Gateway 서버
    - AuthService    : 인증, 사용자, 권한 관리 서버 (Spring Oauth)
    - GatewayLog     : 로그, 통계 관리 서버 (구성중)
    - GatewayConfig  : Spring-Cloud-Config-Bus Server
    - ETC            : Redis, RabbitMQ, MySQL 
     
※ 개발 환경

    - 백엔드 서버 : Java 1.8
    - 암호 알고리즘 : RSA 전자봉투, AES 블록암호

## 2. 프로젝트 구성 및 

<img src = ""/>
입력 웹페이지 --> 키패드 레이아웃 --> 서버 --> 결과 웹페이지 까지 각 전달 구간에서 입력값이 탈취 당하지 않도록 암호화하여 전달합니다.

## 3. 설치 가이드 

  ### 설치 대상

  ##### Java Library 설치 
  
    - 패키지에 포함된 JAR 라이브러리를 프로젝트에 추가한다.
    
  ##### JavaScript Library 및 CSS 
  
    - 프로젝트 Root 하위 패키지에 구성한다.
    - 패키지 위치변경의 경우, KeyPad.js 에서 Path 설정 변경 필요  

## 4. 적용 가이드

  ##### 솔루션 호출을 위한 세팅
  
    - 보안을 적용 시킬 페이지에 Keypad.js 및 jQuery를 추가합니다.
    - 이후, 페이지에 자바코드 및 스크립트로 암호보안키를 세팅합니다
    
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
    
  ##### 솔루션 대상 필드 
   
    - 보안을 적용할 input필드의 속성에 원하는 키패드 타입명_keypad="on" attribute를 삽입하여, 키패드를 적용시킵니다.
      Number_keypad="on"
      Qwerty_keypad="on"
    
  ##### 복호화 안내
  
    - 복호화 페이지 상단에 암호화 라이브러리 사용방식을 그대로 적용합니다.
    
    <%@ page import="KeyPad_Crypto.*"%>
    <%@ page import="java.security.PrivateKey"%>
    String encrypt = request.getParameter("보안필드ID_hid_enc_data"); <-- 입력페이지에서 전달받을 암호화 데이터
    String License = KeyPad_E2E.License_Check(request.getParameter("hid_lic_data")); <-- 라이선스키
    // 암호화 라이브러리 사용법
    String decrypt = KeyPad_E2ECrypto.KeyPad_decrypt_block((PrivateKey)request.getSession().getAttribute("__rsaPrivateKey__"), encrypt, License);

