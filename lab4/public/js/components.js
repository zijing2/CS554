"use strict";

var Recipe = React.createClass({
  displayName: "Recipe",

  getInitialState: function getInitialState() {
    return { showingDetails: false };
  },
  showMore: function showMore(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ showingDetails: true });
  },
  showLess: function showLess(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.setState({ showingDetails: false });
  },
  render: function render() {

    var bodyContent = undefined;
    var toggler = undefined;

    if (this.state.showingDetails) {
      var steps = this.props.steps.map(function (step) {
        return React.createElement(
          "li",
          null,
          step
        );
      });

      var ingredients = this.props.ingredients.map(function (step) {
        return React.createElement(
          "li",
          null,
          step
        );
      });

      bodyContent = React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          this.props.description
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-8" },
            React.createElement(
              "ol",
              null,
              steps
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-4" },
            React.createElement(
              "ul",
              null,
              ingredients
            )
          )
        )
      );
      toggler = React.createElement(
        "p",
        { className: "text-center" },
        React.createElement(
          "a",
          { onClick: this.showLess, href: "" },
          "Show Less"
        )
      );
    } else {
      bodyContent = React.createElement(
        "p",
        null,
        this.props.description
      );

      toggler = React.createElement(
        "p",
        { className: "text-center" },
        React.createElement(
          "a",
          { onClick: this.showMore, href: "" },
          "Show More"
        )
      );
    }

    return React.createElement(
      "div",
      { className: "panel panel-default" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        this.props.title
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        bodyContent,
        toggler
      )
    );
  }
});
"use strict";

var RecipeForm = React.createClass({
    displayName: "RecipeForm",
    getInitialState: function getInitialState() {
        return { title: "", description: "", steps: [], newStep: "", ingredients: [], newIngredient: "", errMessage: "", succMessage: false };
    },
    changeTitle: function changeTitle(e) {
        this.setState({ title: e.target.value });
    },
    changeDescription: function changeDescription(e) {
        this.setState({ description: e.target.value });
    },
    addIngredient: function addIngredient(e) {
        this.setState({ errMessage: "" });
        if (this.state.newIngredient == "") {
            this.setState({ errMessage: "Ingredient can't be empty" });
            return;
        }

        var ingredients = this.state.ingredients.concat([this.state.newIngredient]);

        this.setState({ ingredients: ingredients, newIngredient: "" });
    },
    addStep: function addStep(e) {
        this.setState({ errMessage: "" });
        if (this.state.newStep == "") {
            this.setState({ errMessage: "Step can't be empty" });
            return;
        }
        var steps = this.state.steps.concat([this.state.newStep]);

        this.setState({ steps: steps, newStep: "" });
    },
    changeNewIngredientText: function changeNewIngredientText(e) {
        this.setState({ newIngredient: e.target.value });
    },
    changeNewStepText: function changeNewStepText(e) {
        this.setState({ newStep: e.target.value });
    },
    addRecipe: function addRecipe(e) {
        var _this = this;

        this.setState({ errMessage: "", succMessage: false });

        try {
            if (this.state.title == "") {
                throw "title can't be empty";
            } else if (this.state.description == "") {
                throw "description can't be empty";
            } else if (this.state.ingredients.length == 0) {
                throw "ingredients can't be empty";
            } else if (this.state.steps.length == 0) {
                throw "steps can't be empty";
            } else {
                for (var i = 0; i < this.props.recipeList.length; i++) {
                    if (this.props.recipeList[i].title == this.state.title) {
                        throw "title can't be duplicate";
                    }
                }
            }
        } catch (error) {
            this.setState({ errMessage: error });
            return;
        }

        var data = { "recipe": this.state };
        $.ajax({
            type: 'POST',
            url: "/recipes",
            data: data,
            dataType: 'json',
            success: function success(result) {
                _this.props.callbackParent(result);
                _this.setState({ errMessage: "", succMessage: true });
            },
            error: function error(xhr, status, err) {
                console.error(xhr, status, err.toString());
            }
        });
    },
    render: function render() {
        var newTitleText = "New Recipe: " + (this.state.title || '') + " (" + this.state.ingredients.length + " ingredients, " + this.state.steps.length + " steps)";
        console.log(this.state);

        return React.createElement(
            "div",
            { className: "recipe" },
            React.createElement(
                "h3",
                null,
                "Add a New Recipe"
            ),
            React.createElement(
                "div",
                { className: "form-horizontal" },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newTitle", className: "col-sm-3 control-label" },
                        "Title"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("input", {
                            className: "form-control",
                            id: "newTitle",
                            placeholder: "New Recipe",
                            onChange: this.changeTitle,
                            value: this.state.title,
                            type: "text" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newDescription", className: "col-sm-3 control-label" },
                        "Description"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("textarea", {
                            className: "form-control",
                            id: "newDescription",
                            placeholder: "Recipe description",
                            onChange: this.changeDescription })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newIngredientText", className: "col-sm-3 control-label" },
                        "New Ingredient"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement(
                            "div",
                            { className: "input-group" },
                            React.createElement("input", {
                                className: "form-control",
                                type: "text",
                                id: "newIngredientText",
                                placeholder: "New Ingredient",
                                value: this.state.newIngredient,
                                onChange: this.changeNewIngredientText }),
                            React.createElement(
                                "span",
                                { className: "input-group-btn" },
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary", type: "button", onClick: this.addIngredient },
                                    "Add Ingredient"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newStepText", className: "col-sm-3 control-label" },
                        "New Step"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("textarea", {
                            className: "form-control",
                            type: "text",
                            id: "newIngredientText",
                            placeholder: "New Step Instructions",
                            value: this.state.newStep,
                            onChange: this.changeNewStepText
                        })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "div",
                        { className: "col-sm-offset-3 col-sm-9" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", type: "button", onClick: this.addStep },
                            "Add Step"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "div",
                        { className: "col-sm-12" },
                        React.createElement(
                            "button",
                            { type: "submit", className: "btn btn-default", onClick: this.addRecipe },
                            "Add Recipe"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: this.state.errMessage == '' ? 'hidden' : 'alert alert-danger show', role: "alert" },
                    this.state.errMessage
                ),
                React.createElement(
                    "div",
                    { className: this.state.succMessage == false ? 'hidden' : 'alert alert-success show', role: "alert" },
                    React.createElement(
                        "strong",
                        null,
                        "Well done!"
                    ),
                    " You successfully add a new recipe."
                )
            ),
            React.createElement(Recipe, {
                title: newTitleText,
                description: this.state.description,
                steps: this.state.steps,
                ingredients: this.state.ingredients })
        );
    }
});
"use strict";

var RecipeList = React.createClass({
    displayName: "RecipeList",

    getInitialState: function getInitialState() {
        return { recipes: [] };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function success(recipeList) {
                _this.setState({ recipes: recipeList });
            },
            error: function error(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },
    onListChange: function onListChange(newRecipes) {
        this.setState({
            recipes: newRecipes
        });
    },
    render: function render() {
        var recipeList = this.state.recipes;
        var recipes = recipeList.map(function (recipe) {
            return React.createElement(Recipe, {
                title: recipe.title,
                description: recipe.description,
                id: recipe.id,
                steps: recipe.steps,
                ingredients: recipe.ingredients });
        });

        return React.createElement(
            "div",
            { className: "recipe" },
            recipes,
            React.createElement("hr", null),
            React.createElement(RecipeForm, { recipeList: this.state.recipes, callbackParent: this.onListChange })
        );
    }
});

ReactDOM.render(React.createElement(RecipeList, { url: "/recipes" }), document.getElementById('content'));