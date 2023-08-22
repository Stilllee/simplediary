import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data; // action.data를 반환하면 새로운 state가 됨
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    } // action.data를 기반으로 새로운 아이템을 만들고, 기존의 state와 합쳐서 새로운 state를 반환함
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId); // id가 targetId가 아닌 아이템만 골라서 새로운 state를 반환함
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      ); // id가 targetId인 아이템만 content를 수정하고, 나머지 아이템은 그대로 둔 채 새로운 state를 반환함
    }
    default:
      return state; // 아무 일도 일어나지 않으면 기존의 state를 반환함
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json()); // fetch를 통해 데이터를 받아옴

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++, // useRef를 사용하여 id값을 관리함
      };
    });
    dispatch({ type: "INIT", data: initData }); // 데이터를 받아온 후에 dispatch를 통해 reducer에 action을 전달함
  };

  // useEffect를 사용하여 컴포넌트가 마운트되면 getData 함수를 호출함
  useEffect(() => {
    getData();
  }, []);

  // useCallback을 사용하여 onCreate 함수를 기억함
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    }); // dispatch를 통해 reducer에 action을 전달함

    dataId.current += 1; // 다음 아이템을 위해 id값을 1 증가시킴
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId }); // dispatch를 통해 reducer에 action을 전달함
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent }); // dispatch를 통해 reducer에 action을 전달함
  }, []);

  const memoizedDispatchs = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []); // onCreate, onRemove, onEdit 함수를 객체로 묶어서 반환하고, 재생성되지 않도록 빈 배열을 두 번째 인자로 전달함

  // useMemo를 사용하여 getDiaryAnalysis 함수를 호출한 결과를 기억함
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length; // 감정이 3 이상인 아이템의 개수를 구함
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio }; // goodCount, badCount, goodRatio를 객체로 반환함
  }, [data.length]); // data.length가 변경될 때만 getDiaryAnalysis 함수를 호출함

  // getDiaryAnalysis 함수를 호출하여 반환값을 goodCount, badCount, goodRatio에 할당함
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatchs}>
        <div className="App">
          <DiaryEditor onCreate={onCreate} />{" "}
          {/* onCreate 함수를 props로 전달 */}
          <div>전체일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList onEdit={onEdit} onRemove={onRemove} />
          {/* onEdit, onRemove 함수와 data를 props로 전달 */}
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
