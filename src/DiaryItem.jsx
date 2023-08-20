const DiaryItem = ({
  onRemove,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button
        onClick={() => {
          // 삭제 버튼을 누르면 삭제 여부를 묻는 confirm 창이 뜸
          // 확인을 누르면 true, 취소를 누르면 false를 반환함
          if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id); // 삭제 여부를 확인한 후 true이면 onRemove 함수를 호출함
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};
export default DiaryItem;
