import { geocode } from '../domain/Geocoder';
// import { searchHotelByLocation } from '../domain/HotelRepository';

export const setPlace = place => dispatch => dispatch({ type: 'CHANGE_PLACE', place });

export const startSearch = () => (dispatch, getState) => {
  geocode(getState().place)
    .then(({ status, address, location }) => {
      switch (status) {
        case 'OK': {
          dispatch({ type: 'GEOCODE_FETCHED', address, location });
          // return searchHotelByLocation(location);
          break;
        }
        case 'ZERO_RESULTS': {
          // this.setErrorMessage('結果が見つかりませんでした');
          break;
        }
        case 'OVER_QUERY_LIMIT': {
          // this.setErrorMessage('クエリ数が割り当て量を超えています');
          break;
        }
        case 'REQUEST_DENIED': {
          // this.setErrorMessage('リクエストが拒否されています');
          break;
        }
        case 'INVALID_REQUEST': {
          // this.setErrorMessage('パラメータが間違っています');
          break;
        }
        case 'UNKNOWN_ERROR': {
          // this.setErrorMessage('サーバー エラーでリクエストが処理できませんでした');
          break;
        }
        default: {
          //this.setErrorMessage('エラーが発生しました');
        }
      }
      return [];
    });
    //  .then((hotels) => {
    //  this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
    //})
    //.catch(() => {
    //  this.setErrorMessage('通信に失敗しました');
    //});

}
