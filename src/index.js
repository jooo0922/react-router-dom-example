import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}

// 이렇게 전역변수로 리스트들을 만들 때 사용할 배열을 만들어놓음.
// 실제 현실에서는 ajax 같은 거로 데이터를 가져오는 경우가 많겠지
let contents = [
  { id: 1, title: "HTML", description: "HTML is ..." },
  { id: 2, title: "JS", description: "JS is ..." },
  { id: 3, title: "React", description: "React is ..." },
];

function Topic() {
  const params = useParams(); // 이렇게 하면 {topic_id: '아이디값'} 이렇게 생긴 객체를 리턴받음.
  const topic_id = params.topic_id;
  let selected_topic = {
    title: "Sorry",
    description: "Not Found",
  }; // 반복문을 돌면서 선택된 topic_id에 맞는 데이터를 가져와 할당할 변수.
  // 일단 초기에는 기본값인 문자열들을 넣어놨음. 또는 for 문을 돌더라도 값을 찾지 못했을 때 나올 예외적인 페이지이기도 함.
  for (let i = 0; i < contents.length; i++) {
    // 참고로 topic_id 값이 문자열로 리턴되므로, Number를 이용해 숫자 객체로 바꿔줘야 함.
    if (contents[i].id === Number(topic_id)) {
      selected_topic = contents[i]; // 이렇게만 해줘도 contents[i]에 있는 key의 이름이 동일한 value들을 selected_topic에 할당해줄 수 있나 봄.
      break;
    }
  }
  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}

function Topics() {
  let lis = [];
  for (let i = 0; i < contents.length; i++) {
    // 이런 식으로 for 문을 돌려서 NavLink 리스트를 만들거면 li 태그에 key라는 props를 각각 줘야하나 봄... 안 그러면 에러가 자꾸 뜸.
    lis.push(
      <li key={contents[i].id}>
        <NavLink to={"/topics/" + contents[i].id}>{contents[i].title}</NavLink>
      </li>
    );
  } // 이렇게 반복문을 활용해서 NavList를 직접 만들어서 배열 안에 담아놓고, 그걸 jsx에 사용하면 더 효율적인 리팩토링이 된 것이지!

  return (
    <div>
      <h2>Topics</h2>
      Topics...
      <ul>{lis}</ul>
      <Route path="/topics/:topic_id">
        <Topic></Topic>
      </Route>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>React Router DOM example</h1>
      <ul>
        {/* 페이지 전환을 쉽게 하기 위해 만든 list UI */}
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/topics">Topics</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/topics">
          <Topics></Topics>
        </Route>
        <Route path="/contact">
          <Contact></Contact>
        </Route>
        <Route path="/">Not found</Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * React Router DOM
 *
 * 리액트를 이용해서 여러 개의 페이지로 이루어진 application을
 * 쉽게 만드는 데 도움을 주는 써드파티 라이브러리
 *
 * -> 즉, url 주소 변경에 따라 다른 화면을 보여주는 '라우팅'을 리액트 내에서 구현할 수 있게 해줌.
 * 정확히 말하면 url 변경에 따라 하위 컴포넌트들이 달라지게 하는 것!
 * 'Single Page Application' 이라고도 함!
 */

/**
 * 1. BrowserRouter
 *
 * BrowserRouter 는 react-router-dom을 적용하고 싶은 컴포넌트의
 * 최상위 컴포넌트를 감싸주는 wrapper component 라고 할 수 있음.
 *
 * 그래서 최상위 컴포넌트로 사용되는 <App />을 감싸주면
 * 저 App 이라는 컴포넌트 안에서는 BrowserRouter를 사용할 수 있는 상태가 됨!
 *
 *
 * 2. Route
 *
 * url에 따라 달라지게 되는 컴포넌트들 각각을
 * <Route></Route> 컴포넌트로 감싸줘야 함.
 *
 * 그 다음 path라는 속성을 지정해줌으로써
 * 어떤 url을 입력해야 해당 컴포넌트를 보내줄 것인지(즉, 어떤 컴포넌트를 라우팅 해줄 것인지)
 * react-router-dom 에게 알려줘야 함.
 *
 * 만약, 사용자가 웹사이트의 아무런 path도 지정하지 않고 들어왔을때는 (예를 들면 Home 컴포넌트)
 * path="/" 이런식으로 아무것도 지정하지 않으면 됨.
 *
 * 이렇게 path를 설정해놨으면 url 창에 입력해서 접근할 수도 있고,
 * jsx에서 <a>태그를 만든 다음, href 속성에 동일한 path를 지정해놓으면
 * <a> 태그 클릭 시
 * '해당 디렉토리로 접근하여 해당하는 컴포넌트를 라우팅해줘라' 라고 명령하게 됨!
 *
 *
 * 주!)
 * 그런데 이 때, path="/" 에 해당하는 컴포넌트(Home)를 라우팅하면 Home 컴포넌트만 나오게 되지만,
 * 다른 path가 지정된 컴포넌트(Contact, Topics 등)를 라우팅하면 이전에 라우팅된 Home 컴포넌트가
 * 사라지지 않은 채 새로운 컴포넌트가 라우팅되는 걸 볼 수 있음.
 *
 * 이게 왜 그러냐면,
 * http://localhost:3000/ 라고 하는 url은
 * path="/"에만 걸리지만,
 *
 * http://localhost:3000/topics 라고 하는 url은
 * path="/"
 * path="/topics" 둘 다에 걸리게 됨!
 *
 * 그렇기 때문에 두 개의 컴포넌트가 동시에 라우팅이 되는거지
 *
 * 이 문제를 해결하려면
 * Route 컴포넌트에 exact라는 속성을 추가해주면
 * 정확하게 path가 일치하는 컴포넌트만 매칭을 시켜줌!
 *
 * 따라서 Home 컴포넌트를 감싸는 Route 컴포넌트에만 exact 속성을 추가해주면,
 * 다른 컴포넌트들을 라우팅하려고 해도,
 * 그 컴포넌트들의 path는 정확하게 path="/" 이게 아니기 때문에
 * Home 컴포넌트를 라우팅해주지 않게 될 것임.
 *
 * exact를 사용함에 따라, Home 컴포넌트를 라우팅하려면
 * 정확하게 http://localhost:3000/ 이 url로만 접근이 가능하게 된 것
 *
 * 그래서 이런 식으로 Route의 path와 일치하는 컴포넌트는 그게 어디에 있건, 누구건 화면에 출력된다!
 * -> 이런 것을 '동적 라우팅'이라고 함!
 *
 *
 * 3. Switch
 *
 * 만약에 내가 특정 컴포넌트들을 감싸고 있는 Route 컴포넌트들에 대해
 * exact를 쓰지 않고도 exact를 쓴 것과 동일한 효과를 내고 싶다면,
 * Switch라는 컴포넌트로 해당하는 Route 컴포넌트들을 감싸주면 됨.
 *
 * 그런데 만약 Switch가 감싸주는 Route 컴포넌트들 중,
 * React Router DOM은 url에 맨 처음 걸리는 path를 발견하는 순간, 해당 컴포넌트만 출력하고
 * 그 다음부터 걸리는 path에 해당하는 컴포넌트들은 버리게 되어있음.
 * -> Switch가 없으면, path가 걸리는 컴포넌트들은 모두 출력되고,
 * 있으면, 가장 첫번째로 걸리는 path에 해당하는 컴포넌트 하나만 출력되는 것!
 *
 * 그렇기 때문에 모든 컴포넌트들은, Home 컴포넌트에 exact 속성이 부여되지 않는다면,
 * 언제나 path="/" 에 걸리게 되어있음.
 * 그러니 Home이 언제나 가장 먼저 출력되어서 나머지 애들은 출력될 기회를 갖지 못하게 되는 것!
 *
 * Switch로 감싸는 순간 exact가 없다면 모든 컴포넌트들은 현재 url이 뭐든지 간에
 * path="/" 에 해당하는 Home이 그 url에 가장 먼저 걸려서 출력되고
 * 그 다음에 걸리는 path에 해당하는 컴포넌트들은 다 버린다는 거야!
 * 그러니까 나머지 컴포넌트들은 출력될 기회가 없지..
 *
 * 그렇다면 어떤 방법을 쓸 수 있을까?
 *
 * 1. path="/"에 해당하는 컴포넌트가 제일 나중에 걸리도록
 * 컴포넌트들 중에서 가장 마지막에 배치하는 방법이 있음!
 * 왜냐면 저거는 exact를 사용하지 않는 한 모든 url에서 공통적으로 걸리는 컴포넌트이기 때문에
 * 저게 항상 첫번째로 걸리는 이상 나머지 컴포넌트들은 출력될 일이 없으니까!
 *
 * 이렇게 하면 Topics, Contact 등 다른 컴포넌트들의 path가 path="/"보다 먼저 걸리게 되니까
 * 다른 컴포넌트들이 먼저 출력되고, 반대로 마지막에 배치된 Home 컴포넌트는 출력될 기회를 잃게 되는거지!
 *
 * 2. 또는 path="/"에 해당하는 Home 컴포넌트를 맨 첫번째로 올리더라도,
 * exact 속성을 Home 컴포넌트의 Route 컴포넌트에 추가하기만 하면,
 * url이 정확히 http://localhost:3000/ 에 해당하지 않는 이상 Home 이 걸릴 일은 없으니
 * Switch를 사용하더라도 url에 정확히 해당하는 컴포넌트들만 path가 걸려서 출력될거임!
 *
 * 이 2번의 방법을 응용해서, Home 컴포넌트는 path="/" 이면서 exact를 하되,
 * 또다른 path="/"인 Route 컴포넌트를(대신 exact가 없는) 하나 더 만들어서 마지막에 배치하면 어떻게 될까?
 *
 * 이렇게 하면 그 컴포넌트는 사용자가 url을 잘못 입력했을때,
 * path="/" 이지만 exact가 아니기 때문에
 * 모든 잘못된 url 입력에 대해서 공통적으로 해당 컴포넌트가 마지막에는 걸리게 되어있음!
 * 근데 말 그대로 잘못된 url이기 때문에 해당 컴포넌트 외에 걸리는 다른 컴포넌트가 없는거임!
 * -> 이런 건 사용자가 잘못된 url을 입력했을 때 'Not found 페이지'를 보여주기 딱 좋은 방법이 되겠지!
 */

/**
 * Link
 *
 * Single Page Application을 만들 때, 페이지가 reload되지 않고,
 * 동적으로 가져오는 데이터를 코딩으로 만들거나 해야 하는데
 * 우리가 이전에 만든 페이지를 보면 a 태그를 클릭할 시 Network 탭을 보면
 * 계속 페이지가 reload 되는 것을 볼 수 있음.
 *
 * 이거를 reload 되지 않는,
 * Single Page Application으로 자동으로 구현해주는 게 Link 컴포넌트임.
 *
 * 이 컴포넌트로 jsx의 a태그를 교체하고, href 대신 to 라는 속성을 써주면 됨!
 */

/**
 * HashRouter vs BrowserRouter
 *
 * HashRouter
 * -사용자가 어떤 path로 들어와도 웹 서버가 동일한 웹페이지를 서비스할 수 없는 경우
 * -정적인 페이지에 적합.
 * -주소에 #이 붙음.
 * -웹 서버가 # 이후의 url을 읽지 못함. 무시함. but, js를 이용해서 가져오는 것.
 * -그래서 검색 엔진이 못읽음.
 * -그래서 어지간하면 거의 사용하지 않음.
 * -github pages와 같은 정적 페이지를 배포해서 보여줄 때 사용하기 간편함.
 *
 * BrowserRouter
 * -사용자가 어떤 path로 들어와도 웹 서버가 root 폴더에 있는 동일한 html 파일을 서비스할 수 있는 경우
 * -동적인 페이지에 적합.
 * -새로고침 시 경로를 찾지 못해서 에러 발생함.
 * -검색 엔진이 읽을 수 있음.
 * -github pages에서 사용하기 복잡함.
 *
 * -> 생활코딩에서는 각각의 첫번째 차이점에 대해서만 설명을 했는데
 * 추가적으로 구글링해서 찾아보니 다음과 같은 차이점들이 있었음.
 * 정확히 차이점이 와닿지는 않기 때문에 나중에 복습하거나 사용해보면서 알아봐야 할 듯...
 *
 * 일단 최근에는 리액트 앱에서 Routing 하는 로직들에서는
 * 거의 대부분 BrowserRouter를 사용한다는 것만 알아두면 될 것 같음.
 */

/**
 * NavLink
 *
 * Link 컴포넌트에서 약간의 기능이 추가된 컴포넌트라고 보면 됨.
 * 클릭할 때마다 Element 탭에서 해당하는 a태그에 class="active"가 추가되는 것을 확인할 수 있음.
 *
 * 이때, Topics, Contact를 클릭하면 Home 에도 클래스가 추가되는데,
 * 이는 Route 컴포넌트와 마찬가지 이유로 path="/" 인 애들은
 * http://localhost:3000/topics 에서도, http://localhost:3000/contact 에서도 모두 걸리는 path이기 때문임.
 *
 * 따라서 Home으로 향하도록 지정한 NavLink에도 exact를 붙여줘야 이러한 문제를 해결할 수 있음.
 * 물론 다른 태그에도 exact를 붙여줘도 좋지만 그냥 귀찮으니까 Home에만 붙여주는거고!
 *
 * -> 그럼 어쨋거나 이 active 클래스를 이용해서 뭘 할 수 있는데?
 * 사용자가 자신이 어떤 페이지에 위치하는지 직관적으로 이해할 수 있게
 * css로 사용자가 현재 위치하고 있는 NavLink를 표시해줄 수 있다는거임. 별 대단한 건 아니네ㅋㅋㅋ
 *
 * 그래도 그냥 Link보다는 이거를 주로 더 많이 쓴다고 함.
 */

/**
 * 라우터 안의 라우터 중첩
 *
 * Topics 컴포넌트 안에 Switch로 묶여있는 라우트들을 보면
 * 라우터 안에 라우터를 중첩하여 사용할 수 있다는 것을 알 수 있음.
 *
 *
 * useParams (Hook을 활용한 리팩토링)
 *
 * 여기서 Topics 내의 Route들 처럼 3개 정도만 있으면 그냥 직접 작성해줘도 되는데,
 * 만약 1억개의 Route 들이 있다면? 직접 써주기 어렵겠지?
 *
 * 이런 경우 배열을 하나 만들어서 NavLink 리스트들이 만들어지고,
 * 또 그에 따라 자동으로 Route 들이 만들어지도록 하면 됨.
 *
 * 즉, Route는 하나만 만들어놓고,
 * 배열로 만든 NavLink 리스트들 중 하나로부터 받은 path가 무엇인지에 따라
 * 그 정보를 가져와서 Route를 즉석에서 만들어서 처리하는 방식이라는 거지!
 * -> 이럴 때 쓰는 게 <Route path="/어쩌구/:특정_id"> 인 것!
 *
 * 이걸 왜 쓰냐면, 만약 <Route path="/topics/:topic_id"> 라는 Route 컴포넌트가 있다고 치면,
 * 저 컴포넌트가 의미하는 건,
 * "만약 /topics/ 로 시작하는 path 중에 뒤에 어떤 값(:topic_id)이 있는
 * path가 들어온다면, 저 라우트 컴포넌트를 라우팅하여라" 라는 뜻!
 *
 * 그래서 저 id값에 따라 위에서 만든 배열로부터 정보를 가져온 뒤,
 * 컴포넌트를 가공해서 해당 Route 안에 뿌려주면 되는거야!
 * 위의 예제로 치면 그 가공되는 컴포넌트는 Topic 인거지..
 *
 * 그럼 저 값, 즉 :topic_id가 뭔지 어떻게 알아낼 수 있을까?
 * 저걸 알아야 id값으로 구분하든말든 하지!
 * -> 이 때 사용하는 게 useParams 라는 Hook 을 이용하면 됨!
 *
 * <Route path="/topics/:topic_id">
 *  <Topic></Topic>
 * </Route>
 * 이 구조상에서, 해당 라우트 컴포넌트가 감싸고 있는 가공할 컴포넌트의 함수 안에서
 * useParams()를 호출하면, {topic_id: '아이디값'} 이런 객체를 리턴받게 됨.
 * 이거를 위에 Topic 함수 내에서 작성한 코드처럼 배열에서 정보를 가져와서
 * 반복문을 돌려서 컴포넌트를 가공해주는 식으로 만들면 됨!
 */
