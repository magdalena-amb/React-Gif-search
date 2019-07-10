


App = React.createClass({
  getInitialState() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    };
},

// //version with XMLHttpRequest  //

getGif: function(searchingText, callback) { 
  var GIPHY_API_URL = "https://api.giphy.com";
  var giphyApiKey = "dg2oljQ8ZqMzqkCCZP7NKCldbxZiZDZN";
  var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + giphyApiKey + '&tag=' + searchingText; 
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', url);
  xhr.onload = function() {
      if (xhr.status === 200) {
         var data = JSON.parse(xhr.responseText).data; 
          var gif = { 
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
          };
          callback(gif); 
      }
  };
  xhr.send();
},

// Fetch method //

// getGif : function(searchingText, callback) {
//   var GIPHY_API_URL = "https://api.giphy.com";
//   var giphyApiKey = "dg2oljQ8ZqMzqkCCZP7NKCldbxZiZDZN";
//   var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + giphyApiKey + '&tag=' + searchingText; 
//   fetch(url)
//   .then(handleErrors)
//   .then(parseJSON)
//   .then(getGifData)
//   .catch(function(err){
//     console.log('Inside display error!')
//     console.log(err);
//   })

//   function handleErrors (res){
//     if (!res.ok) {
//       throw Error (res.status)
//     }
//     return res;
//   }
//   function parseJSON (res){
//       return res.json();
//   }
//   function getGifData (data){
//       var gif = { 
//         url: data.data.fixed_width_downsampled_url,
//         sourceUrl: data.data.url
//       }
//       callback(gif);
//       return gif;
//   }
// },

handleSearch: function(searchingText) { 
  this.setState({
    loading: true
  });
  this.getGif(searchingText,function(gif) {
    this.setState({  
      loading: false, 
      gif: gif,  
      searchingText: searchingText 
    });
  }.bind(this));
},
     render: function() {
        return (
          <div className={'App'}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                  loading={this.state.loading}
                  url={this.state.gif.url}
                  sourceUrl={this.state.gif.sourceUrl}
                /> 
          </div>
         );
     }
 });