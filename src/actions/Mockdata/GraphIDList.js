 

export default graphPageList(pageID, subPageID) {
        const graphList = [
            { pageID: 1, subPage: 1, graphIDs: ["984", "985", "986", "987"] },
            { pageID: 1, subPage: 2, graphIDs: ["995", "996", "997", "998"] },
            { pageID: 1, subPage: 3, graphIDs: ["988", "989", "990", "991"] },
    
            { pageID: 1, subPage: 4, graphIDs: ["992", "993", "999"] },
            { pageID: 1, subPage: 5, graphIDs: ["980", "979", "978", "994"] },
            { pageID: 1, subPage: 6, graphIDs: ["966", "967", "968", "969"] },
            { pageID: 1, subPage: 7, graphIDs: ["970", "971", "972", "973"] },
    
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
            { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
    
        ]
        const result = graphList.filter((flt) => flt.pageID == pageID && flt.subPage == subPageID)[0];
        if (result) {
            return result.graphIDs;
        }
        return null;
    }





/*
DTD - Grid availability - 966
DTD - Plant availability - 967
MTD - Grid availability - 968
MTD - Plant availability - 969
QTD - Grid availability - 970
QTD - Plant availability - 971
Quarter 1 - 972
Quarter 1 Generation - 973
Quarter 1 Mn INR Revenue - 978
Quarter 1 Mn USD  Revenue - 979
Quarter 2 - 980
Quarter 2 Generation - 984
Quarter 2 Mn INR Revenue - 985
Quarter 2 Mn USD  Revenue - 985
Quarter 3 - 986
Quarter 3 Generation - 987
Quarter 3 Mn INR Revenue - 988
Quarter 3 Mn USD  Revenue - 989
Quarter 4 - 990
Quarter 4 Generation - 991
Quarter 4 Mn INR Revenue - 992
Quarter 4 Mn USD  Revenue - 993
Yearly Generation - 994
Yearly Mn INR Revenue - 995
Yearly Mn USD Revenue - 996
YTD - Grid availability - 997
YTD - Plant availability - 998
*/