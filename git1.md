> git CLI 용어 정리

- git init
  내가 사용할 디렉토리를 버전관리하고 싶다면 그 해당파일이 있는 폴더로 들어가 git init을 사용하면 된다.

```
git init .

현재 디렉토리를 깃에게 버전관리를 시킨다.
```

init을 하고나면 .git이라는 디렉토리가 생성된다.

</br>

<img src="./git.jpg">
</br></br>

> Working tree

내가 작업한 문서들은 전부다 Working tree에 존재한다고 생각하면 된다.

</br>

> Staging Area

내가 작업한 문서가 10개인데 그중 2개만 git에 push 하고 싶을 경우 먼저 2개의 파일을 골라 Staging Area에 올려주면 된다.

</br>

> Repository

Staging Area에 있는 2개의 파일을 push하여 내가 생성한 repository에 올리면 된다.

</br>

추가로 알게된 내용

> git desktop 의 fetch

fetch는 내가 repository에 올렸던 내용들을 내 컴퓨터로 가지고 오는 작업이다.</br>
쉽게 이야기 하면 남들과 협업할 경우 다른사람이 최신화를 시켰다면 그 최신화된 버전을 내 컴퓨터로 가지고 온다고 생각하면 된다.

</br>

파일을 생성한 후 <code>git add index.html(ex.파일명)</code>을 입력하게되면 commit을 할 수있는 단계이다.

```
여러개의 파일을 add 할 경우
ex) index.html, index_header.css, index_middle.css, index_bottom.css

git add index.html index_header.css index_middle.css index_bottom.css

위와 같이 띄워쓰기로 구분하여 파일명을 계속해서 적어주면 된다.

git add 디렉토리이름 이렇게 디렉토리 이름을 쓰게되면 그 하위폴더는 모두 커밋되게 된다.

git commit -am ""은 add와 commit 메세지를 동시에 남길 수 있는 명령어 이다.
```

</br>
그 다음 바로 git commit 을 하게되면 commit message를 작성할 수 있는 에디터가 뜨게 되는데 그것을 생략하고 싶을 경우<code>git commit -m "여기에 작성"</code> ""안에 커밋 메세지를 적어주면 된다.

</br>

commit가 잘 됬는지 확인하기 위해서는 <code>git log</code>를 사용하여 확인할 수있다.

```
git log --stat 는 commit의 커밋메세지만 보는 것이 아니고 commit된 파일명까지 같이 볼 수 있다.
```

</br>
commit이 제대로 되었다면 마지막 작업으로 <code>git push</code>해주면 repository에 내 파일들이 제대로 올라간 것을 확인할 수 있다.

</br>
</br>

> git diff

파일의 어떠한 부분이 변경되었는지 보여주는 명령어 이다.

> git checkout

```
우리가 커밋을 진행하고 git log로 커밋한 내용을 볼때 HEAD -> master을 가르키고 있다. 한마디로 최신 branch에 계속해서 업데이트 하고있다는 뜻이다.

우리가 작업을 하다보면 실수를 하게될 수도 있는데 그때 전에 해놨던 작업으로 돌아가는 방법이 git checkout이다.

git log를 통해 고유 commit 번호를 복사하여 git check 복사한번호 를 작성하게되면 HEAD -> 과거 commit 상태를 가르키고 그때의 상황으로 돌아갈 수 있게 된다.

다시 최신버전으로 돌아가고 싶다면
git checkout master로 master 브랜치로 돌아가면 된다.
```

</br>
</br>

2021년 2월 11일
