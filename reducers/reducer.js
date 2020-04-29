const SET_MEDCABS = "SET_MEDCABS";
const SET_LOCATION = "SET_LOCATION";
const SET_FILTERS = "SET_FILTERS";
const SET_LOADING = "SET_LOADING";
const SET_PROFIL = "SET_PROFIL";
const SET_USER = "SET_USER";
const SET_ETABLISSEMENT = "SET_ETABLISSEMENT";
const SET_REMPLACANT_ANNONCE = "SET_REMPLACANT_ANNONCE";
const SET_ANNONCE_UTILISATEUR = "SET_ANNONCE_UTILISATEUR";
const UPDATE_ANNONCE = "UPDATE_ANNONCE";
const SET_ANNONCE = "SET_ANNONCE";
const SET_REMPLACANT_POSTULE = "SET_REMPLACANT_POSTULE";
const SET_RECUP_USER = "SET_RECUP_USER";
const UPDATE_RECUP_USER = "UPDATE_RECUP_USER";
// Initial state
const INITIAL_STATE = {
  allUser: [],
  annonceUser: [],
  remplacantAnnonce: [],
  remplacantPostule: [],
  etablissement: [],
  spots: [],
  user: [],
  profils: {},
  mylocation: {
    latitude: 37.79035,
    longitude: -122.4384,
  },
  filters: {
    sort: "distance",
    type: "all",
    price: "free",
    option_full: true,
    option_rated: true,
    option_free: false,
  },
  loading: false,
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  // console.log("ACTION PAYLOAD");
  // console.log(action.payload);
  // console.log("STATE");
  // console.log(state);
  switch (action.type) {
    case UPDATE_ANNONCE:
      state.annonceUser[0].actived = action.payload.actived;
      return {
        ...state,
      };
    case UPDATE_RECUP_USER:
      console.log(state.allUser);
      state.allUser.forEach((item, i) => {
        if (item.id == action.payload.idUser) {
          state.allUser[i].verifier = action.payload.actived;
        }
      });
      return {
        ...state,
      };
    case SET_RECUP_USER:
      return {
        ...state,
        allUser: action.payload,
      };
    case SET_PROFIL:
      return {
        ...state,
        profils: action.payload,
      };
    case SET_REMPLACANT_POSTULE:
      return {
        ...state,
        remplacantPostule: action.payload,
      };
    case SET_ANNONCE_UTILISATEUR:
      return {
        ...state,
        annonceUser: action.payload,
      };
    case SET_REMPLACANT_ANNONCE:
      return {
        ...state,
        remplacantAnnonce: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_MEDCABS:
      return {
        ...state,
        spots: action.payload.annonce,
      };
    case SET_ANNONCE:
      state.spots.push(action.payload);
      return {
        ...state,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ETABLISSEMENT:
      return {
        ...state,
        etablissement: action.payload,
      };
    default:
      return state;
  }
}

// Actions
export function setAnnonceUtilisateur(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_ANNONCE_UTILISATEUR,
      payload,
    });
  };
}

export function updateRecupUser(payload) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_RECUP_USER,
      payload,
    });
  };
}

export function setRecupUser(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_RECUP_USER,
      payload,
    });
  };
}

export function setRemplacantPostule(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_REMPLACANT_POSTULE,
      payload,
    });
  };
}

export function setAnnonce(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_ANNONCE,
      payload,
    });
  };
}

export function updateAnnonce(payload) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ANNONCE,
      payload,
    });
  };
}

export function setMedCabs(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_MEDCABS,
      payload,
    });
  };
}

export function setRemplacantAnnonce(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_REMPLACANT_ANNONCE,
      payload,
    });
  };
}
export function setEtablissement(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_ETABLISSEMENT,
      payload,
    });
  };
}

export function setUser(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload,
    });
  };
}

export function setLocation(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_LOCATION,
      payload,
    });
  };
}

export function setFilters(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_FILTERS,
      payload,
    });
  };
}

export function setLoading(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
    });
  };
}

export function setProfil(payload) {
  console.log("reducer profil");

  return (dispatch) => {
    dispatch({
      type: SET_PROFIL,
      payload,
    });
  };
}
