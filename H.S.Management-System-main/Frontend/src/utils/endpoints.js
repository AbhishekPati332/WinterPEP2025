const BASEURL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const endPoints = {
    LOGIN_API: BASEURL + "/auth/login",
    SIGNUP_API: BASEURL + "/auth/signup",
    CREATE_HOSPITAL_API: BASEURL + "/hospital/create",
    GET_ALL_HOSPITAL_API: BASEURL + "/hospital/all",
    GET_PARTICULAR_HOSPITAL_API: BASEURL + "/hospital/get",
    DELETE_PARTICULAR_HOSPITAL_API: BASEURL + "/hospital/delete",
    UPDATE_PARTICULAR_HOSPITAL_API: BASEURL + "/hospital/update",
    GET_USERS_ALL_HOSPITAL_API: BASEURL + "/hospital/myHospitals",
    UPDATE_PARTICULAR_HOSPITAL_DETAIL_API: BASEURL + "/hospitalDetail/update"
}