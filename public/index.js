

const URL ="http://localhost:3000/tweets";
let nextpage=null;
const onkeyenter=(e)=>{
    if(e.key=="Enter")
    gettwitterdat();
}


const onNextPage=()=>{
   
    if(nextpage){
        gettwitterdat();
      
    }
}

const gettrend =(e)=>{
    
   const texts = e.innerText;
   if(!texts) return;
   document.getElementById("user-search-input").value=texts;
    const encodedquery=encodeURIComponent(texts);
   let url=`${URL}?q=${encodedquery}&count=10&tweet_mode=extended`;
    
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
     buildtweetes(data.statuses);
     savenextpage(data.search_metadata);
     nextbuttonvisibility(data.search_metadata);
       
    })
}
/**
 * Retrive Twitter data from api*
 */
const gettwitterdat = () =>{
    const query=document.getElementById("user-search-input").value; 
    if(!query) return;
    const encodedquery=encodeURIComponent(query);
    let url=`${URL}?q=${encodedquery}&count=10&tweet_mode=extended`;
    if(nextpage)
    { 
        url=nextpage;
    }
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
     buildtweetes(data.statuses);
     savenextpage(data.search_metadata);
       nextbuttonvisibility(data.search_metadata);
    })
}
const nextbuttonvisibility=(metadata)=>{
    if(metadata.next_results)
    {
        
        document.getElementById("next-page").style.visibility='visible';
    }
    else{
       const node = document.getElementById("next-page");
       node.remove()
    }
  
    
   

}
const savenextpage=(metadata)=>{
  
    if(metadata.next_results)
    {
        
        nextpage=`${URL}${metadata.next_results}`;
    }
    else{
        nextpage=null;
    }
}


const buildtweetes=(tweet)=>{
   var twittercontent="";
    tweet.map((tweet)=>{
        const date = moment(tweet.created_at).fromNow();
        twittercontent +=`<div class="tweet-container">
        <div class="tweet-user-info">
            <div class="tweet-user-profile"  style="background-image: url(${tweet.user.profile_image_url_https});">
            </div>
            <div class="tweet-user-name-container"> 
            <div class="tweet-user-fullname">
             ${tweet.user.name}
             </div>
              <div class="tweet-user-username">
              @${tweet.user.screen_name}
              </div> </div>

        </div>`
        if(tweet.extended_entities && tweet.extended_entities.media.length>0)
            {if(tweet.extended_entities.media[0].type=="photo"){
             twittercontent +=   buildimage(tweet.extended_entities.media);
            }
            else {
        twittercontent +=   buildvideo(tweet.extended_entities.media);
            }
            } 
       

       twittercontent+= ` <div class="tweet-text-container">
       ${tweet.full_text}
         </div>
        <div class="tweet-date-container">${date}</div>

    </div>
  </div>   
        `
    })
  
if(nextpage)
{
    document.querySelector('.tweets-list').insertAdjacentHTML("beforeend",twittercontent);   
}
else{
    document.querySelector('.tweets-list').innerHTML=twittercontent;
}


}


const buildimage=(media)=>{
   let imagecontainer=`<div class="tweet-image-container">`;
   let imageExsist=false;
    media.map((media)=>{
        if(media.type=="photo")
        {
            console.log("hello");
            imageExsist=true;
            imagecontainer+=`<div class="tweet-image" style="background-image: url(${media.media_url_https});"> </div>`;
        }
      
    })
    imagecontainer+=` </div> `;
    return imageExsist =true? imagecontainer:"";

}
const buildvideo =(media)=>{
    let videocontainer=`<div class="tweet-video-container">`;
    let videoExsist=false;
     media.map((media)=>{
         if(media.type=="video")
         {
            
             videoExsist=true;
             
             videocontainer+=` <video controls>
             <source src="${media.video_info.variants[0].url}" type="video/mp4">
         </video>`;
         }
         else if(media.type=="animated_gif"){
            videoExsist=true;
            videocontainer+=` <video loop autoplay>
            <source src="${media.video_info.variants[0].url}" type="video/mp4">
        </video>`;
         }
     })
     videocontainer+=` </div> `;
     return videoExsist =true? videocontainer:"";

}


