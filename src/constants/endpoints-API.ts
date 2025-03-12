export const URI_LOGIN = 'http://localhost:3000/api/v1/auth/login';

export const URI_REGISTER = 'http://localhost:3000/api/v1/auth/register';

export const URI_FORGOT_PASSWORD = 'http://localhost:3000/api/v1/auth/forgot-password'

export const URI_CHANGE_PASSWORD = 'http://localhost:3000/api/v1/auth/change-password'

export const URI_CONFIRM_PASSWORD = 'http://localhost:3000/api/v1/auth/confirm-password'

export const URI_USERS = 'http://localhost:3000/user'

export const URI_UPDATE_USER = (id: number) => `http://localhost:3000/user/${id}`

export const URI_GET_USER_BY_EMAIL = (email: string) => `http://localhost:3000/user/email/${email}`

export const URI_CARS = 'http://localhost:3000/car'

export const URI_PICTURES = 'http://localhost:3000/picture'

export const URI_GET_PICTURES_BY_CAR_AND_TYPE = (id: number, type: string) => `http://localhost:3000/picture/cars/${id}?type=${type}`;

export const URI_GET_PICTURES_BY_CAR = (id: number) => `http://localhost:3000/picture/cars/${id}`;

export const URI_RENTS = 'http://localhost:3000/rent'

export const URI_PENDING_RENTS = 'http://localhost:3000/rent/status/pending'

export const URI_ACCEPTED_RENTS = 'http://localhost:3000/rent/status/accepted'

export const URI_REJECTED_RENTS = 'http://localhost:3000/rent/status/rejected'

export const URI_FINISHED_RENTS = 'http://localhost:3000/rent/status/finished'

export const URI_ADMIT_RENT = (id: number) => `http://localhost:3000/rent/requests/${id}/admit`

export const URI_REJECT_RENT = (id: number) => `http://localhost:3000/rent/requests/${id}/reject`

export const URI_CANCEL_RENT = (id: number) => `http://localhost:3000/rent/${id}/cancel`   

export const URI_FINISH_RENT = (id: number) => `http://localhost:3000/rent/${id}/finish`

export const URI_UNAVAILABLE_DATES = (id: number) => `http://localhost:3000/rent/availability/${id}`

export const URI_GET_MY_HISTORY =  `http://localhost:3000/rent/me/history`

export const URI_GET_DOCUMENTS_BY_USER = (id: number) => `http://localhost:3000/document/user/${id}`

export const URI_DOCUMENTS = 'http://localhost:3000/document'

export const URI_UPLOAD_DOCUMENT = 'http://localhost:3000/s3/upload/document'

export const URI_S3_UPLOAD_CAR = 'http://localhost:3000/s3/upload/car'

