# bitcamp-myproject-react-common

## git submodule

각 next.js 앱에 공통 모듈을 포함시키기.

```bash
git submodule add https://github.com/eomjinyoung/myproject-frontend-react-common src/common
git submodule update --init --recursive // 처음 가져올 때 실행
git submodule update // 부모 저장소가 기록해둔 특정 커밋을 가져온다.
git submodule update --remote // 브랜치 기준 최신 커밋으로 가져온다.
```
