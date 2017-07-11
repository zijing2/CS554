const RecipeForm = React.createClass({
    getInitialState() {
        return {title: "", description: "", steps: [], newStep: "", ingredients: [], newIngredient: "", errMessage:"",succMessage:false};
    },
    changeTitle(e) {
        this.setState({title: e.target.value});
    },
    changeDescription(e) {
        this.setState({description: e.target.value});
    },
    addIngredient(e) {
        this.setState({errMessage:""});
        if(this.state.newIngredient==""){
            this.setState({errMessage:"Ingredient can't be empty"});
            return;
        }

        let ingredients = this
            .state
            .ingredients
            .concat([this.state.newIngredient]);

        this.setState({ingredients: ingredients, newIngredient: ""});
    },
    addStep(e) {
        this.setState({errMessage:""});
        if(this.state.newStep==""){
            this.setState({errMessage:"Step can't be empty"});
            return;
        }
        let steps = this
            .state
            .steps
            .concat([this.state.newStep]);

        this.setState({steps: steps, newStep: ""});
    },
    changeNewIngredientText(e) {
        this.setState({newIngredient: e.target.value});
    },
    changeNewStepText(e) {
        this.setState({newStep: e.target.value});
    },
    addRecipe(e) {
        this.setState({errMessage:"",succMessage:false});

        try {
            if(this.state.title == ""){
                throw "title can't be empty";
            }else if(this.state.description == ""){
                throw "description can't be empty";
            }else if(this.state.ingredients.length==0){
                throw "ingredients can't be empty";
            }else if(this.state.steps.length==0){
                throw "steps can't be empty";
            }else{
                for(var i=0;i<this.props.recipeList.length;i++){
                    if(this.props.recipeList[i].title == this.state.title){
                        throw "title can't be duplicate";
                    }
                }
            }
        } catch (error) {
            this.setState({errMessage:error});
            return;
        }
        
        var data = {"recipe" : this.state};
        $.ajax({
            type: 'POST',
            url: "/recipes",
            data: data,
            dataType: 'json',
            success: (result)=>{
                 this.props.callbackParent(result);
                 this.setState({errMessage:"",succMessage:true});
            },
            error: (xhr, status, err) => {
                console.error(xhr, status, err.toString());
            }
        });
        
    },
    render() {
        let newTitleText = `New Recipe: ${this.state.title || ''} (${this.state.ingredients.length} ingredients, ${this.state.steps.length} steps)`;
        console.log(this.state);

        return (
            <div className="recipe">
                <h3>Add a New Recipe</h3>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="newTitle" className="col-sm-3 control-label">Title</label>
                        <div className="col-sm-9">
                            <input
                                className="form-control"
                                id="newTitle"
                                placeholder="New Recipe"
                                onChange={this.changeTitle}
                                value={this.state.title}
                                type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newDescription" className="col-sm-3 control-label">Description</label>
                        <div className="col-sm-9">
                            <textarea
                                className="form-control"
                                id="newDescription"
                                placeholder="Recipe description"
                                onChange={this.changeDescription}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newIngredientText" className="col-sm-3 control-label">New Ingredient</label>
                        <div className="col-sm-9">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="newIngredientText"
                                    placeholder="New Ingredient"
                                    value={this.state.newIngredient}
                                    onChange={this.changeNewIngredientText}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={this.addIngredient}>Add Ingredient</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newStepText" className="col-sm-3 control-label">New Step</label>
                        <div className="col-sm-9">
                            <textarea
                                className="form-control"
                                type="text"
                                id="newIngredientText"
                                placeholder="New Step Instructions"
                                value={this.state.newStep}
                                onChange={this.changeNewStepText}
                                ></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button className="btn btn-primary" type="button" onClick={this.addStep}>Add Step</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-default" onClick={this.addRecipe}>Add Recipe</button>
                        </div>
                    </div>
                    <div className={this.state.errMessage=='' ? 'hidden':'alert alert-danger show'}  role="alert" >
                        {this.state.errMessage}
                    </div>
                    <div className={this.state.succMessage==false ? 'hidden':'alert alert-success show'} role="alert">
                        <strong>Well done!</strong> You successfully add a new recipe.
                    </div>
                </div>
                <Recipe
                    title={newTitleText}
                    description={this.state.description}
                    steps={this.state.steps}
                    ingredients={this.state.ingredients}></Recipe>

            </div>
        );
    }
});
