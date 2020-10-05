import { HttpClient } from "./httpClient";

let httpClient = new HttpClient();

export default {

    makeGraphGauge(graphData) {
        return httpClient.post('graph/makeGraphfgauge', graphData);
    },
    makeGraphrevfgauge(graphData) {
        return httpClient.post('graph/makeGraphrevfgauge', graphData);
    },
    makeGraphplf(graphData) {
        return httpClient.post('graph/makegraphplf', graphData);
    },
    makeGraphfgauge(graphData) {
        return httpClient.post('graph/makeGraphfgauge', graphData);
    },
    makeGraphrevfigauge(graphData) {
        return httpClient.post('graph/makeGraphrevfigauge', graphData);
    },
    makeGraphrevfgauge(graphData) {
        return httpClient.post('graph/makeGraphrevfgauge', graphData);
    },
    makeGraph(graphData) {
        return httpClient.post('graph/makeGraph', graphData);
    },
    makeGraphfyrgauge(graphData) {
        return httpClient.post('graph/makeGraphfyrgauge', graphData);
    },
    comparemakeGraphfgauge(graphData){
        return httpClient.post('graph/comparemakeGraphfgauge', graphData);
    },comparemakeGraphfyrgauge(graphData){
        return httpClient.post('graph/comparemakeGraphfyrgauge', graphData);
    },comparemakegraphplf(graphData){
        return httpClient.post('graph/comparemakegraphplf', graphData);
    },comparemakeGraphrevfgauge(graphData){
        return httpClient.post('graph/comparemakeGraphrevfgauge', graphData);
    },comparemakeGraphrevfigauge(graphData){
        return httpClient.post('graph/comparemakeGraphrevfigauge', graphData);
    }




}