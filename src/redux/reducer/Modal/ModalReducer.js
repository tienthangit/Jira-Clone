import { HANDLE_MODAL } from "../../constants/Modal/ModalConstant";

const initialState = {
    isModal: false,
}

const ModalReducer = (state = initialState, {type, payload}) => {
    switch (type) {

    case HANDLE_MODAL:
        return { ...state, isModal: payload}

    default:
        return state
    }
}

export default ModalReducer;
