export default (context, inject) => {
    const myGlobal = 'This is a global variable';
    const baseurl = 'https://arfanapi.cahyosoft.my.id/api';
    const imageurl = 'https://arfanapi.cahyosoft.my.id';
    const publictoken = 'fdca1ee6da1acbb76c2b9f70df04ae9790b5ca7d86e77db3b7827c75bae56f0d4af485984a8dd0781fa2acad50d1d7c4416b0678cd636c464a3447a60921e09b02c91a0d2872e6ada2b32126736c97596f4f1e057b155de7a3644da261e0f77a9f661f831323e5f8428fc5b603ad6ec376c621e17d3998231815f536a565416b
    ';
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