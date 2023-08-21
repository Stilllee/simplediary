import React, { useRef, useState, useEffect } from "react";

const DiaryEditor = ({ onCreate }) => {
  const authorInput = useRef(); // useRef함수를 호출해 반환값을 authorInput에 담아줌
  const contentInput = useRef(); // useRef함수를 호출해 반환값을 contentInput에 담아줌

  useEffect(() => {
    console.log("DiaryEditor rendered");
  });

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus(); // 현재 가리키는 값(authorInput)을 current로 불러와 focus라는 기능을 사용함
      return; // 더 이상 진행되지 않도록 함수를 여기서 끝내기
    }

    if (state.content.length < 5) {
      contentInput.current.focus(); // 현재 가리키는 값(contentInput)을 current로 불러와 focus라는 기능을 사용함
      return; // 더 이상 진행되지 않도록 함수를 여기서 끝내기
    }

    onCreate(state.author, state.content, state.emotion); // props로 전달받은 onCreate 함수에 state값을 전달함
    alert("저장 성공!");
    setState({
      author: "",
      content: "",
      emotion: "1",
    }); // 저장 후 input값을 초기화함
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput} // ref에 authorInput를 전달하여 input에 접근할 수 있게됨
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput} // ref에 contentInput를 전달하여 textarea에 접근할 수 있게됨
          name="content"
          value={state.content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      <select name="emotion" value={state.emotion} onChange={handleChangeState}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <button onClick={handleSubmit}>저장하기</button>
    </div>
  );
};

export default React.memo(DiaryEditor); // React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지함
