import { HttpClient } from "./httpClient";


let httpClient = new HttpClient();

export default {

    getAllVendors() {
        return httpClient.get('vendors/');
    },

    getVendorById(id) {
        return httpClient.get('vendors/vendorId/' + id);
    },

    createOrUpdateVendor(vendor) {
        return httpClient.post('vendors/', vendor);
    },

    deleteVendor(id) {
        return httpClient.delete('vendors/vendorId/' + id);
    },

}