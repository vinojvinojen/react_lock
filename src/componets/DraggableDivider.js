import React from 'react';

const DraggableDivider = ({ handleDrag }) => {
  return (
    <hr
      className="divider"
      style={{ width: '4px', backgroundColor: "grey", margin: "2vh", minHeight: "200vh" ,  
      cursor: 'col-resize'}}
      onMouseDown={(e) => {
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', handleDrag);
        });
      }}
    />
  );
};

export default DraggableDivider;
