export default (context, inject) => {
    const myGlobal = 'This is a global variable';
    const baseurl = 'https://arfanapi.cahyosoft.my.id/api';
    const imageurl = 'https://arfanapi.cahyosoft.my.id';
    const publictoken = '34a50c2964414568b0581eb67a31e4d49811f5d112744e35e34477d816ffdb9d398c1a5d8ad399f4aba0a0f6eb968ab7ffeda59693bc7babb6cf373fdfdef16e1164ea04a898928706c6ec70ae1c5000d52d71d1ffabd7dbf15b07d8c431cb7ad9d12d5768b517e70edaf965af910b7b516cc03c48063d9d54f0826484796bfc';
    inject('myGlobal', myGlobal);
    inject('baseurl', baseurl);
    inject('imageurl', imageurl);
    inject('publictoken', publictoken);
    inject('datearfan', (date) => {
      date = new Date(date);
      let month = ['January', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear();
    });
    inject('montharfan', (date) => {
      date = new Date(date);
      let month = ['January', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return month[date.getMonth()] + ' ' + date.getFullYear();
    });

  };