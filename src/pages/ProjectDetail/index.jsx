import React, { useEffect } from "react";
import HeaderMain from "../../components/HeaderMain";
import InfoMain from "../../components/InfoMain";
import ContentMain from "../../components/ContentMain";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/constants/Project/ProjectConstant";

export default function ProjectDetail(props) {
  let { projectDetail } = useSelector((state) => state.ProjectReducer);

  const dispatch = useDispatch();
  // console.log('projectDetail',projectDetail)
  useEffect(() => {
    // Khi người dùng link qua trang này bằng thẻ nav;ink hoặc người dùng gõ url thì ta sẽ lấy tham số từ url => gọi saga
    const projectId = props.match.params.projectId;

    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId,
    });
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail}></HeaderMain>
      <h3>{projectDetail.projectName}</h3>
      <InfoMain projectDetail={projectDetail}></InfoMain>
      <ContentMain projectDetail={projectDetail}></ContentMain>
    </div>
  );
}
