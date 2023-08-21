import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

function App() {
  const [data, setData] = useState([]);

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
    setData(initData);
  };

  // useEffect를 사용하여 컴포넌트가 마운트되면 getData 함수를 호출함
  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current, // useRef를 사용하여 id값을 관리함
    };
    dataId.current += 1; // 다음 아이템을 위해 id값을 1 증가시킴
    setData([newItem, ...data]); // 기존 배열에 새로운 아이템을 추가한 새로운 배열을 만들어서 setData로 넘겨줌
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId); // id가 targetId인 아이템을 제외한 새로운 배열을 만듦
    setData(newDiaryList); // 새로운 배열을 setData로 넘겨줌
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    ); // 기존의 아이템을 그대로 유지하면서 id가 targetId인 아이템의 content만 newContent로 바꾼 후에 새로운 배열을 setData로 넘겨줌
  };

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
    <div className="App">
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} /> {/* onCreate 함수를 props로 전달 */}
      <div>전체일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      {/* onEdit, onRemove 함수와 data를 props로 전달 */}
    </div>
  );
}

export default App;
