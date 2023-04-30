export default (context, inject) => {
    const myGlobal = 'This is a global variable';
    const baseurl = 'https://arfanapi.cahyosoft.my.id/api';
    const imageurl = 'https://arfanapi.cahyosoft.my.id';
    const publictoken = 'e061c9cc1b046cef822fd3a0a34fa4a0de18182ba5764c474b4a29a337fedb887eb4e9701f95917b86f7053540690401566ef21a7f85dd89c6a0746464a284bb7d34ebab0345cdc92b195b9ced9e5882d469cb05a359d43f4f6c1d2f866f048e618290cf4ed3f49445510de0d191ad960110dfea579e147954ca0ea1bae4d0e9';
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
    inject('animateCard', (card) => {
      card.classList.add('animate__animated', 'animate__fadeInUp')
    });
    inject('animateCardFadeDown', (card) => {
      card.classList.add('animate__animated', 'animate__fadeInDown')
    });
    inject('animateCardFadeLeft', (card) => {
      card.classList.add('animate__animated', 'animate__fadeInLeft')
    });
    inject('animateCardFadeRight', (card) => {
      card.classList.add('animate__animated', 'animate__fadeInRight')
    });
    inject('addHttpsPrefix', (url) => {
        const httpsUrl = /^https:\/\//i.test(url) ? url : `https://${url}`
        return httpsUrl.replace(/^http:\/\//i, 'https://')      
    })
    

  };