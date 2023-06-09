//imports
import ApplicationBar from "./ui/ApplicationBar.js";
import ThumbnailsList from "./ui/ThumbnailsList.js";
import DetailsSection from "./ui/DetailsSection.js";
import MovieDBService from './service/MovieDBService.js';
import theMoviedb from './config/service-config.json' assert {type: 'json'};


//consts
const detailSectionElement = "details-container";
const popList = "popular";
const upcomingList = "upcoming";
const nowPlayingList = "now_playing";
const HIDDEN = "hidden";
const sections = [
    { title: "Home", id: "pop-list-place" },
    { title: "Search", id: "search-form-place" }
]; 


//objects
const menuSection = new ApplicationBar("buttons-place", sections, menuHandler);

const movieDBService = new MovieDBService(theMoviedb.baseUrl, theMoviedb.apiKey, theMoviedb.uRLPrefix);

const popListThumbnailsData = await movieDBService.getList(popList);
const popListSection = new ThumbnailsList("thumbnails-place", popListThumbnailsData, thumbnailHandler);

const detailSection = new DetailsSection(detailSectionElement, theMoviedb.uRLPrefix, hideDetails);




//functions
async function menuHandler(index) {
    //TODO (nothing);
    switch (index) {
        case 0: {
            //TODO (nothing)
            break;
        }
        case 1: {
            console.log("search button was pressed")
        }
    }
}
async function thumbnailHandler(index){
    const detailsData = await movieDBService.getDetailData(popListThumbnailsData[Math.ceil(index/2) - 1].id);  
    detailSection.fillDetails(detailsData)    
}
function hideDetails() {   
    const detSection = document.querySelector(".details-section");
    detSection.hidden = true;    
}
