import {
  UPLOADPQUESTION_VALUE,
  UPLOAD_PQUESTION,
  IMGDOC_VALUE,
  GET_PASTQUESTION,
  GET_PREVNEXT,
  SEARCH_PASTQUESTION,
  GET_SINGLEITEM,
  GET_FIRSTPASTQUESTION,
  PQS_ARRAY,
  DELETE_PQUESTION,
  UPLOADPARAM_VALUE,
  JS_VOTEUP,
  JS_VOTEDOWN,
  COMMENT_QUESTION,
  CONTACT_US,
  ONFILE_CHANGE,
  GET_SCHOOLS
} from '../actions/types';

const initialState = {
  course_name: '',
  year: '',
  course_code: '',
  school: '',
  department: '',
  semester: '',
  pastquestion: '',
  uploading: false,
  images: [],
  docs: [],
  questions: [],
  prev: '',
  next: '',
  search: '',
  results: [],
  schools: [],
  singleitem: {},
  singleimages: [],
  singledocs: [],
  singlecomments: [],
  singlecommentuser: [],
  firstquestions: [],
  deletedPqs: [],
  successdelete: '',
  comment: '',
  singleitemid: '',
  all_name: '',
  all_email: '',
  all_message: '',
  jsvoteupshow: '',
  jsvotedownshow: '',
  uploaded_by: '',
  results_state: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOADPQUESTION_VALUE:
      return {
        ...state,
        [action.payload.props]: action.payload.value
      };

    case ONFILE_CHANGE:
      return {
        ...state,
        [action.payload.props]: action.payload.value
      };

    case GET_SCHOOLS:
      return {
        ...state,
        schools: action.payload
      };

    case IMGDOC_VALUE:
      return {
        ...state,
        uploading: action.payload
      };
    case UPLOAD_PQUESTION:
      return {
        ...state,
        pastquestion: action.payload.message,
        course_name: '',
        year: '',
        course_code: '',
        school: '',
        department: '',
        semester: '',
        images: [],
        docs: []
      };

    case GET_PASTQUESTION:
      return {
        ...state,
        questions: action.payload,
        results_state: false
      };

    case GET_FIRSTPASTQUESTION:
      return {
        ...state,
        firstquestions: action.payload
      };

    case COMMENT_QUESTION:
      return {
        ...state,
        comment: ''
      };

    case GET_PREVNEXT:
      return {
        ...state,
        prev: action.payload.prev_page_url,
        next: action.payload.next_page_url
      };

    case SEARCH_PASTQUESTION:
      return {
        ...state,
        results: action.payload,
        search: '',
        results_state: action.payload1
      };

    case GET_SINGLEITEM:
      console.log(action.payload.comment, 'i am pay');
      return {
        ...state,
        singleitem: action.payload,
        singleimages: action.payload.image,
        singledocs: action.payload.document,
        singlecomments: action.payload.comment,
        singlecommentuser: action.payload.comment.user_picture,
        uploaded_by: action.payload.uploaded_by
      };

    case PQS_ARRAY:
      let newArray = [...state.deletedPqs];

      if (newArray.includes(action.payload)) {
        newArray.pop(action.payload);
      } else {
        newArray.push(action.payload);
      }
      return {
        ...state,
        deletedPqs: newArray
      };

    case DELETE_PQUESTION:
      return {
        ...state,
        successdelete: action.payload
      };
    case JS_VOTEUP:
      return {
        ...state,
        jsvoteupshow: action.payload
      };
    case JS_VOTEDOWN:
      return {
        ...state,
        jsvotedownshow: action.payload
      };
    case UPLOADPARAM_VALUE:
      return {
        ...state,
        singleitemid: action.payload
      };
    case CONTACT_US:
      return {
        ...state,
        all_name: '',
        all_email: '',
        all_message: ''
      };

    default:
      return state;
  }
}
