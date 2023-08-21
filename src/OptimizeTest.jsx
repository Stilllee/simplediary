import React, { useEffect, useState } from "react";

// React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 하지 않도록 설정함
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA update - count: ${count}`);
  });

  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB update - count: ${obj.count}`);
  });

  return <div>{obj.count}</div>;
};

/* const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true; // obj.count가 변경되지 않으면 리렌더링을 하지 않음
  }
}; */
const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count; // obj.count가 변경되지 않으면 리렌더링을 하지 않음
};

const MemoizedCounterB = React.memo(CounterB, areEqual); // areEqual 함수를 사용하여 리렌더링 여부를 결정함

// CounterA와 CounterB 컴포넌트를 렌더링하는 컴포넌트
const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
        {/* count를 변경하지 않음 */}
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
        {/* obj.count를 변경하지 않음 */}
      </div>
    </div>
  );
};

export default OptimizeTest;
