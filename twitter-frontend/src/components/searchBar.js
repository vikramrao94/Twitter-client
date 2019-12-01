import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: 'white',
    width: '50vw',
  }
});

const SearchBar = (props) => {
  //use of react hooks to seperate search from main timeline to avoid unnecessary re-renders of the main feed
  const { classes } = props;
  const [query, updateQuery] = useState('');

  function handleInputChange(e) {
    updateQuery(
      e.target.value
    );
  }

  function handleKeyPress(e) {
    if(e.key === 'Enter' && query.length > 3) {
      props.handleKeyPress(query);
      updateQuery(
        ''
      );
    }
  }

  return (
    <div>
      <TextField
            id="outlined-search"
            type="search"
            label="Search for"
            className={classes.textField}
            value={query}
            margin="dense"
            variant="outlined"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
    </div>
  );
}

export default withStyles(styles)(SearchBar);
