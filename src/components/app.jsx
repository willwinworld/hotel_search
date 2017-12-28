import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import GeoCodeResult from './GeoCodeResult';
import Map from './Map';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
   // 親コンポーネントの初期の状態定義
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat:35.6585805,
        lng:139.7454329,
      },
    };
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat:0,
        lng:0,
      },
    });
  }

  handlePlaceSubmit(place) {
    axios
      .get(GEOCODE_ENDPOINT, { params: { address: place } })
      .then((results) => {
        const data = results.data;
        const result = data.results[0];

        switch (data.status) {
          case 'OK': {
            this.setState({
              address: result.formatted_address,
              location: result.geometry.location,
            });
            break;
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          case 'OVER_QUERY_LIMIT': {
            this.setErrorMessage('クエリ数が割り当て量を超えています');
            break;
          }
          case 'REQUEST_DENIED': {
            this.setErrorMessage('リクエストが拒否されています');
            break;
          }
          case 'INVALID_REQUEST': {
            this.setErrorMessage('パラメータが間違っています');
            break;
          }
          case 'UNKNOWN_ERROR': {
            this.setErrorMessage('サーバー エラーでリクエストが処理できませんでした');
            break;
          }
          default: {
            this.setErrorMessage('エラーが発生しました');
          }
        }
      }).catch(() => {
        this.setErrorMessage('通信に失敗しました');
      });
  }

// トップレベルのElementは一つでなければならない
  render() {
    return (
      <div>
        <h1>Geolocation Search</h1>
        <SearchForm onSubmit={ place => this.handlePlaceSubmit(place)}/>
        <GeoCodeResult
          address={this.state.address}
          location ={this.state.location}
        />
        <Map location ={this.state.location} />
      </div>
    );
  }
}

export default App;
