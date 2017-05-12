class Food extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nameFood: this.props.name,
      like: Boolean(this.props.like),
      isEditing: false
    };
    this.handleLike = this.handleLike.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEditItem = this.cancelEditItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  handleLike(){
    this.setState({
      like: !this.state.like
    });
  }
  editItem(){
    this.setState({
      isEditing: true
    })
  }
  cancelEditItem(){
    this.setState({
      isEditing: false
    })
  }
  saveItem(){
    this.props.onChange(this.props.index, this.refs.newName.value);
    this.setState({
      isEditing: false
    })
  }
  removeItem(){
    this.props.onRemove(this.props.index)
  }
  showEditingView(){
    return(
      <div className="col-12 col-sm-4 text-center" style={{marginBottom: "25px"}}>
        <div className="card" style={{width: '100%'}}>
          <img className="card-img-top" src="http://placehold.it/350x150" alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title bg-success box-base">
              <input ref="newName" type="text" className="form-control" placeholder="Nuevo Nombre" defaultValue={this.props.name} />
            </h4>
            <p className="card-text bg-info box-base">Food <i>{this.props.children}</i></p>
            <input type="checkbox" onChange={this.handleLike} defaultChecked={this.state.like} className="fa fa-heart font-size-50" />
              <div className="card-block">
                Like: <b>{String(this.state.like)}</b>
              </div>
              <div className="card-block row">
                <div className="col">
                 <i className="fa fa-times font-size-50 red" onClick={this.cancelEditItem}></i>
                </div>
                <div className="col">
                  <i className="fa fa-check font-size-50" onClick={this.saveItem}></i>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
  showFinalView(){
    return(
      <div className="col-12 col-sm-4 text-center" style={{marginBottom: "25px"}}>
        <div className="card" style={{width: '100%'}}>
          <img className="card-img-top" src="http://placehold.it/350x150" alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title bg-success box-base">{this.props.name}</h4>
            <p className="card-text bg-info box-base">Food <i>{this.props.children}</i></p>
            <input type="checkbox" onChange={this.handleLike} defaultChecked={this.state.like} className="fa fa-heart font-size-50" />
              <div className="card-block">
                Like: <b>{String(this.state.like)}</b>
              </div>
              <div className="card-block row">
                <div className="col">
                 <i className="fa fa-pencil font-size-50" onClick={this.editItem}></i>
                </div>
                <div className="col">
                  <i className="fa fa-trash red font-size-50" onClick={this.removeItem}></i>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.isEditing) {
      return this.showEditingView();
    }else{
      return this.showFinalView();
    }
  }
}

class ListFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [
        'Tacos',
        'Paella',
        'Ceviche',
      ]
    };
    this.addItem = this.addItem.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.eachItem = this.eachItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  static get defaultProps(){
    return {
      framework: 'React',
      tech: 'JavaScript'
    }
  }
  componentWillMount(){
    var self = this;
    $.getJSON('https://restcountries.eu/rest/v1/all', (data) => {
      for(var key in data){
        self.addItem(data[key].name)
      }
      $(self.refs.spinner).removeClass('faa-spin animated');
      $(self.refs.spinner).fadeOut();
    });
  }
  componentDidMount(){
    var self = this;
    $(self.refs.spinner).addClass('faa-spin animated');
  }
  eachItem(food, i){
    return(
      <Food key={i}
            index={i}
            name={food}
            onRemove={this.removeItem}
            onChange={this.updateItem}>
        {i+1}
      </Food>
    );
  }
  updateItem(index, newName){
    var arr = this.state.foods;
    arr[index] = newName;
    this.setState({
      foods: arr
    })
  }
  removeItem(index){
    this.setState({
      foods: this.state.foods.filter((_, i) => i !== index)
    })
  }
  addItem(food){
    this.setState({
      foods: this.state.foods.concat(this.refs.newFood.value ? this.refs.newFood.value : food ? food : "Nueva comida")
    })
    this.refs.newFood.value = "";
  }
  handleKeyDown(event){
    if (event.charCode === 13 ) {
      this.addItem();
    }
  }
  render(){
    return(
      <div>
        <div className="jumbotron text-center" style={{marginTop: "25px"}}>
          <header>
            <h1>Mis Food favoritas</h1>
            <i>Total {this.state.foods.length}</i>
            <br />
            <span ref="spinner" className="fa fa-refresh"></span>
            <br />
            <i>Hecho con {this.props.framework}, una libreria de {this.props.tech}</i>
          </header>
        </div>
        <div className="input-group">
          <input ref="newFood" type="text" className="form-control" placeholder="Agregar nueva Food" onKeyPress={this.handleKeyDown} />
          <span className="input-group-btn">
            <div className="btn btn-info" onClick={this.addItem}> + </div>
          </span>
        </div>
        <br />
        <div className="row align-items-center">
          {
            this.state.foods.map(this.eachItem)
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListFood />,
  document.getElementById('container')
)

// ReactDOM.render(
//   <div className="row align-items-center full-height">
//     <Food name="Tacos" like>
//       1
//     </Food>
//     <Food name="Paella">
//       2
//     </Food>
//     <Food name="Ceviche">
//       3
//     </Food>
//   </div>
//   document.getElementById('container')
// );
//
// ReactDOM.render(
//   React.createElement('div', null, 'Hello world !'),
//   document.getElementById('message')
// );
