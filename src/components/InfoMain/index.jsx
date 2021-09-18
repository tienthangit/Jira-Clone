import React from "react";

export default function InfoMain(props) {
  console.log("props.projectDetail", props.projectDetail);

  const { members } = props.projectDetail;
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {members?.map((mem, index) => {
          return (
            <div className="avatar" key={index}>
              <img src={mem.avatar} alt="" />
            </div>
          );
        })}
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
