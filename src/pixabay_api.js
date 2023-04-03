import axios from 'axios';

export const pixabayApi = async(name, page) => {
    const API_KEY = '34923285-708b41b0c2a9dca89e9ee12b3';
    const BASE_URL = 'https://pixabay.com';
      
        return await axios.get(`${BASE_URL}/api/?key=${API_KEY}&q=${name}&page=${page}&per_page=150&image_type=photo&orientation=horizontal&safesearch=true`)
          
    }



















// export const pixabayApi = (name, page) => {
//     const API_KEY = '34923285-708b41b0c2a9dca89e9ee12b3';
//     const BASE_URL = 'https://pixabay.com';
      
//         return fetch(`${BASE_URL}/api/?key=${API_KEY}&q=${name}&page=${page}&per_page=150&image_type=photo&orientation=horizontal&safesearch=true`)
//             .then(responce => {
//                 console.log(responce)
      
//             if (!responce.ok) {
//                 throw new Error(responce.status);

//                 }
                
//             return responce.json();
//         })
//     }





























// export class PixabayApi {
//     // Объявляем приватные свойства
//     #API_KEY = '34923285-708b41b0c2a9dca89e9ee12b3';
//     #BASE_URL = 'https://pixabay.com';

//     query = null;
//     page = 1;
    
//     // объявляем метод по созданию запроса на URL

//     fetchFoto() {
//         return fetch(`${this.#BASE_URL}/api/?key=34923285-708b41b0c2a9dca89e9ee12b3&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40&webformatURL,largeImageURL,tags,likes,views,comments,downloads`)
//             .then(responce => {
        
//             if (!responce.ok) {
//                 throw new Error(responce.status);

//                 }
                
//             return responce.json();
//         })
//     }
// }
// console.log(PixabayApi.query);