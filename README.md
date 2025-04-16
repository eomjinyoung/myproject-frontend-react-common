# bitcamp-myproject-react-common

## git submodule

### 각 next.js 앱에 공통 모듈을 포함시키기.

- 서브 모듈 추가

```bash
git submodule add https://github.com/eomjinyoung/myproject-frontend-react-common src/common
```

- 커밋 및 푸시

```bash
git add .gitmodules src/common
git commit -m "Add submodule: common"
git push
```

- 클론할 때

```bash
git clone https://github.com/eomjinyoung/myproject-frontend-react-auth
cd myproject-frontend-react-auth
git submodule init # 서브 모듈 초기화
git submodule update # 서브 모듈 다운로드

# 한 줄로 실행하는 방법
git clone --recurse-submodules https://github.com/eomjinyoung/myproject-frontend-react-auth
```

- 부모 저장소에서 커밋 없이 최신 상태로 당겨오기

```bash
git submodule update --remote
# submodule을 최신 커밋으로 가져오기만 하고, 부모 저장소에 반영(커밋)은 하지 않는다.
```

### 서브 모듈 변경사항 반영

- 부모 저장소의 서브 모듈 버전을 기록하기
- 그래야 다음에 부모 저장소를 가져올 때 현재 버전의 서브 모듈을 가져온다.

```bash
git add src/common
git commit -m "Update submodule to latest commit"
git push
```

- 서브모듈 저장소에서 직접 작업했다면,

```bash
cd src/common
git pull origin main
cd ../..
git add src/common
git commit -m "Update submodule to latest commit"
git push
```
