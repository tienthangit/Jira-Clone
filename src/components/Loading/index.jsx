import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

export default function Loading(props) {
  const { isLoading } = useSelector((state) => state.LoadingReducer);

if (isLoading) {
    return (
      <div className="bgLoading">
        <img src="./assets/loading.gif" alt="loading"></img>
      </div>
    );
  } else {
    return "";
  }
}
