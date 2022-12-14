import { useEffect, useState } from "react";

function App() {
  const [elementCoordinate, setElementCoordinate] = useState([]);
  const elemmentsOverlap = (rect1, rect2) => {
    const collide = !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
    return collide;
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const draw = (e) => {
    const { clientX, clientY } = e;
    console.log(clientX, clientY);
    setElementCoordinate((prevState) => {
      const current = {
        top: clientY - 100,
        left: clientX - 100,
        right: clientX - 100 + 200,
        bottom: clientY - 100 + 200,
        background: "red",
      };

      for (let i = 0; i < prevState.length; i++) {
        if (elemmentsOverlap(current, prevState[i])) {
          current.background = getRandomColor();
          break;
        }
      }
      return [...prevState, current];
    });
  };

  useEffect(() => {
    document.addEventListener("click", draw);
    return () => {
      document.removeEventListener("click", draw);
    };
  }, []);

  const Circle = ({ top, left, background }) => {
    return (
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          opacity: "0.5",
          background,
          top,
          left,
        }}
      ></div>
    );
  };
  return (
    <div className="App">
      {elementCoordinate.map((e) => (
        <Circle {...e} />
      ))}
    </div>
  );
}

export default App;
