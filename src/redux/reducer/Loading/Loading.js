import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/Loading/LoadingConstant";

const initialState = {
  isLoading: false,
};

const LoadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DISPLAY_LOADING:
      return { ...state, isLoading: true };

    case HIDE_LOADING:
      return { ...state, isLoading: false };
      
    default:
      return state;
  }
};

export default LoadingReducer;
