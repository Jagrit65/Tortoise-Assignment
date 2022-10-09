import * as Constants from "../../../redux/constants";


export const setBottomCount = (count = 0) => {
    return {
        type: Constants.SET_BOTTOM_COUNT,
        payload: count,
    };
};

export const setImageList = (list = []) => {
    return {
        type: Constants.SET_IMAGE_LIST,
        payload: list,
    };
}
