export const URI_LOGIN = 'http://localhost:3000/api/v1/auth/login';

export const URI_REGISTER = 'http://localhost:3000/api/v1/auth/register';

export const URI_FORGOT_PASSWORD = 'http://localhost:3000/api/v1/auth/forgot-password'

export const URI_CHANGE_PASSWORD = 'http://localhost:3000/api/v1/auth/change-password'

export const URI_CONFIRM_PASSWORD = 'http://localhost:3000/api/v1/auth/confirm-password'

export const URI_USERS = 'http://localhost:3000/user'

export const URI_CARS = 'http://localhost:3000/car'

export const URI_PICTURES = 'http://localhost:3000/picture'

export const URI_GET_PICTURES_BY_CAR_AND_TYPE = (id: number, type: string) => `http://localhost:3000/picture/cars/${id}?type=${type}`;

export const URI_GET_PICTURES_BY_CAR = (id: number) => `http://localhost:3000/picture/cars/${id}`;