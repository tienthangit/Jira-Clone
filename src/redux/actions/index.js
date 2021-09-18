//action của creator
const createAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export default createAction;
