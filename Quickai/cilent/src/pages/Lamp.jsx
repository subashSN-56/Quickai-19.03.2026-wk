

// import { useRef, useState, useEffect } from "react";

// const Lamp = ({ toggle, active }) => {
//   const [dragY, setDragY] = useState(0);
//   const startY = useRef(0);
//   const pulling = useRef(false);

//   // Start pulling
//   const handleMouseDown = (e) => {
//     pulling.current = true;
//     startY.current = e.clientY;
//   };

//   // Drag
//   const handleMouseMove = (e) => {
//     if (!pulling.current) return;

//     const distance = e.clientY - startY.current;

//     if (distance > 0 && distance < 20) {
//       setDragY(distance);
//     }
//   };

//   // Release
//   const handleMouseUp = () => {
//     if (pulling.current && dragY > 15) {
//       toggle(); // toggle chat / light
//     }

//     setDragY(0);
//     pulling.current = false;
//   };

//   // Global mouse tracking
//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   });

//   return (
//     <div className={`lamp-circle ${active ? "active" : ""}`}>
//       <div className="lamp-wrapper">
        
//         {/* Glow */}
//         <div className={`light-glow ${active ? "on" : ""}`}></div>

//         <div className="lamp">
//           <div className={`shade ${active ? "shade-on" : ""}`}></div>
//           <div className="stand"></div>
//           <div className="base"></div>

//           {/* Rope */}
//           <div
//             className="rope"
//             onMouseDown={handleMouseDown}
//             style={{
//               height: `${90 + dragY}px`
//             }}
//           ></div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Lamp;


import { useRef, useState, useEffect } from "react";

const Lamp = ({ toggle, active }) => {
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const pulling = useRef(false);

  // -------------------------
  // START DRAG (MOUSE + TOUCH)
  // -------------------------
  const startPull = (clientY) => {
    pulling.current = true;
    startY.current = clientY;
  };

  const handleMouseDown = (e) => startPull(e.clientY);
  const handleTouchStart = (e) => startPull(e.touches[0].clientY);

  // -------------------------
  // DRAG MOVE
  // -------------------------
  const movePull = (clientY) => {
    if (!pulling.current) return;

    const distance = clientY - startY.current;

    if (distance > 0 && distance < 25) {
      setDragY(distance);
    }
  };

  const handleMouseMove = (e) => movePull(e.clientY);
  const handleTouchMove = (e) => movePull(e.touches[0].clientY);

  // -------------------------
  // RELEASE
  // -------------------------
  const endPull = () => {
    if (pulling.current && dragY > 15) {
      toggle(); // 🔥 toggle light/chat
    }

    setDragY(0);
    pulling.current = false;
  };

  // -------------------------
  // GLOBAL EVENTS
  // -------------------------
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", endPull);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", endPull);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", endPull);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", endPull);
    };
  });

  return (
    <div className={`lamp-circle ${active ? "active" : ""}`}>
      <div className="lamp-wrapper">

        {/* Glow */}
        <div className={`light-glow ${active ? "on" : ""}`}></div>

        <div className="lamp">

          {/* 🔥 CLICKABLE BULB */}
          <div
            className={`shade ${active ? "shade-on" : ""}`}
            
            part="bulb"
            onClick={toggle}
            onTouchStart={toggle}
          ></div>

          <div className="stand"></div>
          <div className="base"></div>

          {/* Rope */}
          <div
            className="rope"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
              height: `${90 + dragY}px`
            }}
          ></div>

        </div>
      </div>
    </div>
  );
};

export default Lamp;