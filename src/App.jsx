import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

/* const dummyList = [
  {
    id: 1,
    author: "Woodstock",
    content: "What a Nice Day!",
    emotion: 4,
    created_date: new Date().getTime(), // getTime()은 현재 시간을 숫자(milliseconds)로 반환함
  },
  {
    id: 2,
    author: "Snoopy",
    content: "I'm so happy",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "Charlie Brown",
    content: "Gloomy Day :(",
    emotion: 1,
    created_date: new Date().getTime(),
  },
]; */

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} /> {/* onCreate 함수를 props로 전달 */}
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      {/* onEdit, onRemove 함수와 data를 props로 전달 */}
    </div>
  );
}

export default App;
