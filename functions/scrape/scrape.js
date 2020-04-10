const axios = require('axios');
const cheerio = require('cheerio')

var r = {}

async function getPage(){
  return axios.get('https://yofreesamples.com/entertainment-freebies/free-google-play-android-apps-today/')
  .then(function (response) {
    const $ = cheerio.load(response.data)
    let results = $('.amz-deal')
    for (var i = 0; i < results.length; i++) {
      let meta = $(results[i]).find('p').text();
      meta = meta.split(".Rating: ");

      let rating = parseFloat(meta[1].split('. ')[0]);
      let downloads = parseInt(meta[1].split('. ')[1].split('Downloads: ')[1].split('+Visit')[0].replace(/,/g, ''));
      let originalValue = meta[0].split('Previous Price: ')[1];

      let obj = {
        title: $(results[i]).find('h4 a').text(),
        image: $(results[i]).find('img')[0].attribs.src,
        url: $(results[i]).find('.btn')[0].attribs.href,
        rating: rating,
        downloads: downloads,
        originalValue: originalValue,
      }
      r[i] = obj
    }
  });
}

exports.handler = async function(event, context, callback) {
  await getPage();

  callback(null, {
  statusCode: 200,
  body: JSON.stringify(r)
  });
}
