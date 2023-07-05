// Action Types
export const ADD_DATA = 'ADD_DATA';
export const EDIT_DATA = 'EDIT_DATA';
export const DELETE_DATA = 'DELETE_DATA';

export const addData = (newData) => {
  return {
    type: ADD_DATA,
    payload: newData, 
  };
};
export const editData = (index, newData) => {
  return {
    type: EDIT_DATA,
    payload: { index, newData },
  };
};
export const deleteData = (index) => {
  return {
    type: DELETE_DATA,
    payload: index,
  };
};

const initialState = {
  submittedData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        submittedData: [...state.submittedData, action.payload],
      };
    case EDIT_DATA:
      const { index, newData } = action.payload;
      const updatedData = state.submittedData.map((item, i) =>
        i === index ? { ...item, ...newData } : item
      );
      console.log('data:', updatedData)
      return {
        ...state,
        submittedData: updatedData,
      };
    case DELETE_DATA:
      const filteredData = state.submittedData.filter((_, i) => i !== action.payload);
      return {
        ...state,
        submittedData: filteredData,
      };
    default:
      return state;
  }
};

export default reducer;
