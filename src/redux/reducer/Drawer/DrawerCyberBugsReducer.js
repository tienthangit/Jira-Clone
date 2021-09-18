import React from "react";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_CREATE_TASK,
  SET_SUBMIT_EDIT_PROJECT,
} from "../../constants/Drawer/DrawerConstant";

const initialState = {
  visible: false,
  title: "",
  ComponentContentDrawer: "",
  callBackSubmit: () => {
      
  } ,
  //    (propsValue) => {
  // alert("Click demo!");
  //   },
};

const DrawerCyberBugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };

    case CLOSE_DRAWER:
      return { ...state, visible: false };

    case OPEN_FORM_EDIT_PROJECT:
      console.log(action);
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };

    case SET_SUBMIT_EDIT_PROJECT:
      return { ...state, callBackSubmit: action.submitFunction };

    case OPEN_FORM_CREATE_TASK: {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };
    }

    case SET_SUBMIT_CREATE_TASK: {
      return { ...state, callBackSubmit: action.submitFunction };
    }

    default:
      return state;
  }
};

export default DrawerCyberBugsReducer
