//class commonFunction {
    export default {
        dateFormat (date, format, ) {
            if (date) {
                if (format === "dm") {
        
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
        
                    if ( date === ''){
                        return '';
                    } else {
                        const d = new Date(date);
                        return d.getDate() + ". " + monthNames[d.getMonth()].substring(0,3);
                    }
                }
                else if (format === "my") {
        
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
        
                    if ( date === ''){
                        return '';
                    } else {
                        const d = new Date(date);
                        return monthNames[d.getMonth()].substring(0,3) + " "+ d.getFullYear().toString().substring(2,4);
                    }
                }
                else if (format === "monthDt") {
        
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
        
                    if ( date === ''){
                        return '';
                    } else {
                        const d = new Date(date);
                        return monthNames[d.getMonth()].substring(0,3)+' '+d.getFullYear.substring(2,4);
                    }
                }
                else if (format === "currentDt") {
        
                    // const monthNames = ["January", "February", "March", "April", "May", "June",
                    //     "July", "August", "September", "October", "November", "December"
                    // ];
        
                    const d = new Date(date);
        
                    return d.getFullYear+"-"+d.getMonth+"-"+d.getDate;//d.getDate() + ". " + monthNames[d.getMonth()].substring(0,3);
                }
                else if (format === "monthFirstDt") {
        
                    // const monthNames = ["January", "February", "March", "April", "May", "June",
                    //     "July", "August", "September", "October", "November", "December"
                    // ];
        
                    const d = new Date(date.getFullYear(), date.getMonth(), 1);
        
                    return d.getFullYear+"-"+d.getMonth+"-"+d.getDate;//d.getDate() + ". " + monthNames[d.getMonth()].substring(0,3);
                }
                else if (format === "dtINR") {
        
                    // const monthNames = ["January", "February", "March", "April", "May", "June",
                    //     "July", "August", "September", "October", "November", "December"
                    // ];        
                    return date.substring(8,10)+"/"+date.substring(5,7)+"/"+date.substring(0,4);//getFullYear+"-"+d.getMonth+"-"+d.getDate;//d.getDate() + ". " + monthNames[d.getMonth()].substring(0,3);
                }
                else if (format === "year") {
        
                    let d = new Date(date);
                    d.getFullYear()      
                    return d.getFullYear() ;
                }
                
            }        
            // return date;
        }

    }

// }

// export default commonFunction ;