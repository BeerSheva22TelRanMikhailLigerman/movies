//imports
import ApplicationBar from "./ui/ApplicationBar.js";

//consts
const sections = [
    { title: "Home", id: "home-place" },
    { title: "Search", id: "search-form-place" }
]; 

//objects
const menu = new ApplicationBar("menu-place", sections, menuHandler);

//functions
async function menuHandler(index) {
    updateForm.hideForm();
    switch (index) {
        case 0: {
            const employees = await action(companyService.getAllEmployees
                .bind(companyService));
            employeeTable.fillData(employees);
            break;
        }
        case 1: {
            await statisticsProcessing();
            break;
        }
    }
}