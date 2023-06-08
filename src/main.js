//imports
import ApplicationBar from "./ui/ApplicationBar.js";
import ThumbnailsList from "./ui/ThumbnailsList.js";
import MovieDBService from './service/MovieDBService.js';
import theMoviedb from './config/service-config.json' assert {type: 'json'};


//consts
const popList = "popular";
const upcomingList = "upcoming";
const nowPlayingList = "now_playing";
const sections = [
    { title: "Home", id: "pop-list-place" },
    { title: "Search", id: "search-form-place" }
]; 


//objects
const menuSection = new ApplicationBar("buttons-place", sections, menuHandler);

const movieDBService = new MovieDBService(theMoviedb.baseUrl, theMoviedb.apiKey, theMoviedb.uRLPrefix);

const popListThumbnailsData = await movieDBService.getList(popList);
const popListSection = new ThumbnailsList("thumbnails-place", popListThumbnailsData, thumbnailHandler)





//functions
async function menuHandler(index) {
    //updateForm.hideForm();
    switch (index) {
        case 0: {
            // const employees = await action(companyService.getAllEmployees
            //     .bind(companyService));
            // employeeTable.fillData(employees);
            break;
        }
        case 1: {
            // await statisticsProcessing();
            // break;
        }
    }
}
function thumbnailHandler(index){
    //TODO:
    // open pop-up window or section "details"
}