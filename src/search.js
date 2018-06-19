import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit/2,
  },
  input: {
    display: 'none',
  },
  menu: {
    width: 200,
  },
});

let fiveMovies = ''


class Search extends Component {

	


	componentWillMount(){
		if(localStorage.getItem('res2') != null){

			this.setState({
			dataResults : JSON.parse(localStorage.getItem("res2"))
		})   	
		}
		
	}
	

	constructor(props){
		super(props);
		this.state ={
			year: '',
			type: '',
			title: '',
			results: '',
			dataResults: [],
			response: '',
			openRes: 1
		}

	}

	handleKeyUp = name => e => {

		
		this.setState({
      [name]: e.target.value,
    });
		console.log(this.state)
	}


	apiCall = () => {
		fetch(`http://www.omdbapi.com/?apikey=43bca0a4&y=${this.state.year}&type=${this.state.type}&t=${this.state.title}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
    	console.log(data)
    	if(data.Response === 'False'){
    		this.setState({response: data.Error})
    		this.setState({results: ''})
    		fiveMovies = ''
    	}else{
    		this.setState({results: data.Title})
    		fiveMovies = ''
    		this.setState({response: ''})
    		this.setState(prevState => ({
  			dataResults: [...prevState.dataResults, data.Title]
	  }))
    	}
      

      

      // this.setState({refinedDetails: data})
    })
    .catch(function() {
        console.log("error");
    });
	}

	handleClick =e => {
		this.apiCall()
	}

	handleClickForFive =e => {

		let data = this.state.dataResults.map((data) => {
			return data
		})

			
		console.log(data.slice(Math.max(data.length - 5, 1)))
		this.setState({dataResults: data})
		this.setState({results: ''})
		this.setState({response: ''})
		localStorage.setItem('res2',JSON.stringify(this.state.dataResults))
		// console.log()

		 fiveMovies = data.map((data)=>{
      return <ListItemText primary={data} />
    })

}



	render() {

		const { classes } = this.props;
		



		return (

<div className="App">
      	<div>




      	
      		<form className={classes.container} noValidate autoComplete="off">

      		<TextField
          id="year"
          label="Title"
          onKeyUp={this.handleKeyUp('title')}
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="search"
          label="Year"
          onKeyUp={this.handleKeyUp('year')}
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="search"
          label="Type"
          onKeyUp={this.handleKeyUp('type')}
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <Button  className={classes.button} onClick={this.handleClick}>
        Search
      </Button>

      <Button  className={classes.button} onClick={this.handleClickForFive}>
        Last 5 Searches
      </Button>

      		</form>
        
      	</div>
      	
      	
      	{fiveMovies}


      		<List component="nav">
      	<ListItem button>
          
          <ListItemText primary={this.state.results} />
        </ListItem>
              	<ListItem button>
          
          <ListItemText primary={this.state.response} />
        </ListItem>
        </List>
      	

      	

      	
        </div>
    	);
    }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);


