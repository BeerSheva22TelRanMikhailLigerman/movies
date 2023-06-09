//imports
import ApplicationBar from "./ui/ApplicationBar.js";
import ThumbnailsList from "./ui/ThumbnailsList.js";
import SearchSection from "./ui/SearchSection.js";
import DetailsSection from "./ui/DetailsSection.js";
import MovieDBService from './service/MovieDBService.js';
import theMoviedb from './config/service-config.json' assert {type: 'json'};


//consts
const detailSectionElement = "details-container";
const popList = "popular";
const upcomingList = "upcoming";
const nowPlayingList = "now_playing";
const HIDDEN = "hidden";
const homeSectionsButtons = [
    { title: "Home", id: "pop-list-place" },
    { title: "Search", id: "search-form-place" }
];
const searchSectionButtons = [
    { title: "Now playing", id: "now-playing-place" },
    { title: "Upcoming", id: "upcoming-place" },
    { title: "Find", id: "search-result-place" }
];


//objects
const movieDBService = new MovieDBService(theMoviedb.baseUrl, theMoviedb.apiKey, theMoviedb.uRLPrefix);

const menuSection = new ApplicationBar("buttons-place", homeSectionsButtons, menuHandler);

const popListThumbnailsData = await movieDBService.getList(popList);
const popListSection = new ThumbnailsList("thumbnails-place", popListThumbnailsData, thumbnailHandler);

const detailSection = new DetailsSection(detailSectionElement, theMoviedb.uRLPrefix, hideDetails);

const serchSection = new SearchSection("search-form-place", searchSectionButtons, searhHandler);
serchSection.fillSearchFields();



//functions
async function menuHandler(index) {
    //TODO (nothing);
    switch (index) {
        case 0: {
            //TODO by home button click (nothing)
            break;
        }
        case 1: {
            //TODO by searh button click (nothing)
        }
    }
}
async function thumbnailHandler(index) {
    const detailsData = await movieDBService.getDetailData(this.thumbnailsData[Math.ceil(index / 2) - 1].id); //FIX with Array.from(obj) in UI
    detailSection.fillDetails(detailsData)
}
function hideDetails() {
    const detSection = document.querySelector(".details-section");
    detSection.hidden = true;
}
async function searhHandler(index) {
    //TODO (nothing);
    switch (index) {
        case 0: {
            //TODO by Now playing button click
            const nowPlayingData = await movieDBService.getList(nowPlayingList);
            const nowPlayingSection = new ThumbnailsList("now-playing-place", nowPlayingData, thumbnailHandler);
            break;
        }
        case 1: {
            //TODO by Upcoming button click
            const upcomingData = await movieDBService.getList(nowPlayingList);
            const upcomingSection = new ThumbnailsList("upcoming-place", upcomingData, thumbnailHandler);
            console.log(upcomingData)
            break
        }
        case 2: {
            //TODO by Find playing button click
            console.log("Find button was pressed");
        }
    }
}