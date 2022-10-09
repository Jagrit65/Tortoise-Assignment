import * as Constants from "../../../redux/constants";

const INITIAL_STATE = {
    bottomCount: 0,
    imageList: []
};

const dashboard = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constants.SET_BOTTOM_COUNT:
            return Object.assign({}, state, {
                bottomCount: action.payload,
            });

        case Constants.SET_IMAGE_LIST:
            return Object.assign({}, state, {
                imageList: action.payload,
            });

        default:
            return state;
    }
};

export default dashboard;
