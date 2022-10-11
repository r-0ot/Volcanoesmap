 export const LOAD_VOLCANOES = {type: 'LOAD_VOLCANOES'};
 export const loadPeiData = (peifrom,peito) => ({
   type: 'LOAD_PEI_DATA',
   peifrom,
   peito
})
 export const loadVolcanoesSuccess = (payload) => ({
    type: 'LOAD_VOLCANOES_SUCCESS',
    payload
 })
 export const loadVolcanoesFailure = (message) => ({
    type: 'LOAD_VOLCANOES_FAILURE',
    message
 })