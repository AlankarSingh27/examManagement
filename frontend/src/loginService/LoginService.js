
import axios from 'axios';

export class UserService {
    serverUrl = "http://localhost:8081";

   loginUser(user){
        let dataUrl = `${this.serverUrl}/user/login`;
        const data = { email: user.email, password:user.password }
        return axios.post(dataUrl, data);
    }
}