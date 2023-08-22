import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  useEffect(() => {
    console.log(`${id}번 째 아이템 렌더`);
  });

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content); // 수정 중인 내용을 저장하는 state
  const localContentInput = useRef();

  // 수정 취소 버튼을 누르면 원래의 내용으로 돌아가는 함수
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent); // 수정 여부를 확인한 후 true이면 onEdit 함수를 호출함
      toggleIsEdit(); // 수정이 완료되면 isEdit를 false로 바꿔서 수정 취소 버튼을 숨김
    }
  };

  const handleRemove = () => {
    // 삭제 버튼을 누르면 삭제 여부를 묻는 confirm 창이 뜸
    // 확인을 누르면 true, 취소를 누르면 false를 반환함
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id); // 삭제 여부를 확인한 후 true이면 onRemove 함수를 호출함
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
