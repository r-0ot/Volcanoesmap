import  {call, put, take} from "redux-saga/effects";
import  {loadVolcanoesSuccess, loadVolcanoesFailure} from "./actions";
import axios from 'axios';

const fetchVolcanoes = async () => {
    try{
   const response = await axios.get('http://localhost:5000/volcanoes');
   return response.data;
    }
  catch(err){
    return err;
  }
    }

export function *volcanoRequest(){
    try{
    yield take('LOAD_VOLCANOES');
    const volcanoData = yield call(fetchVolcanoes);
    yield put (loadVolcanoesSuccess(volcanoData));
    }catch(error){
    yield put (loadVolcanoesFailure(error.message));
    }
}