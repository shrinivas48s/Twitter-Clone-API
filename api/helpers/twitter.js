
const axios= require("axios");

const url="https://api.twitter.com/1.1/search/tweets.json";

class Tweets{
    gets(query,count,max_id){
      return  axios.get( url,{
            params:{
                q:query,
                count:count,
               max_id:max_id,
               tweet_mode:'extended'
            },
               
            headers:{
                "Authorization":`Bearer ${process.env.TWITTER_API_TOKEN}`
            }
        })
    }
}
module.exports=Tweets;
