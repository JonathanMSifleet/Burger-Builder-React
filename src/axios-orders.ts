import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://react-project-776bc-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;
