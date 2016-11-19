import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table />
      </div>
    );
  }
}

class Table extends Component {
  constructor() {
    super()
    this.itemHeight = 30;
    this.tableHeight = 300;
    this.padding = 90
    this.total = 1000
  }

  state = {
    visibleFirstItemId: 0,
    visibleLastItemId: 10,
    renderFirstItemId: 0,
    renderLastItemId: 100,
  }

  componentDidUpdate() {
    if(this._needReRender()){
      console.log('ReRender')
      this.setState({
        visibleFirstItemId: this._visibleFirstItemId(),
        visibleLastItemId: this._visibleLastItemId(),
        renderFirstItemId: this._renderFirstItemId(),
        renderLastItemId: this._renderLastItemId(),
      })
    }
  }

  onScroll = () => {
    this.setState({scrollTop: this._getScrollTop()})
  }

  _getScrollTop = () => {
    return this.table.scrollTop
  }

  _itemsPerTable = () => {
    return this.tableHeight / this.itemHeight
  }

  _visibleFirstItemId = () => {
    return Math.floor(this._getScrollTop() / this.itemHeight)
  }

  _visibleLastItemId = () => {
    return this._visibleFirstItemId() + this._itemsPerTable()
  }

  _renderFirstItemId = () => {
    if(( this._visibleFirstItemId() - 90) > 0 ){
      return this._visibleFirstItemId() - 90
    }else{
      return 0
    }
  }

  _renderLastItemId = () => {
    if(( this._visibleFirstItemId() + 90) < this.total){
      return this._visibleFirstItemId() + 90
    }else{
      return this.total
    }
  }

  _scrollOver = () => {
    return Math.floor(this._getScrollTop() / this.itemHeight)
  }
  
  _needReRender = () => {
    const { visibleFirstItemId, visibleLastItemId} = this.state
    if(this._scrollOver() >= (visibleLastItemId + this.padding - 20)){
      return true
    }

    if(this._scrollOver() <= (visibleFirstItemId - this.padding + 20)){
      return true
    }

    return false
  }

  render() {
    const {renderFirstItemId, renderLastItemId} = this.state
    let rows = []
    for(let i=0; i < this.total; i++){
      rows[i] = <div className={`item item-${i}`} key={i}>item {i}</div> 
    }

    let top_height = renderFirstItemId * this.itemHeight
    let top = <div style={{'height': top_height}} ></div> 

    let middle_rows = rows.slice(renderFirstItemId, renderLastItemId)

    let bottom_height = (this.total - renderLastItemId) * this.itemHeight
    let bottom = <div style={{'height': bottom_height}} ></div> 

    return (
      <div id="table" onScroll={this.onScroll} ref={(table)=> this.table = table}>
        {top}
        {middle_rows}
        {bottom}
      </div>
    )
  }
}

export default App;