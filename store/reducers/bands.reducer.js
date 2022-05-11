import { ADD_BAND } from "../actions/bands.action";

const initialState = {
  bands: [
    {
      id: "814589e7-edb4-446f-9093-8a21b3ae0c5a",
      name: 'The Rolling Stones',
    },
  ]
};

const BandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BAND:
      return {
        ...state,
        bands: [...state.bands, action.payload]
      }
    default:
      return state;
  }
};

export default BandsReducer;