import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./App";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext); // useContext를 사용하여 DiaryStateContext의 값을 읽어옴
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} /> // DiaryItem 컴포넌트에 props로 전달
        ))}
      </div>
    </div>
  );
};

// undefined가 들어올 수도 있기 때문에 defaultProps를 통해 기본값을 설정해줌
DiaryList.defaultProps = {
  diaryList: [], // 기본값을 빈 배열로 설정
};

export default DiaryList;
