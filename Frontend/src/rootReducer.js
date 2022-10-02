export default function rootReducer(state = [], action ){
    switch (action.type){
        case 'LOAD_VOLCANOES_SUCCESS':
              return {response : action.payload};
        case'LOAD_VOLCANOES_FAILURE':
              return {response : action.message};
                default:
                    return {response : state};
    }
}