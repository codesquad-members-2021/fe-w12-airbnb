

# [Git] 으로 협업하기

1. 프로젝트를 자신의 계정으로 fork한다. 저장소 우측 상단의 fork 버튼을 활용한다.

   ![Inkedfdfd_LI](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/Inkedfdfd_LI.jpg?raw=true)



우측 상단의 fork 버튼을 누르면 아래 그림과 같이 fork한 동료들의 깃상태를 볼 수 있다. 

![airbnb](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/airbnb.PNG?raw=true)

2. fork한 프로젝트를 자신의 컴퓨터로 clone한다.

그런 다음에 VSC cmd 창에서 

```
git clone https://github.com/{본인_git아이디}/{저장소 아이디}
```

![git1](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/git1.PNG?raw=true)

을 적게 되면 위와 같이 자신의 local 컴퓨터로 git file을 clone 해서 eamon 이라는 파일안에 "fe-w12-airbnb" 라는 파일이 하나 생기게 된다.



3. clone한 프로젝트 이동

```
cd {저장소 아이디}
```

cd 하고 생성된 파일명을 입력하면 파일안으로 들어가게된다.



4. 본인 아이디로 브랜치를 만들기 위한 checkout

```
git checkout -t origin/본인_코쿼아이디
```



![git2](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/git2.PNG?raw=true)

이 명령어를 치게 되면 이미 있던  'eamon' 이라는 romote branch의 이름을 그대로 따서 local branch 로 복사해 온다. 

(`-t` 옵션과 `원격 저장소의 branch 이름`을 입력하면 로컬의 동일한 이름의 branch를 생성하면서 해당 branch로 checkout을 한다.)



만약 branch 이름을 변경하여 가져오고 싶다면 `$ git checkout -b [생성할 branch 이름] [원격 저장소의 branch 이름]` 처럼 사용하면 된다.

이 명령어를 입력하는 이유는 보통 클론 해오면 origin이랑  main이랑 연결되는데 git checkout -t origin/eamon 이거 하고 나서는 origin이  main이 아니라 eamon로 묶인다. (라고 dico 님이 말씀하셨다.)



![git3](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/git3.PNG?raw=true)

5.기능 구현을 위한 브랜치 생성 (연속번호를 붙여나간다. 기존 step 브랜치가 있으면 삭제한다.)

```
git checkout -b 브랜치이름
```

저 같은 경우는 'airbnb-step1' 이라는 브랜치를 생성했습니다. 

![git6](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/git6.PNG?raw=true)

그렇게하면 git branch 라는 명령어를 내려서 local의 모든 branch를 볼 수 있는데 현재 있는 브랜치는 airbnb-step1 이고 origin 대신 eamon 이 나머지는 main 이 존재하는 것을 알수 있습니다. 

6. ```
   git commit -m "메세지" // 커밋
   ```

   저 같은 경우는 빠른 커밋을 위해 

   git commit -m "first commit" 을 작성했습니다.

   

7. 본인 원격 저장소에 올리기

   

   ```
   git push --set-upstream origin 브랜치이름
   ```

   아래 와 같이 origin 에 airbnb - step1 이라는 remote brench 를 새로 만들고 거기에 push 하게 됩니다. 

   

![git7](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/git7.PNG?raw=true)



push가 제대로 되었는지는 자신의 github 홈페이지에서 

fork 된 홈페이지로 들어간 뒤에 

![11](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/11.PNG?raw=true)

아래의 사진에서 브랜치를 확인해보면 'airbnb-step1'이 들어있는 것을 확인해볼 수 있습니다. 그 안의 내용물을 보시면 push 된 code 들을 보실수 있습니다.

![Inked22_LI](https://github.com/eamon3481/fe-w12-airbnb/blob/airbnb-step1/imgg/Inked22_LI.jpg?raw=true)