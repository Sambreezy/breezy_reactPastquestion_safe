import { GET_USER, USEREDIT_VALUE, USER_EDITPIX } from '../actions/types';

const initialState = {
  singleusername: '',
  singleuserphone: '',
  singleuserdesc: '',
  singleuserid: '',
  singleuser: {},
  singleuserdocs: [],
  userpix: [],
  singleuserpicturename: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        singleuser: action.payload,
        singleuserpicturename: action.payload.picture,
        singleuserid: action.payload.id,
        singleusername: action.payload.name,
        singleuserphone: action.payload.phone,
        singleuserdesc: action.payload.description,
        singleuserdocs: action.payload.past_question
      };

    case USEREDIT_VALUE:
      return {
        ...state,
        [action.payload.props]: action.payload.value
      };

    case USER_EDITPIX:
      return {
        ...state,
        userpix: action.payload
      };
    default:
      return state;
  }
}
