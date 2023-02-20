import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

type Props = {
  accessToken: string;
}

const Hero = (props: Props) => {
  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split(';');
    const cookie = cookieArray.find(cookie => cookie.trim().startsWith('access_token_cookie='));
    const cookieValue = cookie ? cookie.split('=')[1] : '';
    setAccessToken(cookieValue);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post('http://127.0.0.1:5000/api/v1/login', {
          username: "123",
          password: "abshir"
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          },
        });
        setData(result.data);
        const access_token = result.headers['set-cookie'][0].split(';')[0];
        const {access_token_cookie} = Cookies.get()
        if(access_token_cookie){
          console.log("hello")
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <div>
      {data ? (
        <p>Data received: {JSON.stringify(data)}</p>
      ) : (
        <p>Loading data...</p>
      )}
      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
};

export default Hero;
