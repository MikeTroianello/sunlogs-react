import axios from 'axios';

class AuthService {
  constructor(token) {
    let service = axios.create({
      // baseURL: `https://sunlogs-express-api.herokuapp.com/api/`,
      baseURL: `http://localhost:5000/api/`,
      headers: {
        'x-auth-token': token,
      },
      credentials: 'omit',
    });
    this.service = service;
  }

  test = () => {
    return this.service.get('/').then((res) => res.data);
  };

  signup = (state) => {
    return this.service
      .post('/signup', { state })
      .then((response) => response.data);
  };

  //TOKEN
  loggedin = (day, year) => {
    return this.service
      .get(`/loggedin/${day}/${year}`)
      .then((response) => response.data);
  };

  login = (username, password, day, year) => {
    return this.service
      .post('/login', { username, password, day, year })
      .then((response) => {
        return response.data;
      });
  };

  //TOKEN
  create = (info, token) => {
    return this.service
      .post('/log/create', { info })
      .then((response) => response.data);
  };

  getDate = (year, dayOfYear) => {
    return this.service
      .get(`/log/date/${year}/${dayOfYear}`)
      .then((response) => response.data);
  };
  //TOKEN
  profile = (token) => {
    return this.service
      .get(`/log/all/my-posts`)
      .then((response) => response.data);
  };
  //TOKEN
  seeUser = (userId, token) => {
    return this.service
      .get(`/log/all/${userId}`)
      .then((response) => response.data);
  };
  //TOKEN
  changeInfo = (userInfo, token) => {
    return this.service
      .post(`/change-info`, { userInfo })
      .then((response) => response.data);
  };

  changePass = (userInfo, token) => {
    return this.service
      .post(`/change-password`, { userInfo })
      .then((response) => response.data);
  };
  //TOKEN
  deleteUser = (confirmation, token) => {
    return this.service
      .post(`/delete-user`, { confirmation })
      .then((response) => response.data);
  };

  logout = () => {
    return this.service.post('/logout', {}).then((response) => response.data);
  };
}

export default AuthService;
