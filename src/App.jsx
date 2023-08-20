import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
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
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
