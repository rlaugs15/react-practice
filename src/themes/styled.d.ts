import "styled-components";

/* TypeScript에서 모듈에 대한 확장(extend)을 선언하는 방법 중 하나
"styled-components" 라이브러리의 기존 모듈에 새로운 타입을 추가하는 역할 */
declare module "styled-components" {
  export interface DefaultTheme {
    //내 테마가 어떻게 보일지 설명
    textColor: string;
    bgColor: string;
    accentColor: string;
    divColor: string;
  }
}
