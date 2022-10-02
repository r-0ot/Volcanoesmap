 export const LOAD_VOLCANOES = {type: 'LOAD_VOLCANOES'};
 export const loadVolcanoesSuccess = (payload) => ({
    type: 'LOAD_VOLCANOES_SUCCESS',
    payload
 })
 export const loadVolcanoesFailure = (message) => ({
    type: 'LOAD_VOLCANOES_FAILURE',
    message
 })