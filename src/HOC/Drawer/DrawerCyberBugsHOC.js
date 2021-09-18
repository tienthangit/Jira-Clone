import React, { useState } from "react";
import {
  Drawer,
  Button,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER, OPEN_DRAWER } from "../../redux/constants/Drawer/DrawerConstant";


export default function DrawerCyberBugsHOC(props) {
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.DrawerCyberBugsReducer);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
