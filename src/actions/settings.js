export const mockGraphsResponse = {
    "graphs": [
        {
            "id": "1",
            "title": "SECI GBU NOIDA",
            "children": [
                {
                    "id": "1",
                    "title": "E TOTAL _SECI GBU NOIDA"
                },
                {
                    "id": "2",
                    "title": "AC Real power GBU Noida"
                },
            ]
        },
        {
            "id": "2",
            "title": "DJB Chattarpur BPS",
            "children": [
                {
                    "id": "1",
                    "title": "E TOTAL _DJB CHATTARPUR BPS"
                },

            ]
        },
        {
            "id": "3",
            "title": "Yearly Comparison",
            "children": [
                {
                    "id": "1",
                    "title": "Yearly Generation"
                },
                {
                    "id": "2",
                    "title": "Yearly Mn USD Revenue"
                },
                {
                    "id": "3",
                    "title": "Yearly Mn INR Revenue"
                }
            ]
        },
        {
            "id": "4",
            "title": "Revenue Comparison in INR",
            "children": [
                {
                    "id": "1",
                    "title": "Quarter 1 Mn INR Revenue"
                },
                {
                    "id": "2",
                    "title": "Quarter 2 Mn INR Revenue"
                },
                {
                    "id": "3",
                    "title": "Quarter 3 Mn INR Revenue"
                },
                {
                    "id": "4",
                    "title": "Quarter 4 Mn INR Revenue"
                },
            ]
        },
        {
            "id": "5",
            "title": "Revenue Comparison",
            "children": [
                {
                    "id": "1",
                    "title": "Quarter 1 Mn USD Revenue"
                },
                {
                    "id": "2",
                    "title": "Quarter 2 Mn USD Revenue"
                },
                {
                    "id": "3",
                    "title": "Quarter 3 Mn USD Revenue"
                },
                {
                    "id": "4",
                    "title": "Quarter 4 Mn USD Revenue"
                },
            ]
        },
        {
            "id": "6",
            "title": "Generation Comparison",
            "children": [
                {
                    "id": "1",
                    "title": "Quarter 1 Generation"
                },
                {
                    "id": "2",
                    "title": "Quarter 2 Generation"
                },
                {
                    "id": "3",
                    "title": "Quarter 3 Generation"
                },
                {
                    "id": "4",
                    "title": "Quarter 4 Generation"
                },
            ]
        },
        {
            "id": "7",
            "title": "Quarterly Penalty Data",
            "children": [
                {
                    "id": "1",
                    "title": "Quarter 1 Penalty Data"
                },
                {
                    "id": "2",
                    "title": "Quarter 2 Penalty Data"
                },
                {
                    "id": "3",
                    "title": "Quarter 3 Penalty Data"
                },
                {
                    "id": "4",
                    "title": "Quarter 4 Penalty Data"
                },
            ]
        },
    ]

}


export const mockPageGroupResponse = {
    "pageGroup": [
        {
            "id": "1",
            "title": "Dashboard",

        },
        {
            "id": "2",
            "title": "Analytics",

        },
        {
            "id": "3",
            "title": "NOCC Portal",

        },
        {
            "id": "4",
            "title": "Diagnosis",

        },
        {
            "id": "5",
            "title": "Per Kilowatt Inverter wise Comparison",

        },
        {
            "id": "6",
            "title": "Dashboard Graphs Page Group",

        },
        {
            "id": "7",
            "title": "Rooftop dashboard",

        },

    ]

}

export const mockAlertCleaningResponse = {
    "cleaningAlert": [
        {
            "id": "1",
            "UserName": "A Raghavendra",

        },
        {
            "id": "2",
            "UserName": "Rajan Saini",

        },
       
    ]

}



export const  mockPagesResponse = {
    "pages": [
        {
            "id": "1",
            "title": "Generation Comparison",

        },
        {
            "id": "2",
            "title": "Revenue Comparison in INR",

        },
        {
            "id": "3",
            "title": "Revenue Comparison",

        },
        {
            "id": "4",
            "title": "Yearly Comparison",

        },
        {
            "id": "5",
            "title": "PLF Comparison",

        },
        {
            "id": "6",
            "title": "Plant availability",

        },
        {
            "id": "7",
            "title": "Grid Availability",

        },

    ]

}


export const  mockUserManagementsResponse = {
    "userManagements": [
        {
            "id": "1",
            "name": "A Raghavendra",
            "employeeID": "N/A",
            "username": "raghavendra.ankulagari",
            "password": "",
            "role": "Standard User",
            "email": "raghavendra.ankulagari@azurepower.com",
            "mobileNo": "9704113436",
            "isActive": "false"

        },
        {
            "id": "2",
            "name": "Aanchal Verma",
            "employeeID": "N/A",
            "username": "aanchal.verma",
            "password": "Azure@123",
            "role": "SCM User",
            "email": "aanchal.verma@azurepower.com",
            "mobileNo": "9411895874",
            "isActive": "true"

        },

    ]

}

export const  mockUserRolesResponse = {
    "roles": [
        {
            "id": "1",
            "title": "Admin",
            "defaultLandingPage":"Plant"

        },
        {
            "id": "2",
            "title": "Construction Admin",
            "defaultLandingPage":"Fielduser/mapdashboard"

        },
        {
            "id": "3",
            "title": "Construction User",
            "defaultLandingPage":"Fielduser/mapdashboard"

        },
        {
            "id": "4",
            "title": "Guest User",
            "defaultLandingPage":"Plant"

        },
        {
            "id": "5",
            "title": "Guest User_Railways",
            "defaultLandingPage":"Graph"

        },
        {
            "id": "6",
            "title": "SCM User",
            "defaultLandingPage":"Analytics"

        },
        {
            "id": "7",
            "title": "Standard User",
            "defaultLandingPage":"Analytics"

        }
    ]

}


export const  mockHubsResponse = {
    "hubs": [
        {
            "id": "1",
            "name": "GM_Tahliwala and Korianwali",
            "Description": "Tahliwala and Korianwali",
            "Latitude": "30.67000000",
            "Longitude": "74.14000000",
            "isActive": "false"
        },
        {
            "id": "2",
            "name": "GM_Vanwala_Bhittiwala_Sikwwala",
            "Description": "Vanwala_Bhittiwala_Sikwwala",
            "Latitude": "30.67000000",
            "Longitude": "74.14000000",
            "isActive": "true"
        }

    ]

}


export const  mockProjectsResponse = {
    "projects": [
        {
            "id": "1",
            "projectName": "Gujarat Rooftop 2.5",
            "description": "Gujarat Rooftop 2.5",
            "isActive": "true"
        },
        {
            "id": "2",
            "projectName": "DLF",
            "description": "DLF",
            "isActive": "false"
        },

    ]

}




export const  mockAlertUserResponse = {
    "alertuser": [
        {
            "id": "1",
            "user": "Operations",
            "type": "MTk="
        },
        {
            "id": "2",
            "user": "A Raghavendra",
            "type": "MTE="
        },
        {
            "id": "3",
            "user": "shubham",
            "type": "NQ=="
        },
        {
            "id": "4",
            "user": "Operations",
            "type": "MTc="
        },

    ]

}


export const  dropdownAlertUser = {
    "alertuser": [
        {
            "id": "1",
            "name": "Alert Type",
            "value": ""

        },
        {
            "id": "2",
            "name": "Daily Swipein & Swipeout Report",
            "value": "MjE="

        },
        {
            "id": "3",
            "name": "MTD Comparision Between Actual & Forecast Generation",
            "value": "MTk="

        },
        {
            "id": "4",
            "name": "Rajasthan Raw Data Report",
            "value": "MTE="

        },
        {
            "id": "5",
            "name": "Tilt Change Due",
            "value": "NQ=="

        },
        {
            "id": "6",
            "name": "YTD Comparision Between Actual & Forecast Generation",
            "value": "MTc="

        }
    ]

}

export const  mockMCleaningResponse = {
    "mCleaning": [
        {
            "id": "1",
            "PlantName": "Punjab 1",
            "CleaningCycleRate": "171.36",
            "CleanCBCapacity":"39.00",
            "UncleanCBCapacity":"39.00",
            "Percentage":"80.00",
            "CleanFTPPath":"/home/plantdata/punjab/logs/smu_2",
            "CleanNOCCPath":"/var/www/MCC/punjab/smu/smu_2",
            "UncleanFTPPath":"/home/plantdata/punjab/logs/smu_1",
            "UncleanNOCCPath":"/var/www/MCC/punjab/smu/smu_1",
           
        }       
    ]

}


export const  mockGraphGroupResponse = {
    "graphGroup": [
        {
            "id": "1",
            "name": "SECI GBU NOIDA",

        },
        {
            "id": "2",
            "name": "DJB Chattarpur BPS",

        },      

    ]

}


export const  mockErrorCodeResponse = {
    "errorCode": [
        {
            "id": "1",
            "errorCode": "MAIN_OFF",
            "Description": "MAIN OFF",
            "Vendor": "NA",
            "HelpTopicId": "1112",
            "Status": "enabled"
        },
        {
            "id": "2",
            "errorCode": "INVERTER_OFF",
            "Description": "INVERTER OFF",
            "Vendor": "NA",
            "HelpTopicId": "1113",
            "Status": "enabled"
        },

    ]

}


export const  mockMobieSettingResponse = {
    "mobileSetting": [
        {
            "id": "1",
            "Description": "pollingSchedule",
            "value":"00:03"

        },
        {
            "id": "2",
            "Description": "Radius",
            "value":"50"

        },      

    ]

}



export const  mockForecastConfigResponse = {
    "forecastConfig": [
        {
            "id": "1",
            "ForecastMechanism": "InsolationForecast",
            "MinimumHistoricResult": "5",
            "Maximum Deviation": "25",
            
        },
        {
            "id": "2",
            "ForecastMechanism": "ModuleTemperatureForecast",
            "MinimumHistoricResult": "10",
            "Maximum Deviation": "25",
            
        },

    ]

}



export const  mockPRUserManagementResponse = {
    "prUserManagement": [
        {
            "id": "1",
            "PlantName": "Karnataka 1",
            "Name": "Atul Srivastav",           
            "Status": "enabled"
        },
        {
            "id": "2",
            "PlantName": "Andhra Pradesh 1(4)",
            "Name": "Atul Srivastav",           
            "Status": "enabled"
        },

    ]

}

export const mockEditRoleManagement = {
    "userRoleManagement":[
        {
            "id":"1",
            "Page":"Plants"
        }
    ]
}

export const mockEditPage = {
    "userEditPage":[
        {
            "id":"1",
            "graphName":"Quarter 1"
        },
        {
            "id":"2",
            "graphName":"Quarter 2"
        },
        {
            "id":"3",
            "graphName":"Quarter 3"
        },
        {
            "id":"4",
            "graphName":"Quarter 4"
        }
    ]
}
