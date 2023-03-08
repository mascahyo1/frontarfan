export default (context, inject) => {
    const myGlobal = 'This is a global variable';
    const baseurl = 'http://localhost:1337/api';
    const imageurl = 'http://localhost:1337';
    const publictoken = 'f6e43f7e2ac01a4b238051218a5175fde6b5afece5710ade4f92af0135831eb5b2616519604d9224343beb0b36f41fb42f0b4d3e7aa6956190c58e647c8fc689baa9a4148c18a3f6360051480d5a5bdddc55f953940a0c38c01d7b16dcb89c3049c5049033ae99911892ae252adf64831706153bf4d505e466dcaeb18ad7908b';
    inject('myGlobal', myGlobal);
    inject('baseurl', baseurl);
    inject('imageurl', imageurl);
    inject('publictoken', publictoken);
  };