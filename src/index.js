import './css/styles.css';
             // импортируем функцию по созданию запроса на URL
import { pixabayApi } from './pixabay_api';

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
console.log(SimpleLightbox)

import axios from 'axios';
console.log(axios)
 
let query = null;
let page;
let markup = [];

const formEl = document.querySelector('.search-form');
console.log(formEl);

const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

const loadBtnEl = document.querySelector('.load-more');
console.log(loadBtnEl);

formEl.addEventListener('submit', handleLoadPhoto);
loadBtnEl.addEventListener('click', handleLoadMorePhoto);

               // кнопка LoadMore изначально спрятана
loadBtnEl.classList.add('is-hidden');
 
function handleLoadPhoto(event) {
                // начинаем отсчет страницы с 1 перед запросом
    page = 1;
                // запрещаем обновление формы
    event.preventDefault();
    console.log(event.currentTarget.elements);

                // находим значение введенных данных в инпут без пробелов
    const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
    console.log(searchQuery)

    query = searchQuery;

                 // если в инпупе пустая строка - запрос не отправляется
    if (searchQuery === '') {
    return
    }
                 // вызываем функцию по созданию запроса и в качестве аргументов передаем значение инпута и страницы для запроса
  pixabayApi(query, page)
    .then(({ data: { hits, totalHits } }) => {
      console.log(hits);
      console.log(totalHits);

        //  если пришел пустой массив, т.е. без данных, выводим сообщение, очищаем форму, очищаем разметку и прячем кнопку
      if ( hits.length === 0) {
             
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        formEl.reset();
        galleryEl.innerHTML = "";
        loadBtnEl.classList.add('is-hidden');
        return;
      }
                     // вызываем функцию по созданию разметки
      renderPhoto(hits);
                            //  заносим разметку в div стирая предыдущие данные
      galleryEl.innerHTML = markup;
        // используем плавную прокрутку страницы
      scroll()
                    // загрузились картинки - кнопка LoadMore появляется
      loadBtnEl.classList.remove('is-hidden');

          // сразу после загрузки используем библиотеку
      gallery();
         
        //  если пришло картинок меньше, чем всего доступных бесплатных, то выводим сообщение, прячем кнопку,очищаем форму, обнуляем страницу
      if (totalHits <= hits.length * page) {
            
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        loadBtnEl.classList.add('is-hidden');
        formEl.reset();
        page = 0;
        return;
      };
    })
    .catch ((error) => {
      console.log(error);
    })
}

function handleLoadMorePhoto() {
                // увеличиваем страницу на 1 перед следующим запросом
    page += 1;
  pixabayApi(query, page)   
    .then(({ data: {hits, totalHits}}) => {
                // выводим сообщение
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
          
                 // вызываем функцию по созданию разметки
      renderPhoto(hits);
                 //  заносим разметку карточек в div пополняя предыдущие данные
      galleryEl.insertAdjacentHTML('beforeend', markup);

                // используем плавную прокрутку страницы
      scroll()
               // сразу после загрузки используем библиотеку
      gallery();
          
               //когда картинки закончились выводим сообщение, прячем кнопку , очищаем форму,  обнуляем страницы
      if (totalHits <=  hits.length * page) {
              
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        loadBtnEl.classList.add('is-hidden');
        formEl.reset();
        page = 0;
        return;
      }
    })
    .catch ((error) => {
        console.log(error);
    })
 }

function renderPhoto(list) {
                        // перебираем массив элементов и на каждый из них выводим разметку
    markup = list.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <a href="${largeImageURL}" class="photo-item">
  <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" width=250 height=180/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes <span class=info-span>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views <span class=info-span>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments <span class=info-span>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads <span class=info-span>${downloads}</span></b>
    </p>
  </div>
</div>`
    }).join('');
  return markup;
      
}

// функция по использованию библиотеки
function gallery() {
  let gallery = new SimpleLightbox('.gallery a')
  console.log(gallery);
  gallery.refresh();
}



function scroll() {
  const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
  
  console.dir(document.querySelector(".gallery").firstElementChild.getBoundingClientRect());
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
});
}




































// import './css/styles.css';
//              // импортируем функцию по созданию запроса на URL
// import { pixabayApi } from './pixabay_api';

// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// console.log(SimpleLightbox)

// import axios from 'axios';
// console.log(axios)
 
// let query = null;
// let page = 0;
// let markup = [];

// const formEl = document.querySelector('.search-form');
// console.log(formEl);

// const galleryEl = document.querySelector('.gallery');
// console.log(galleryEl);

// const loadBtnEl = document.querySelector('.load-more');
// console.log(loadBtnEl);

// formEl.addEventListener('submit', handleLoadPhoto);
// loadBtnEl.addEventListener('click', handleLoadMorePhoto);

// // кнопка LoadMore изначально спрятана
// loadBtnEl.classList.add('is-hidden');
 
// function handleLoadPhoto(event) {
//                     // запрещаем обновление формы
//     event.preventDefault();
//   console.log(event.currentTarget.elements);
//
//                // начинаем отсчет страницы с 1 перед запросом
//     page = 1;

//                // находим значение введенных данных в инпут без пробелов
//     const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
//     console.log(searchQuery)

//     query = searchQuery;

//                    // если в инпупе пустая строка - запрос не отправляется
//     if (searchQuery === '') {
//     return
//     }
//                   // вызываем функцию по созданию запроса и в качестве аргументов передаем значение инпута и страницы для запроса
//     pixabayApi(query, page)
//         .then(data => {
//             console.log(data);
//                   // находим из объекта пришедших данных в data массив данных
//             const arrayPhoto = data.hits;
//              console.log(arrayPhoto);

//             if (arrayPhoto.length === 0) {
             
//                 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//                 return;
//             }
//                      // вызываем функцию по созданию разметки
//             renderPhoto(arrayPhoto);
//                             //  заносим разметку в div стирая предыдущие данные
//           galleryEl.innerHTML = markup;

//                     // загрузились картинки - кнопка LoadMore появляется
//           loadBtnEl.classList.remove('is-hidden');

//           scroll()

//           // сразу после загрузки используем библиотеку
//           gallery();
          
//           })
//         .catch ((error) => {
//         console.log(error);
//     })

   
    
// }

// function handleLoadMorePhoto() {
//                // увеличиваем страницу на 1 перед следующим запросом
//     page += 1;
//  pixabayApi(query, page)
//         .then(data => {
//             console.log(data);

//                   // находим из объекта пришедших данных в data массив данных
//           const arrayPhoto = data.hits;
//           console.log(arrayPhoto);
//           // выводим сообщение
//           const totalHits = data.totalHits;
//           Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//                                // вызываем функцию по созданию разметки
//             renderPhoto(arrayPhoto);
//                               //  заносим разметку карточек в div пополняя предыдущие данные
//           galleryEl.insertAdjacentHTML('beforeend', markup);

//           scroll()

//           // сразу после загрузки используем библиотеку
//           gallery();
          
//             // прячем кнопку когда картинки закончились, очищаем форму и выводим сообщение
//           if (data.totalHits <= arrayPhoto.length * page) {
              
//                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//                 loadBtnEl.classList.add('is-hidden');
//               formEl.reset();
//               return
//             }
//         })
//     .catch ((error) => {
//         console.log(error);
//     })

    
// }

// function renderPhoto(list) {
//                         // перебираем массив элементов и на каждый из них выводим разметку
//     markup = list.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `<div class="photo-card">
//   <a href="${largeImageURL}" class="photo-item">
//   <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" width=250 height=180/></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes <span class=info-span>${likes}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Views <span class=info-span>${views}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Comments <span class=info-span>${comments}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Downloads <span class=info-span>${downloads}</span></b>
//     </p>
//   </div>
// </div>`
//     }).join('');
//     return markup;
      
// }

// // функция по использованию библиотеки
// function gallery() {
// let gallery = new SimpleLightbox('.gallery a')
//     console.log(gallery);
//     gallery.refresh();
// }

// function scroll() {
//   // выбираем элемент на величину которого хотим прокрутить
//   const cardHeight = document.querySelector(".gallery").firstElementChild;
//   // посмотрели как называется и какая высота этого элемента(offsetHeight) и указали в функции scrollBy в свойстве объекта top
//   // на какую высоту вниз будет скрол
//   console.dir(cardHeight);

// window.scrollBy({
//   top: cardHeight.offsetHeight * 2,
//   behavior: "smooth",
// });

// }





























// нескончаемый скролл

// import './css/styles.css';
//              // импортируем функцию по созданию запроса на URL
// import { pixabayApi } from './pixabay_api';

// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// console.log(SimpleLightbox)

// import axios from 'axios';
// console.log(axios)
 
// let query = null;
// let page;
// let markup = [];

// const formEl = document.querySelector('.search-form');
// console.log(formEl);

// const galleryEl = document.querySelector('.gallery');
// console.log(galleryEl);

// const sentinel = document.querySelector('#sentinel');
// console.log(sentinel);

// const searchInput = document.querySelector('.search-input');
// console.log(searchInput)

// formEl.addEventListener('submit', handleLoadPhoto);


 
// function handleLoadPhoto(event) {
//                     // запрещаем обновление формы
//     event.preventDefault();
//   console.log(event.currentTarget.elements);
   
//                // начинаем отсчет страницы с 1 перед запросом
//     page = 1;

//                // находим значение введенных данных в инпут без пробелов
//     const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
//     console.log(searchQuery)

//     query = searchQuery;

//                    // если в инпупе пустая строка - запрос не отправляется
//     if (searchQuery === '') {
//     return
//     }
//                   // вызываем функцию по созданию запроса и в качестве аргументов передаем значение инпута и страницы для запроса
//     pixabayApi(query, page)
//         .then(data => {
//             console.log(data);
//                   // находим из объекта пришедших данных в data массив данных
//             const arrayPhoto = data.hits;
//              console.log(arrayPhoto);

//             if (arrayPhoto.length === 0) {
             
//                 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//                 return;
//             }
//                      // вызываем функцию по созданию разметки
//             renderPhoto(arrayPhoto);
//                             //  заносим разметку в div стирая предыдущие данные
//           galleryEl.innerHTML = markup;

//           scroll()

//           // сразу после загрузки используем библиотеку
//           gallery();
          
//           })
//         .catch ((error) => {
//         console.log(error);
//         })
  
//   }



// function renderPhoto(list) {
//                         // перебираем массив элементов и на каждый из них выводим разметку
//     markup = list.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `<div class="photo-card">
//   <a href="${largeImageURL}" class="photo-item">
//   <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" width=250 height=180/></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes <span class=info-span>${likes}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Views <span class=info-span>${views}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Comments <span class=info-span>${comments}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Downloads <span class=info-span>${downloads}</span></b>
//     </p>
//   </div>
// </div>`
//     }).join('');
//     return markup;
      
// }

// // функция по использованию библиотеки
// function gallery() {
// let gallery = new SimpleLightbox('.gallery a')
//     console.log(gallery);
//     gallery.refresh();
// }

// function scroll() {
//   // выбираем элемент на величину которого хотим прокрутить
//   const cardHeight = document.querySelector(".gallery").firstElementChild;
//   // посмотрели как называется и какая высота этого элемента(offsetHeight) и указали в функции scrollBy в свойстве объекта top 
//   // на какую высоту вниз будет скрол
//   console.dir(cardHeight);

// window.scrollBy({
//   top: cardHeight.offsetHeight * 2,
//   behavior: "smooth",
// });

// }

  
// const onEntry = (entreis) => {
//   entreis.forEach(entry => {
        
//   // если то за чем мы следим пересечет випорт(isIntersecting) и в searchInput записаны данные(т.е.уже был первый запрос и пришли данные)
//     if (entry.isIntersecting && searchInput.value.trim() !== "") {
    
//        // увеличиваем страницу на 1 перед следующим запросом
//       page += 1;
//       console.log(page)

//       pixabayApi(query, page)
//         .then(data => {
//             console.log(data);

//                   // находим из объекта пришедших данных в data массив данных
//           const arrayPhoto = data.hits;
//           console.log(arrayPhoto);
//           // выводим сообщение
//           const totalHits = data.totalHits;
//           Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//                                // вызываем функцию по созданию разметки
//             renderPhoto(arrayPhoto);
//                               //  заносим разметку карточек в div пополняя предыдущие данные
//           galleryEl.insertAdjacentHTML('beforeend', markup);

//           scroll()

//           // сразу после загрузки используем библиотеку
//           gallery();
          
//             // прячем кнопку когда картинки закончились, очищаем форму и выводим сообщение
//           if (data.totalHits <= arrayPhoto.length * page) {
              
//                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
               
//               formEl.reset();
//               return
//             }
//         })
//     .catch ((error) => {
//         console.log(error);
//     })
//   }
//  })
// }

// // сделаем по умолчанию на випорте observer
// const observer = new IntersectionObserver(onEntry, {
//   rootMargin: '150px',
// });

// observer.observe(sentinel);
















// используем библитотеку

// import './css/styles.css';
//              // импортируем функцию по созданию запроса на URL
// import { pixabayApi } from './pixabay_api';

// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// console.log(SimpleLightbox)

// import axios from 'axios';
// console.log(axios)
 
// let query = null;
// let page = 1;
// let markup = [];

// const formEl = document.querySelector('.search-form');
// console.log(formEl);

// const galleryEl = document.querySelector('.gallery');
// console.log(galleryEl);

// const loadBtnEl = document.querySelector('.load-more');
// console.log(loadBtnEl);

// formEl.addEventListener('submit', handleLoadPhoto);
// loadBtnEl.addEventListener('click', handleLoadMorePhoto);

// // кнопка LoadMore изначально спрятана
// loadBtnEl.classList.add('is-hidden');
 
// function handleLoadPhoto(event) {
//                     // запрещаем обновление формы
//     event.preventDefault();
//     console.log(event.currentTarget.elements);

//                // находим значение введенных данных в инпут без пробелов
//     const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
//     console.log(searchQuery)

//     query = searchQuery;

//                    // если в инпупе пустая строка - запрос не отправляется
//     if (searchQuery === '') {
//     return
//     }   
//                   // вызываем функцию по созданию запроса и в качестве аргументов передаем значение инпута и страницы для запроса
//   pixabayApi(query, page)
//        .then(({ data: {hits}}) => {
        
//           if ( hits.length === 0) {
             
//               Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//               return;
//           }
//                      // вызываем функцию по созданию разметки
//           renderPhoto(hits);
//                             //  заносим разметку в div стирая предыдущие данные
//           galleryEl.innerHTML = markup;

//                     // загрузились картинки - кнопка LoadMore появляется
//           loadBtnEl.classList.remove('is-hidden');

//           // сразу после загрузки используем библиотеку
//           gallery();
          
//         })
//         .catch ((error) => {
//         console.log(error);
//     })

//                  // увеличиваем страницу на 1 перед следующим запросом
//     page += 1;
    
// }

// function handleLoadMorePhoto() {
//  pixabayApi(query, page)
//         .then(({ data: {hits, totalHits}}) => {
              
//              // выводим сообщение
//           Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//                                // вызываем функцию по созданию разметки
//             renderPhoto(hits);
//                               //  заносим разметку карточек в div пополняя предыдущие данные
//           galleryEl.insertAdjacentHTML('beforeend', markup);

//           // сразу после загрузки используем библиотеку
//           gallery();
          
//             //когда картинки закончились прячем кнопку , очищаем форму и выводим сообщение
//           if (totalHits <  hits.length * page) {
              
//                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//                 loadBtnEl.classList.add('is-hidden');
//               formEl.reset();
//               return
//             }
//         })
//     .catch ((error) => {
//         console.log(error);
//     })
//                  // увеличиваем страницу на 1 перед следующим запросом
//     page += 1;
// }

// function renderPhoto(list) {
//                         // перебираем массив элементов и на каждый из них выводим разметку
//     markup = list.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `<div class="photo-card">
//   <a href="${largeImageURL}" class="photo-item">      
//   <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" width=250 height=180/></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes <span class=info-span>${likes}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Views <span class=info-span>${views}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Comments <span class=info-span>${comments}</span></b>
//     </p>
//     <p class="info-item">
//       <b>Downloads <span class=info-span>${downloads}</span></b>
//     </p>
//   </div>
// </div>`
//     }).join('');
//     return markup; 
      
// }

// // функция по использованию библиотеки
// function gallery() {
// let gallery = new SimpleLightbox('.gallery a')
//     console.log(gallery);
//     gallery.refresh();
// }











































// import './css/styles.css';
// // импортируем класс по созданию запроса на URL
// import { PixabayApi } from './pixabay_api';

// // import axios, { isCancel, AxiosError } from 'axios';


// const formEl = document.querySelector('.search-form');
// console.log(formEl);

// const galleryEl = document.querySelector('.gallery');
// console.log(galleryEl);

// formEl.addEventListener('submit', handleLoadPhoto);

// // создаем экземпляр класса
// const pixabayApi = new PixabayApi();
 
// function handleLoadPhoto(event) {
//     // запрещаем обновление формы
//     event.preventDefault();
//     console.log(event.currentTarget.elements);

//     // находим значение введенных данных в инпут
//     const searchQuery = event.currentTarget.elements.searchQuery.value;
//     console.log(searchQuery)

//     pixabayApi.query = searchQuery;
//     pixabayApi.fetchFoto()
//         .then(data => {
//             console.log(data);
//             renderPhoto(data);
//         })
//     .catch ((error) => {
//         console.log(error);
//     })
// }

// function renderPhoto(data) {
//     const arrayPhoto = data.hits;
//     console.log(arrayPhoto);

//     const markup = arrayPhoto.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}Likes</b>
//     </p>
//     <p class="info-item">
//       <b>${views}Views</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}Comments</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}Downloads</b>
//     </p>
//   </div>
// </div>`
//     }).join('');

//     galleryEl.insertAdjacentHTML('beforebegin', markup);
    
// }