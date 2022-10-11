import  {put, call, take} from "redux-saga/effects";
import  {loadVolcanoesSuccess, loadVolcanoesFailure} from "./actions";
import axios from 'axios';

const fetchVolcanoes = async (action) => {
    try{
      if(action.peifrom && action.peito){
   const response = await axios.get(`http://localhost:5000/volcanoes?peifrom=${action.peifrom}&peito=${action.peito}`);
   console.log(action);
   return response.data;
      }
      const response = await axios.get('http://localhost:5000/volcanoes');
   return response.data;
    }
  catch(err){
    return err;
  }
    }

export function *volcanoRequest(){
    try{
    const action = yield take('LOAD_VOLCANOES');
    const volcanoData = yield call(fetchVolcanoes,action);
    yield put (loadVolcanoesSuccess(volcanoData));
    }catch(error){
    yield put (loadVolcanoesFailure(error.message));
    }
}

export function *peiDataRequest(){
  try{
  const action = yield take('LOAD_PEI_DATA');
  const peiData = yield call(fetchVolcanoes, action);
  yield put (loadVolcanoesSuccess(peiData));
  }catch(error){
  yield put (loadVolcanoesFailure(error.message));
  }
}