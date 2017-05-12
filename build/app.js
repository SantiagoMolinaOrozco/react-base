class Food extends React.Component {
  constructor(props) {
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
  handleLike() {
    this.setState({
      like: !this.state.like
    });
  }
  editItem() {
    this.setState({
      isEditing: true
    });
  }
  cancelEditItem() {
    this.setState({
      isEditing: false
    });
  }
  saveItem() {
    this.props.onChange(this.props.index, this.refs.newName.value);
    this.setState({
      isEditing: false
    });
  }
  removeItem() {
    this.props.onRemove(this.props.index);
  }
  showEditingView() {
    return React.createElement(
      "div",
      { className: "col-12 col-sm-4 text-center", style: { marginBottom: "25px" } },
      React.createElement(
        "div",
        { className: "card", style: { width: '100%' } },
        React.createElement("img", { className: "card-img-top", src: "http://placehold.it/350x150", alt: "Card image cap" }),
        React.createElement(
          "div",
          { className: "card-block" },
          React.createElement(
            "h4",
            { className: "card-title bg-success box-base" },
            React.createElement("input", { ref: "newName", type: "text", className: "form-control", placeholder: "Nuevo Nombre", defaultValue: this.props.name })
          ),
          React.createElement(
            "p",
            { className: "card-text bg-info box-base" },
            "Food ",
            React.createElement(
              "i",
              null,
              this.props.children
            )
          ),
          React.createElement("input", { type: "checkbox", onChange: this.handleLike, defaultChecked: this.state.like, className: "fa fa-heart font-size-50" }),
          React.createElement(
            "div",
            { className: "card-block" },
            "Like: ",
            React.createElement(
              "b",
              null,
              String(this.state.like)
            )
          ),
          React.createElement(
            "div",
            { className: "card-block row" },
            React.createElement(
              "div",
              { className: "col" },
              React.createElement("i", { className: "fa fa-times font-size-50 red", onClick: this.cancelEditItem })
            ),
            React.createElement(
              "div",
              { className: "col" },
              React.createElement("i", { className: "fa fa-check font-size-50", onClick: this.saveItem })
            )
          )
        )
      )
    );
  }
  showFinalView() {
    return React.createElement(
      "div",
      { className: "col-12 col-sm-4 text-center", style: { marginBottom: "25px" } },
      React.createElement(
        "div",
        { className: "card", style: { width: '100%' } },
        React.createElement("img", { className: "card-img-top", src: "http://placehold.it/350x150", alt: "Card image cap" }),
        React.createElement(
          "div",
          { className: "card-block" },
          React.createElement(
            "h4",
            { className: "card-title bg-success box-base" },
            this.props.name
          ),
          React.createElement(
            "p",
            { className: "card-text bg-info box-base" },
            "Food ",
            React.createElement(
              "i",
              null,
              this.props.children
            )
          ),
          React.createElement("input", { type: "checkbox", onChange: this.handleLike, defaultChecked: this.state.like, className: "fa fa-heart font-size-50" }),
          React.createElement(
            "div",
            { className: "card-block" },
            "Like: ",
            React.createElement(
              "b",
              null,
              String(this.state.like)
            )
          ),
          React.createElement(
            "div",
            { className: "card-block row" },
            React.createElement(
              "div",
              { className: "col" },
              React.createElement("i", { className: "fa fa-pencil font-size-50", onClick: this.editItem })
            ),
            React.createElement(
              "div",
              { className: "col" },
              React.createElement("i", { className: "fa fa-trash red font-size-50", onClick: this.removeItem })
            )
          )
        )
      )
    );
  }
  render() {
    if (this.state.isEditing) {
      return this.showEditingView();
    } else {
      return this.showFinalView();
    }
  }
}

class ListFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: ['Tacos', 'Paella', 'Ceviche']
    };
    this.addItem = this.addItem.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.eachItem = this.eachItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  static get defaultProps() {
    return {
      framework: 'React',
      tech: 'JavaScript'
    };
  }
  componentWillMount() {
    var self = this;
    $.getJSON('https://restcountries.eu/rest/v1/all', data => {
      for (var key in data) {
        self.addItem(data[key].name);
      }
      $(self.refs.spinner).removeClass('faa-spin animated');
      $(self.refs.spinner).fadeOut();
    });
  }
  componentDidMount() {
    var self = this;
    $(self.refs.spinner).addClass('faa-spin animated');
  }
  eachItem(food, i) {
    return React.createElement(
      Food,
      { key: i,
        index: i,
        name: food,
        onRemove: this.removeItem,
        onChange: this.updateItem },
      i + 1
    );
  }
  updateItem(index, newName) {
    var arr = this.state.foods;
    arr[index] = newName;
    this.setState({
      foods: arr
    });
  }
  removeItem(index) {
    this.setState({
      foods: this.state.foods.filter((_, i) => i !== index)
    });
  }
  addItem(food) {
    this.setState({
      foods: this.state.foods.concat(this.refs.newFood.value ? this.refs.newFood.value : food ? food : "Nueva comida")
    });
    this.refs.newFood.value = "";
  }
  handleKeyDown(event) {
    if (event.charCode === 13) {
      this.addItem();
    }
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "jumbotron text-center", style: { marginTop: "25px" } },
        React.createElement(
          "header",
          null,
          React.createElement(
            "h1",
            null,
            "Mis Food favoritas"
          ),
          React.createElement(
            "i",
            null,
            "Total ",
            this.state.foods.length
          ),
          React.createElement("br", null),
          React.createElement("span", { ref: "spinner", className: "fa fa-refresh" }),
          React.createElement("br", null),
          React.createElement(
            "i",
            null,
            "Hecho con ",
            this.props.framework,
            ", una libreria de ",
            this.props.tech
          )
        )
      ),
      React.createElement(
        "div",
        { className: "input-group" },
        React.createElement("input", { ref: "newFood", type: "text", className: "form-control", placeholder: "Agregar nueva Food", onKeyPress: this.handleKeyDown }),
        React.createElement(
          "span",
          { className: "input-group-btn" },
          React.createElement(
            "div",
            { className: "btn btn-info", onClick: this.addItem },
            " + "
          )
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "row align-items-center" },
        this.state.foods.map(this.eachItem)
      )
    );
  }
}

ReactDOM.render(React.createElement(ListFood, null), document.getElementById('container'));

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