**J07 릴레이 미션 1 주차 : 기획**

 

 ## 개선할 라떼 서비스 : 아이러브스쿨
 
<img width="504" alt="스크린샷 2020-07-31 오후 4 21 26" src="https://user-images.githubusercontent.com/48787170/89010656-013c6f80-d34a-11ea-986a-387643377fd2.png">


## 구현해야 할 기능
## 기본 기능 및 레이아웃
1. (회원가입), 로그인, 게시판, 게시물 및 댓글 작성 기능
2. 회원 및 학교별 랭킹 보여주기, 경고 누적 팝업
3. 회원 DB 설계 시 상점과 벌점을 저장하는 부분이 필요하고, 친구 추천 기능을 위해서는 선호도를 관리하는 부분이 필요하다.
4. 레이아웃
![image (1)](https://user-images.githubusercontent.com/48787170/89021216-1e2d6e80-d35b-11ea-95b8-72bd1a9f1e49.png)
![image (2)](https://user-images.githubusercontent.com/48787170/89021222-1ff73200-d35b-11ea-849f-d02f125a2ca4.png)
![image (3)](https://user-images.githubusercontent.com/48787170/89021224-208fc880-d35b-11ea-914e-5e114bd21cda.png)
![image (4)](https://user-images.githubusercontent.com/48787170/89021226-208fc880-d35b-11ea-8617-7a105a3809fd.png)
![image (5)](https://user-images.githubusercontent.com/48787170/89021229-21285f00-d35b-11ea-8d85-1e46a21a20a0.png)
![image (6)](https://user-images.githubusercontent.com/48787170/89021230-21c0f580-d35b-11ea-850e-65e0744e39f1.png)
![image (7)](https://user-images.githubusercontent.com/48787170/89021233-21c0f580-d35b-11ea-8b40-e32de330f9aa.png)
![image](https://user-images.githubusercontent.com/48787170/89021235-22598c00-d35b-11ea-80d3-a9361d0e83eb.png)

## 인공지능을 활용한 기능
## A. 자연어 처리
**불량 회원 분류에 자연어 처리 사용 : 감정 분석을 이용하여 모욕적이거나 공격적인 게시물을 자주 작성하는 회원은, 신고 회수와 결합하여 일정 수준 이상이 되면 불이익을 준다.**

-상점 벌점 제도를 만들어서 상점을 많이 받으면 랭크를 올려 주고(개인별/ 학교별), 벌점을 받으면 채팅 중지 등의 제한을 둔다. 어느 정도 벌점이 쌓이면 로그인 시 팝업을 통해 경고를 한다 ⇒ **지속 가능한, 좋은 커뮤니티 문화**를 만들 수 있다.

-게시물 또는 댓글을 입력하면 그 데이터를 서버에 등록하고, 그 때마다 모델에 해당 글을 input으로 넣고 그 결과물을 이용하여 해당 글의 작성자에게 상점(+1점)을 주거나 벌점(-1점)을 준다. 이 점수를 매긴 결과를 메인 페이지에 개인별/학교별 랭킹으로 보여준다.

 -벌점은 데이터셋(https://github.com/songys/Toxic_comment_data) 중에서도 insult 등의 요소가 포함된 경우에만 부여한다. 
 
 -개인별 랭킹은 해당 학교 졸업생들을 대상으로 매겨지며, 그 학교 졸업생들에게만 보여진다.
 
 -학교별 랭킹을 매길 때는 해당 학교 졸업생으로 등록된 개인의 상점 및 벌점을 총합하여 매긴다.
 
 -이를 위해서는 게시물 또는 댓글 작성 시 input data로 회원id, 게시물 또는 댓글 내용, 랭킹을 특정 기간마다 새로 매기기 위해서 작성 날짜가 들어가면 수월할 것 같다. 학교id는 회원id를 이용하여 참조하면 가능할 것이다.
  (기술적인 부분은 참고만 해 주세요)

- 아래 링크를 참고하면 데이터셋 수집 및 학습에 도움이 될 것이다.
			https://github.com/songys/Toxic_comment_data
https://wikidocs.net/book/2155
https://wikidocs.net/44249				
https://api.openhangul.com/overview?m=sentiment
https://cyc1am3n.github.io/2018/11/10/classifying_korean_movie_review.html
https://github.com/mrlee23/KoreanSentimentAnalyzer



##	B. 비전
### Vision in 아이러브스쿨

- 학교 졸업 사진
- 개인 프로필사진
- 게시판 업로드 사진



### 아이디어

1. 회원가입 시, 학생증 인증, 주민증 인증 등에 사용? 일반적인 CNN
2. 어릴 때 사진 올리면 GAN을 이용해서 사진 생성 → 현재 프로필 사진, SNS 사진
3. 게시판 업로드 시, 유해 사진 걸러줌
4. 썸네일 뽑아주는 기능 (프로필 사진 설정 시 사용)
5. 졸업사진 → 현재의 몇 십년 뒤 모습
6. 회원가입 시, 현재 사진과 졸업 사진 비교해서 본인인증



### 선택: **썸네일** 기능

---



### 기능: 프로필 사진을 올릴 수 있다. (업로드)

1. 프로필 사진을 조작할 수 있다.
   1. 원하는 썸네일의 크기를 입력받는다. 
      (or 사이즈를 입력받지 않고 여러 옵션중에 하나를 선택하는 방식??)
   2. api에 입력받은 scale과 사진을 전달한다
   3. 결과로 받은 썸네일을 사용자에게 보여준다
2. 사용자가 선택한 썸네일을 로컬 스토리지에 저장한다.





#### 세부사항

1. 회원가입 기능은 구현하지않는다.

2. 대신 적당한 수의 유저를 로컬에 생성해놓는다.

3. 생성한 유저의 정보는 수정 불가능하다. 단, 썸네일만 수정가능하다.

4. 마이페이지에 해당하는 웹페이지에도 썸네일만 수정 가능하도록 구현한다.

5. api는 다음을 권장한다.

   - <https://www.ncloud.com/product/media/imageOptimizer>

   - <https://docs.microsoft.com/ko-kr/azure/cognitive-services/computer-vision/concept-generating-thumbnails



#### 썸네일 구현 예시

![thumbnailExample](https://user-images.githubusercontent.com/26831729/89018787-516dfe80-d357-11ea-9875-2c4360b53938.JPG)

## C. 테이블 값 데이터
게시글을 분석해서 친구 사이를 기록한다. 그래서 친구의 친구이지만 나와는 친구가 아닌 사람을 분석해서 추천을 해준다.

  

  

  

## 추천 자료 ( 친구의 친구 )

  

![img](https://blog.kakaocdn.net/dn/bTl4TO/btqCJlTwjdg/5nV7IOFuzBBYY3Qftc9IK1/img.png)

  

  

  

  

  

출처 : https://stricky.tistory.com/196

  

해당 관련 코드를 보시면 (사람 이름, 친밀도) 를 이용해서 직접적인 방법 말고, 친구의 친구를 알 수 있게 해주는 코드입니다.

  

다음과 같이 간선의 무게가 있는 그래프로 정리하는 방법도 좋을 것 같다고 생각합니다.

  

  

  

1.게시글의 댓글을 다는 빈도등을 조사합니다. 나의 게시글에 댓글을 자주 작성하는 사람에게 친밀도를 추천합니다.

  

- 게시글 데이터 자체를 가지고 있기 때문에 조사하기 쉬울 것 이라고 생각합니다.

  

2.사진으로 같이 사진에 나온 사람들을 비교해서 둘의 친밀도 혹은 친구일 확률이 높은 사람을 추천한다.

- 네이버 클라우드 플랫폼에 인물이 누구인지 분석해주는 Clova API 가 있습니다. 이것을 이용해 누가 누구와 같이 있는지 알 수 있습니다.(사진 입력은 유명인의 단체 사진을 활용)
	- 시간이 남으면 B. 비전의 프로필 사진에도 적용해보자.

- 이미지는 유명 연예인 사진을 이용해서 클로바가 함께 찍은 사람들의 이름을 자동으로 테이블에 저장한다.

- 함께 있는 사람들을 그룹으로 분류하여, 현재 사용자가 사진을 넣을 경우 사진내에 있는 사람들을 이용하여, 현재 사진에는 없지만 친구일 확률이 높은 사람들을 추천해준다.

- 예: '강민경'과 '이해리'가 찍은 단체사진이 많고, '박효신'과 '강민경'이 함께 찍은 사진을 넣으면 '이해리'를 친구 추천한다.

- 2인이상의 단체 사진에서도 작동하도록 예측 모델을 선택한다.

- https://www.ncloud.com/product/aiService/cfr

  

3.사는곳과 출신학교 코드로 친밀도를 줍니다.

- 학교출신은 멤버 데이터에서 , 그 학교에 대한 위치 데이터가 공공사이트에 있기 때문에

- http://www.gwedu.net/technote7/board.php?board=kkkexchan&command=body&no=27

  
## 분석 하는 툴에 관하여

  
분석하는데 Python 이 도구나 라이브러리 가 많고, 좋을 것 같아서 계산을 Python 으로만든 스크립트로 해주고 node.js 에서도 Python 결과물을 불러서 사용할 수 있습니다.

recommendation for Node.js, javascript... 목록

https://www.npmjs.com/search?q=recommendation%20engine

Node.js에서 Python 함수 호출하는 방법

https://www.it-swarm.dev/ko/python/nodejs%EC%97%90%EC%84%9C-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%95%A8%EC%88%98%EB%A5%BC-%ED%98%B8%EC%B6%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/1046058694/

  
추천을 만드는 알고리즘에 관한 자료입니다.

Surprise Recommender system library for python

http://surpriselib.com/
https://proinlab.com/archives/2103

Node.js 영화추천시스템
