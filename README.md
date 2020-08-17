# :gift_heart: relay_07

아이러브스쿨입니다 :)



## :book: 2주차 기획

**기능: 프로필 사진을 올릴 수 있다. (업로드)**

1. 프로필 사진을 조작할 수 있다.
   1. 원하는 썸네일의 크기를 입력받는다. 
      (or 사이즈를 입력받지 않고 여러 옵션중에 하나를 선택하는 방식??)
   2. api에 입력받은 scale과 사진을 전달한다
   3. 결과로 받은 썸네일을 사용자에게 보여준다
2. 사용자가 선택한 썸네일을 로컬 스토리지에 저장한다.



**세부사항**

1. 회원가입 기능은 구현하지않는다.

2. 대신 적당한 수의 유저를 로컬에 생성해놓는다.

3. 생성한 유저의 정보는 수정 불가능하다. 단, 썸네일만 수정가능하다.

4. 마이페이지에 해당하는 웹페이지에도 썸네일만 수정 가능하도록 구현한다.

5. api는 다음을 권장한다.

   - [Naver Cloud](https://www.ncloud.com/product/media/imageOptimizer)

   - [Azure](https://docs.microsoft.com/ko-kr/azure/cognitive-services/computer-vision/concept-generating-thumbnails)



## :white_check_mark: 체크포인트

:white_large_square: 본인의 사진이나 연예인 사진(눈, 코, 입이 드러난) 을 올렸을 때 알맞게 얼굴인식을 해 썸네일로 등록 되는가?

:white_large_square: 회원가입 / 로그인 / 글 등록 / 비속어 탐지 등 릴레이 해온 기능의 무리가 없는가?



:hear_no_evil: 혹시 문제가 있다면 언제든지 피드백 주세요!



## :fire: 배포 URL

http://49.50.174.249:3000/



## :hammer: 데모 절차

1. 회원가입

![image](https://user-images.githubusercontent.com/33643752/90332986-b898dd80-dffc-11ea-84f8-4ca356cc7be8.png)

2. 로그인

![image](https://user-images.githubusercontent.com/33643752/90333002-e4b45e80-dffc-11ea-81ad-9362a7d76571.png)

3. 메인 화면

   ![image](https://user-images.githubusercontent.com/33643752/90333008-fdbd0f80-dffc-11ea-9a46-44cd43b57ec4.png)

4. 프로필 수정

   ![image](https://user-images.githubusercontent.com/33643752/90333016-14fbfd00-dffd-11ea-87e6-986ace15a342.png)

   

5. 프로필 사진 업로드

   ![image](https://user-images.githubusercontent.com/33643752/90333036-52f92100-dffd-11ea-8e78-80db6c1e9cef.png)

   <img src = 'https://i.ytimg.com/vi/kzZRh1cm5dQ/maxresdefault.jpg'/>

6. 적용 화면

   ![image](https://user-images.githubusercontent.com/33643752/90333062-7d4ade80-dffd-11ea-881d-d3717d0ce773.png)

## 단체 사진

**달력과 함께** :camera_flash:

![hehehe](https://user-images.githubusercontent.com/33643752/90256138-3b485e00-de80-11ea-9db7-b189b69f8a98.png)



**쉴 때는 확실하게** :crescent_moon:

![스크린샷 2020-08-14 오후 1 53 02](https://user-images.githubusercontent.com/33643752/90256129-37b4d700-de80-11ea-88be-8091a31e92ff.png)



## :1st_place_medal: 모두가 금메달!

| 이름<br /> (캠퍼ID) | 소감                                                         |
| :-----------------: | :----------------------------------------------------------- |
| 강석민<br />(J005)  | 이전 프로젝트 분들이 구조를 잘 짜주셔서 sequelize와 bcryptjs등 많은 걸 배웠고,<br />모든 팀원분들이 적극적으로 참여해주셔서 즐겁게 코딩을 했던 하루를 새기게 되었습니다.<br />고생했던 팀원분들 모두 감사합니다! :) |
| 공태경<br />(J012)  | 다른 조의 프로젝트를 이어 받아 개발을 하면서 부족한 부분을 많이 느꼈고<br />팀원 분들과 협업을 하면서 많은 것을 느끼고 배울 수 있었습니다. 감사합니다! :) |
| 권오민<br />(J019)  | 생각보다 즐겁게 시작해서 재미있었고 고생하신 여러분 너무 감사합니다~! |
| 김도호<br />(J030)  | 서로 자기소개할 때 너무 분위기 좋아서 즐거웠습니다. 팀원들에게 즐기면서<br />하자고 했는데 즐겨졌는지 모르겠네요 ㅠㅠ 모두 고생하셨습니다.<br />그리고 감사합니다!! :fire: |
| 김민섭<br />(J034)  | 혼자 공부할때보다 훨씬 많은 공부가 된 것 같습니다 ! 좋은 조원분들을 만나서<br />재밌게 협업한 것 같습니다 ㅎㅎㅎ |
| 박승환<br />(J081)  | 낯선 협업과정에서 다들 열심히 주시고 같이 고민할 수 있는 좋은 시간이었습니다. :D |
| 양아림<br />(J113)  | 역할을 나눠서 협업하는 과정에서 많은걸 배우고 좋은 팀원들을<br />만나서 재밌게 진행할 수 있었던거 같습니다! |
| 유현우<br />(J127)  | 다른 조가 ejs로 프론트를 개발해주셨는데, 처음으로 ejs를 이용하여 개발하며<br />많은 것을 배워간 것 같습니다. 이번 조 프론트 3분 모두 다 ejs가 처음이었지만,<br />ejs를 공부해가며 개발을 하는 과정이 즐거웠고, 부트스트랩이나 sequelize 등<br />제가 모르는 부분을 많이 배워가서 좋은 경험이었습니다.<br />이번 프로젝트 참여하신 모든 분들 다 열심히 참여해주셔서 너무 감사했고<br />고생 많으셨습니다 ^^ |
| 윤석주<br />(J128)  | 다들 의사소통을 너무 잘해주셔서 좋은 활동을 할 수 있었습니다!<br />실력도 좋으신 분들을 만나서 많이 배우면서 즐겁게 할 수 있었던 프로젝트였습니다.<br />늦은시간까지 고생하신 팀원분들 너무 수고 많으셨습니다! |
| 이상희<br />(J141)  | 고생해주신 팀원분들! 감사합니다 :)                           |
| 장우영<br />(J175)  | 비록 온라인이었지만 다들 오프라인 처럼 열심히 개발에 참여해주시고 노력해주셔서<br />협업이 무엇인지 배울 수 있는 좋은 기회였던 것 같습니다. 감사합니다~ |
| 최정은<br />(J206)  | 좋은분들과 함께해서 좋았습니다!                              |

